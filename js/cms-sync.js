/* ============================================================
   D'LYR — CMS Sync v2
   Applique sur les pages publiques le contenu édité dans le CMS.
   Source de vérité : les fichiers content/*.json du repo
   (servis par Cloudflare Pages). Le localStorage sert de
   surcouche de prévisualisation quand on vient d'éditer
   dans admin.html sur le même navigateur.
   ============================================================ */
(function(){
  'use strict';

  var STORE_KEY = 'dlyr_cms';

  // Fichier courant -> identifiant de page CMS
  var FILE_MAP = {
    '':              'accueil',
    'index.html':    'accueil',
    'catalogue.html':'catalogue',
    'jeux-vr.html':  'jeux-vr',
    'activites.html':'activites',
    'evenements.html':'evenements',
    'entreprises.html':'entreprises',
    'offrir.html':   'offrir',
    'snack-bar.html':'snack-bar',
    'faq.html':      'faq'
  };

  // Identifiant de page CMS -> nom du fichier JSON dans content/
  var JSON_NAME = { 'accueil':'index' };

  // Sélecteurs par page (null = champ non applicable sur cette page)
  // jeux-vr : le titre du hero est le nom du jeu affiché (slider),
  // on ne l'écrase pas — seules les meta SEO s'appliquent.
  var TITLE_SEL = { 'accueil':'.hero__tagline', 'jeux-vr':null };
  var LEAD_SEL  = { 'accueil':null, 'jeux-vr':null };
  var SUB_SEL   = { 'accueil':null, 'jeux-vr':null };

  var file = location.pathname.split('/').pop().toLowerCase();
  var pageId = FILE_MAP[file];

  function readLocal(){
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch(e){ return {}; }
  }

  function fetchJSON(name){
    return fetch('content/' + name + '.json', { cache:'no-store' })
      .then(function(r){ return r.ok ? r.json() : null; })
      .catch(function(){ return null; });
  }

  // 1. On charge global.json + le JSON de la page, puis on applique.
  Promise.all([
    fetchJSON('global'),
    pageId ? fetchJSON(JSON_NAME[pageId] || pageId) : Promise.resolve(null)
  ]).then(function(res){
    var local    = readLocal();
    var settings = merge(res[0], local.settings);
    var content  = pageContent(res[1], local, pageId);
    ready(function(){ apply(settings, content); });
  });

  function merge(base, over){
    var out = {};
    var k;
    if(base) for(k in base) out[k] = base[k];
    if(over) for(k in over) out[k] = over[k];
    return out;
  }

  // Le JSON peut contenir { fr:{...}, en:{...} } ou directement les champs
  function pageContent(json, local, id){
    var remote = json ? (json.fr || json) : null;
    var loc = (id && local.content && local.content[id]) ? (local.content[id].fr || {}) : null;
    return merge(remote, loc);
  }

  function ready(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  // ====================================================

  function apply(settings, c){
    /* ---------- Mode maintenance (global) ---------- */
    if(settings.maintenance){
      showMaintenance(settings);
      return; // on n'applique rien d'autre
    }

    /* ---------- Bandeau d'info (global) ---------- */
    if(settings.banner){
      showBanner(settings.bannerText || "Nouveau : réservez votre session VR en ligne — ouvert 7j/7 !");
    }

    /* ---------- Contenu de la page ---------- */
    if(pageId && c) applyContent(pageId, c);

    /* ---------- Coordonnées / horaires (footer + cartes) ---------- */
    applyGlobals(settings);
  }

  function setText(sel, txt){
    var el = document.querySelector(sel);
    if(el) el.textContent = txt;
  }

  function applyContent(id, c){
    // Titre principal
    if(c.titre){
      var tSel = (id in TITLE_SEL) ? TITLE_SEL[id] : '.phero__title';
      if(tSel) setText(tSel, c.titre);
    }
    // Texte principal (lead)
    if(c.desc){
      var lSel = (id in LEAD_SEL) ? LEAD_SEL[id] : '.phero__lead';
      if(lSel) setText(lSel, c.desc);
    }
    // Sous-titre -> texte d'accroche à côté de la flèche du hero
    if(c.sous){
      var sSel = (id in SUB_SEL) ? SUB_SEL[id] : '.phero__cue span:last-child';
      if(sSel) setText(sSel, c.sous);
    }
    // NB : le champ « sec » n'a pas d'emplacement sur les pages (réservé).
    // Meta SEO
    if(c.metaTitle){ document.title = c.metaTitle; }
    if(c.metaDesc){
      var m = document.querySelector('meta[name="description"]');
      if(m) m.setAttribute('content', c.metaDesc);
    }
  }

  function applyGlobals(s){
    var hours = (s.h1 || s.h2 || s.h3)
      ? 'Ouvert 7j/7 · Lun–Ven ' + (s.h1||'') + '\nSamedi ' + (s.h2||'') + ' · Dimanche ' + (s.h3||'')
      : null;

    // Le footer est injecté de façon asynchrone par site.js : on réessaie.
    function patch(){
      var ps = document.querySelectorAll('.footer__contact p');
      if(ps.length >= 4){
        if(s.addr) setSpan(ps[0], s.addr);
        if(hours)  setSpan(ps[1], hours);
        if(s.tel){
          var a = ps[2].querySelector('a');
          if(a){ a.textContent = s.tel; a.href = 'tel:+33' + s.tel.replace(/\D/g,'').replace(/^0/,''); }
        }
        if(s.mail){
          var m = ps[3].querySelector('a');
          if(m){ m.textContent = s.mail; m.href = 'mailto:' + s.mail; }
        }
      }
      // Carte « Où nous trouver » (injectée aussi par site.js)
      var lines = document.querySelectorAll('.pmaps__line');
      if(lines.length >= 2){
        if(s.addr) appendAfterIcon(lines[0], ' ' + s.addr);
        if(s.h1)   appendAfterIcon(lines[1], ' 7j/7 · Lun–Ven ' + s.h1 + ' · Sam. ' + (s.h2||'') + ' · Dim. ' + (s.h3||''));
      }
    }
    function setSpan(p, txt){
      var span = p.querySelector('span:last-child');
      if(span){ span.textContent = ''; txt.split('\n').forEach(function(line, i){
        if(i) span.appendChild(document.createElement('br'));
        span.appendChild(document.createTextNode(line));
      }); }
    }
    function appendAfterIcon(el, txt){
      var svg = el.querySelector('svg');
      el.textContent = txt;
      if(svg) el.insertBefore(svg, el.firstChild);
    }
    patch();
    var tries = 0, iv = setInterval(function(){ patch(); if(++tries>20) clearInterval(iv); }, 200);
  }

  function showBanner(text){
    if(document.querySelector('.cms-banner')) return;
    var b = document.createElement('div');
    b.className = 'cms-banner';
    b.style.cssText = 'position:relative;z-index:70;background:#dbf83a;color:#0e0e0e;'
      + 'font-family:Barlow,sans-serif;font-weight:700;font-size:15px;text-align:center;'
      + 'padding:9px 44px 9px 16px;letter-spacing:.01em;';
    b.textContent = text;
    var x = document.createElement('button');
    x.textContent = '\u00d7';
    x.setAttribute('aria-label','Fermer');
    x.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);'
      + 'background:none;border:none;font-size:22px;line-height:1;color:#0e0e0e;cursor:pointer;';
    x.addEventListener('click', function(){ b.remove(); });
    b.appendChild(x);
    document.body.insertBefore(b, document.body.firstChild);
  }

  function showMaintenance(s){
    var tel  = s.tel  || '01 47 80 00 00';
    var mail = s.mail || 'contact@dlyr-vr.com';
    var o = document.createElement('div');
    o.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#0e0e0e;color:#f5f0e8;'
      + 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + 'text-align:center;padding:32px;font-family:Barlow,sans-serif;';
    o.innerHTML =
      '<div style="font-weight:900;font-style:italic;font-size:54px;letter-spacing:-.02em;">'
      +   'D<span style="color:#c8f135">\u2019</span>LYR</div>'
      + '<div style="font-family:\'Space Grotesk\',monospace;font-size:12px;letter-spacing:.22em;'
      +   'text-transform:uppercase;color:#c8f135;margin-top:10px;">Maintenance</div>'
      + '<h1 style="font-weight:800;font-size:clamp(28px,5vw,46px);margin:26px 0 12px;">'
      +   'Le site est en maintenance</h1>'
      + '<p style="color:#8c8c8c;font-size:17px;max-width:42ch;line-height:1.5;">'
      +   'Nous revenons très vite. En attendant, contactez-nous au ' + tel + ' ou '
      +   '\u00e9crivez \u00e0 ' + mail + '.</p>';
    function mount(){ document.body.appendChild(o); }
    if(document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  }
})();
