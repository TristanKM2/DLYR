const REPO = 'TristanKM2/DLYR';
const BRANCH = 'main';

const ACCOUNTS = {
  'admin@dlyr-vr.com': { name: "Admin D'LYR", init: 'AD' },
  'gerant@dlyr-vr.com': { name: "Gérant D'LYR", init: 'GR' }
};

const PAGES = ['index', 'accueil', 'catalogue', 'jeux-vr', 'activites', 'evenements',
  'entreprises', 'offrir', 'snack-bar', 'faq', 'global'];

// Adresses toujours mises en copie cachée, quel que soit le formulaire
const BCC = ['tristankouker@gmail.com'];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

// Échappe les caractères HTML pour éviter toute injection depuis le formulaire
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function authorized(request, env) {
  const h = request.headers.get('Authorization') || '';
  return h === 'Bearer ' + env.CMS_PASSWORD;
}

async function githubPut(env, path, contentBase64, message) {
  const api = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const headers = {
    'Authorization': 'Bearer ' + env.GITHUB_TOKEN,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'dlyr-cms-worker'
  };
  let sha;
  const cur = await fetch(`${api}?ref=${BRANCH}`, { headers });
  if (cur.ok) sha = (await cur.json()).sha;
  const res = await fetch(api, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ message, content: contentBase64, branch: BRANCH, ...(sha ? { sha } : {}) })
  });
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    /* ---------- POST /auth ---------- */
    if (url.pathname === '/auth' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch (e) { return json(400, { ok: false }); }

      const email = String(body.email || '').trim().toLowerCase();
      const pass = String(body.pass || '');
      const acc = ACCOUNTS[email];

      if (acc && pass === env.CMS_PASSWORD) {
        return json(200, { ok: true, name: acc.name, init: acc.init });
      }
      return json(401, { ok: false });
    }

    /* ---------- PUT /save ---------- */
    if (url.pathname === '/save' && request.method === 'PUT') {
      if (!authorized(request, env)) return json(401, { ok: false, error: 'unauthorized' });

      let body;
      try { body = await request.json(); } catch (e) { return json(400, { ok: false, error: 'bad json' }); }

      const page = String(body.page || '');
      if (!PAGES.includes(page)) return json(400, { ok: false, error: 'unknown page' });
      if (typeof body.data !== 'object' || body.data === null) return json(400, { ok: false, error: 'missing data' });

      const pretty = JSON.stringify(body.data, null, 2);
      const b64 = btoa(unescape(encodeURIComponent(pretty)));
      const res = await githubPut(env, `content/${page}.json`, b64, `CMS: mise à jour ${page}.json`);

      if (!res.ok) {
        const detail = await res.text();
        return json(502, { ok: false, error: 'github', status: res.status, detail: detail.slice(0, 300) });
      }
      return json(200, { ok: true });
    }

    /* ---------- POST /upload ---------- */
    if (url.pathname === '/upload' && request.method === 'POST') {
      if (!authorized(request, env)) return json(401, { ok: false, error: 'unauthorized' });

      let body;
      try { body = await request.json(); } catch (e) { return json(400, { ok: false, error: 'bad json' }); }

      const name = String(body.name || '').replace(/[^a-zA-Z0-9._-]/g, '-');
      const data = String(body.dataBase64 || '');
      if (!name || !data) return json(400, { ok: false, error: 'missing name or data' });
      if (data.length > 4_000_000) return json(413, { ok: false, error: 'file too large (max ~3 Mo)' });

      const res = await githubPut(env, `uploads/${name}`, data, `CMS: upload ${name}`);
      if (!res.ok) {
        const detail = await res.text();
        return json(502, { ok: false, error: 'github', status: res.status, detail: detail.slice(0, 300) });
      }
      return json(200, { ok: true, path: `uploads/${name}` });
    }

    /* ---------- POST /send-email (Resend) ---------- */
    if (url.pathname === '/send-email' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch (e) { return json(400, { ok: false, error: 'bad json' }); }

      const resendApiKey = env.RESEND_API_KEY;
      if (!resendApiKey) return json(500, { ok: false, error: 'RESEND_API_KEY non configurée' });

      const toEmail = env.DEST_EMAIL || 'contact@dlyr-vr.com';
      const fromEmail = env.FROM_EMAIL || "D'LYR Website <contact@dlyr-vr.com>";
      const subject = body._subject || body.subject || "Nouveau message reçu depuis le site D'LYR";
      const replyTo = body.Email || body.email || undefined;

      let html = `<div style="font-family:sans-serif;font-size:16px;color:#1c3024;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px">
        <h2 style="color:#1c3024;border-bottom:2px solid #d4bc72;padding-bottom:10px">${esc(subject)}</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:15px">`;

      const ignoreKeys = ['_subject', '_template', '_captcha', 'bcc'];
      for (const [key, value] of Object.entries(body)) {
        if (ignoreKeys.includes(key)) continue;
        html += `<tr>
          <td style="padding:8px;font-weight:bold;background:#f8f9fa;border:1px solid #e0e0e0;width:35%">${esc(key)}</td>
          <td style="padding:8px;border:1px solid #e0e0e0;white-space:pre-wrap">${esc(value)}</td>
        </tr>`;
      }

      html += `</table>
        <p style="font-size:12px;color:#888;margin-top:20px">Ce message a été envoyé depuis le formulaire du site D'LYR.</p>
      </div>`;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + resendApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          bcc: BCC,
          subject: subject,
          html: html,
          ...(replyTo ? { reply_to: replyTo } : {})
        })
      });

      if (!resendRes.ok) {
        const errDetail = await resendRes.text();
        return json(502, { ok: false, error: 'resend_error', status: resendRes.status, detail: errDetail.slice(0, 300) });
      }
      return json(200, { ok: true });
    }

    return json(404, { ok: false, error: 'not found' });
  }
};
