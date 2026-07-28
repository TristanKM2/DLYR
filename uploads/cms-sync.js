/* ============================================================
   D'LYR — CMS Sync
   Applique sur les pages publiques le contenu édité dans le CMS
   (stocké dans localStorage par admin.html). Aucune dépendance.
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

  // Sélecteur du titre selon la page (par défaut .phero__title)
  var TITLE_SEL = { 'accueil':'.hero__tagline', 'jeux-vr':'.jhero__title' };
  // Sélecteur du texte principal (lead) — l'accueil n'en a pas
  var LEAD_SEL  = { 'accueil':null };

  function read(){
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch(e){ return {}; }
  }

  var file = location.pathname.split('/').pop().toLowerCase();
  var pageId = FILE_MAP[file];
  var store = read();
  var settings = store.settings || {};

  /* ---------- 1. Mode maintenance (global) ---------- */
  if(settings.maintenance){
    showMaintenance();
    return; // on n'applique rien d'autre
  }

  /* ---------- 2. Bandeau d'info (global) ---------- */
  if(settings.banner){
    showBanner(settings.bannerText || "Nouveau : réservez votre session VR en ligne — ouvert 7j/7 !");
  }

  /* ---------- 3. Contenu de la page ---------- */
  if(pageId && store.content && store.content[pageId]){
    applyContent(pageId, store.content[pageId].fr || {});
  }

  /* ---------- 4. Coordonnées / horaires dans le footer ---------- */
  applyGlobals(settings);

  // ====================================================

  function applyContent(id, c){
    if(!c) return;
    // Titre
    if(c.titre){
      var tSel = (id in TITLE_SEL) ? TITLE_SEL[id] : '.phero__title';
      if(tSel){ var t = document.querySelector(tSel); if(t) t.textContent = c.titre; }
    }
    // Texte principal (lead)
    if(c.desc){
      var lSel = (id in LEAD_SEL) ? LEAD_SEL[id] : '.phero__lead';
      if(lSel){ var l = document.querySelector(lSel); if(l) l.textContent = c.desc; }
    }
    // Meta SEO
    if(c.metaTitle){ document.title = c.metaTitle; }
    if(c.metaDesc){
      var m = document.querySelector('meta[name="description"]');
      if(m) m.setAttribute('content', c.metaDesc);
    }
  }

  function applyGlobals(s){
    // Le footer est injecté de façon asynchrone par site.js : on observe.
    function patch(){
      if(s.addr){
        document.querySelectorAll('[data-cms-addr], .footer__contact p').forEach(function(el){
          if(/Colombes|Gaulle/i.test(el.textContent)){
            var svg = el.querySelector('svg');
            el.textContent = ' ' + s.addr;
            if(svg) el.insertBefore(svg, el.firstChild);
          }
        });
      }
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

  function showMaintenance(){
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
      +   'Nous revenons très vite. En attendant, contactez-nous au 01 47 80 00 00 ou '
      +   '\u00e9crivez \u00e0 contact@dlyr.fr.</p>';
    function mount(){ document.body.appendChild(o); }
    if(document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  }
})();
