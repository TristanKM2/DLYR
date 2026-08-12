/* ============================================================
   D'LYR — Cloudflare Worker CMS
   À coller dans Cloudflare : Workers & Pages → dlyr-cms-worker
   → Edit code → tout remplacer par ce fichier → Deploy.

   Variables secrètes requises (déjà en place) :
   - CMS_PASSWORD  : mot de passe unique du CMS
   - GITHUB_TOKEN  : token GitHub avec accès au repo

   Routes :
   - POST /auth    { email, pass }            → { ok, name, init }
   - PUT  /save    { page, data }             → commit content/<page>.json
   - POST /upload  { name, dataBase64 }       → commit uploads/<name>
   Les routes /save et /upload exigent le header :
   Authorization: Bearer <mot de passe CMS>
   ============================================================ */

const REPO   = 'TristanKM2/DLYR';
const BRANCH = 'main';

// Comptes autorisés (les emails ne sont pas secrets ; le mot de passe
// est le même pour tous : la variable secrète CMS_PASSWORD).
const ACCOUNTS = {
  'admin@dlyr-vr.com':  { name: "Admin D'LYR",  init: 'AD' },
  'gerant@dlyr-vr.com': { name: "Gérant D'LYR", init: 'GR' }
};

// Pages dont le JSON est éditable (sécurité : on ne commit rien d'autre)
const PAGES = ['index','accueil','catalogue','jeux-vr','activites','evenements',
               'entreprises','offrir','snack-bar','faq','global'];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(status, body){
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

function authorized(request, env){
  const h = request.headers.get('Authorization') || '';
  return h === 'Bearer ' + env.CMS_PASSWORD;
}

async function githubPut(env, path, contentBase64, message){
  const api = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const headers = {
    'Authorization': 'Bearer ' + env.GITHUB_TOKEN,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'dlyr-cms-worker'
  };
  // SHA du fichier existant (nécessaire pour une mise à jour)
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
  async fetch(request, env){
    const url = new URL(request.url);

    if (request.method === 'OPTIONS'){
      return new Response(null, { status: 204, headers: CORS });
    }

    /* ---------- POST /auth ---------- */
    if (url.pathname === '/auth' && request.method === 'POST'){
      let body;
      try { body = await request.json(); } catch(e){ return json(400, { ok:false }); }
      const email = String(body.email || '').trim().toLowerCase();
      const pass  = String(body.pass || '');
      const acc   = ACCOUNTS[email];
      if (acc && pass === env.CMS_PASSWORD){
        return json(200, { ok: true, name: acc.name, init: acc.init });
      }
      return json(401, { ok: false });
    }

    /* ---------- PUT /save ---------- */
    if (url.pathname === '/save' && request.method === 'PUT'){
      if (!authorized(request, env)) return json(401, { ok:false, error:'unauthorized' });
      let body;
      try { body = await request.json(); } catch(e){ return json(400, { ok:false, error:'bad json' }); }
      const page = String(body.page || '');
      if (!PAGES.includes(page)) return json(400, { ok:false, error:'unknown page' });
      if (typeof body.data !== 'object' || body.data === null) return json(400, { ok:false, error:'missing data' });

      const pretty  = JSON.stringify(body.data, null, 2);
      const b64     = btoa(unescape(encodeURIComponent(pretty)));
      const res     = await githubPut(env, `content/${page}.json`, b64, `CMS: mise à jour ${page}.json`);
      if (!res.ok){
        const detail = await res.text();
        return json(502, { ok:false, error:'github', status:res.status, detail: detail.slice(0,300) });
      }
      return json(200, { ok:true });
    }

    /* ---------- POST /upload ---------- */
    if (url.pathname === '/upload' && request.method === 'POST'){
      if (!authorized(request, env)) return json(401, { ok:false, error:'unauthorized' });
      let body;
      try { body = await request.json(); } catch(e){ return json(400, { ok:false, error:'bad json' }); }
      // Nom de fichier nettoyé : lettres, chiffres, tiret, point uniquement
      const name = String(body.name || '').replace(/[^a-zA-Z0-9._-]/g, '-');
      const data = String(body.dataBase64 || '');
      if (!name || !data) return json(400, { ok:false, error:'missing name or data' });
      if (data.length > 4_000_000) return json(413, { ok:false, error:'file too large (max ~3 Mo)' });

      const res = await githubPut(env, `uploads/${name}`, data, `CMS: upload ${name}`);
      if (!res.ok){
        const detail = await res.text();
        return json(502, { ok:false, error:'github', status:res.status, detail: detail.slice(0,300) });
      }
      return json(200, { ok:true, path: `uploads/${name}` });
    }

    /* ---------- POST /send-email (Resend) ---------- */
    if (url.pathname === '/send-email' && request.method === 'POST'){
      let body;
      try { body = await request.json(); } catch(e){ return json(400, { ok:false, error:'bad json' }); }

      const resendApiKey = env.RESEND_API_KEY;
      if (!resendApiKey) return json(500, { ok:false, error:'RESEND_API_KEY non configurée' });

      const toEmail = env.DEST_EMAIL || 'tristankouker@gmail.com';
      const fromEmail = env.FROM_EMAIL || 'D\'LYR Website <onboarding@resend.dev>';
      const subject = body._subject || body.subject || 'Nouveau message reçu depuis le site D\'LYR';

      const replyTo = body.Email || body.email || undefined;
      const ccEmail = body.cc || undefined;

      // Construction du corps HTML sous forme de tableau propre
      let html = `<div style="font-family:sans-serif;font-size:16px;color:#1c3024;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px">
        <h2 style="color:#1c3024;border-bottom:2px solid #d4bc72;padding-bottom:10px">${subject}</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:15px">`;

      const ignoreKeys = ['_subject', '_template', '_captcha', 'cc'];
      for (const [key, value] of Object.entries(body)){
        if (ignoreKeys.includes(key)) continue;
        html += `<tr>
          <td style="padding:8px;font-weight:bold;background:#f8f9fa;border:1px solid #e0e0e0;width:35%">${key}</td>
          <td style="padding:8px;border:1px solid #e0e0e0;white-space:pre-wrap">${value}</td>
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
          subject: subject,
          html: html,
          ...(ccEmail ? { cc: [ccEmail] } : {}),
          ...(replyTo ? { reply_to: replyTo } : {})
        })
      });

      if (!resendRes.ok){
        const errDetail = await resendRes.text();
        return json(502, { ok:false, error:'resend_error', status:resendRes.status, detail: errDetail.slice(0,300) });
      }

      return json(200, { ok:true });
    }

    return json(404, { ok:false, error:'not found' });
  }
};
