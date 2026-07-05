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

    return json(404, { ok:false, error:'not found' });
  }
};
