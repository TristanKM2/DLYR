/* ============================================================
   D'LYR — Site shell (nav + footer + interactions partagées)
   ============================================================ */
(function () {
  document.documentElement.classList.add('js-anim');
  const PAGES = [
    { href: 'index.html',      label: 'Accueil',     key: 'accueil' },
    { href: 'jeux-vr.html',    label: 'Jeux VR',     key: 'jeux' },
    { href: 'catalogue.html',  label: 'Expériences', key: 'catalogue' },
    { href: 'activites.html',  label: 'Activités',   key: 'activites' },
    { href: 'evenements.html', label: 'Évènements',  key: 'evenements' },
    { href: 'snack-bar.html',  label: 'Snack Bar',   key: 'snack' },
    { href: 'faq.html',        label: 'FAQ',         key: 'faq' },
  ];

  const ICONS = {
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16.5 3c.3 2.1 1.6 3.6 3.6 3.8v2.4c-1.3.1-2.5-.3-3.6-1v5.8a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.5a3.2 3.2 0 1 0 2.3 3V3h2.5z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.2 2H21l-6.5 7.4L22 22h-6l-4.7-6.1L5.9 22H3l7-8L2 2h6.2l4.2 5.6L18.2 2zm-1 18h1.6L7 3.7H5.3L17.2 20z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l1.6 5-2.2 1.4a12 12 0 0 0 5.2 5.2L15.2 15l5 1.6V21a1.6 1.6 0 0 1-1.8 1.6A17 17 0 0 1 3.4 5.8 1.6 1.6 0 0 1 5 4z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 9v9H9"/></svg>',
  };
  window.DLYR_ICONS = ICONS;

  function brand() {
    return `<a class="brand" href="index.html" aria-label="D'LYR accueil">D'LYR</a>`;
  }

  function buildNav() {
    const body = document.body;
    const current = body.dataset.page || '';
    const onPaper = body.dataset.nav === 'paper';
    const links = PAGES.map(p =>
      `<a href="${p.href}"${p.key === current ? ' aria-current="page"' : ''}>${p.label}</a>`
    ).join('');

    const nav = document.createElement('header');
    nav.className = 'nav' + (onPaper ? ' nav--on-paper' : '');
    nav.innerHTML = `
      <div class="nav__inner">
        ${brand()}
        <nav class="nav__links">${links}</nav>
        <div class="nav__cta">
          <a class="btn btn--sm ${onPaper ? 'btn--ink-o' : 'btn--paper-o'}" href="#reserver">Réserver</a>
        </div>
        <button class="nav__burger" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
    body.prepend(nav);

    const drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.innerHTML = `
      <button class="drawer__close" aria-label="Fermer">&times;</button>
      ${PAGES.map(p => `<a href="${p.href}"${p.key === current ? ' aria-current="page"' : ''}>${p.label}</a>`).join('')}
      <div class="drawer__cta">
        <a class="btn btn--lime" href="#reserver">Réserver</a>
        <a class="btn btn--paper-o" href="#offrir">Offrir</a>
      </div>`;
    body.appendChild(drawer);

    const burger = nav.querySelector('.nav__burger');
    const close = drawer.querySelector('.drawer__close');
    const open = () => { drawer.classList.add('open'); burger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const shut = () => { drawer.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    burger.addEventListener('click', open);
    close.addEventListener('click', shut);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));

    // état "solide" au scroll
    const onScroll = () => nav.classList.toggle('nav--solid', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function buildFooter() {
    const mount = document.querySelector('[data-footer]');
    if (!mount) return;
    const col = (title, items) =>
      `<div class="footer__col"><h4>${title}</h4><ul>${items.map(i => `<li><a href="${i[1]}">${i[0]}</a></li>`).join('')}</ul></div>`;
    mount.outerHTML = `
    <footer class="footer">
      <div class="footer__top wrap">
        <div class="footer__grid">
          <div class="footer__contact">
            <h4>Contactez-nous</h4>
            <p>${ICONS.pin}<span>3 Bd Charles de Gaulle,<br>92700 Colombes</span></p>
            <p>${ICONS.clock}<span>Ouvert tous les jours 11h–23h<br>Samedi 10h–Minuit · Dimanche 10h–22h</span></p>
            <p>${ICONS.phone}<span>+33 06 12 12 12 12</span></p>
            <div class="footer__followlabel">Follow us !</div>
            <div class="footer__social">
              <a href="#" aria-label="TikTok">${ICONS.tiktok}</a>
              <a href="#" aria-label="X">${ICONS.x}</a>
              <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
            </div>
          </div>
          ${col('Activités', [['Jeux VR','jeux-vr.html'],['Fléchettes & Karaoké','activites.html'],['Activités','activites.html']])}
          ${col('Mentions légales', [['Politique de confidentialité','#'],['Mentions légales','#'],['CGV','#']])}
          ${col('Plan du site', [['Accueil','index.html'],['Jeux VR','jeux-vr.html'],['Activités','activites.html'],['Évènements','evenements.html'],['Snack Bar','snack-bar.html'],['FAQ','faq.html'],['Réservation','#reserver'],['Contact','#']])}
        </div>
      </div>
      <div class="footer__word" aria-hidden="true">D'LYR</div>
      <div class="footer__bar">2025 — 2026 © D'LYR&nbsp;&nbsp;|&nbsp;&nbsp;Website created by Solanas.fr</div>
    </footer>`;
  }

  /* ---------- Scroll reveal ---------- */
  function reveal() {
    const root = document.documentElement;
    const els = Array.prototype.slice.call(document.querySelectorAll('.reveal:not(.in)'));
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    function check() {
      for (let i = els.length - 1; i >= 0; i--) {
        const e = els[i];
        const r = e.getBoundingClientRect();
        if (r.top < vh() * 0.94 && r.bottom > -40) { e.classList.add('in'); els.splice(i, 1); }
      }
      if (!els.length) { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); }
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check();
    requestAnimationFrame(check);
    setTimeout(check, 300);

    // Failsafe : si la timeline d'animation ne progresse pas (environnements
    // de rendu throttlés), on force l'affichage de tout après un court délai.
    function forceIfStuck() {
      const probe = document.querySelector('.reveal.in');
      if (!probe) { setTimeout(forceIfStuck, 200); return; }
      const anims = probe.getAnimations ? probe.getAnimations() : [];
      const progressing = anims.some(a => a.currentTime && a.currentTime > 0);
      if (!progressing && getComputedStyle(probe).opacity === '0') {
        root.classList.add('force-show');
      }
    }
    setTimeout(forceIfStuck, 250);
    // Filet ultime : tout devient visible au plus tard à 1,2 s.
    setTimeout(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); }, 1200);
  }
  window.DLYR_reveal = reveal;

  /* ---------- Marquees : duplique le contenu pour boucle continue ---------- */
  function marquees() {
    document.querySelectorAll('.marquee__track').forEach(tr => {
      if (tr.dataset.cloned) return;
      tr.dataset.cloned = '1';
      tr.innerHTML += tr.innerHTML;
    });
  }

  /* ---------- Réservation (placeholder) ---------- */
  function reserve() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href="#reserver"], a[href="#offrir"]');
      if (!a) return;
      e.preventDefault();
      const kind = a.getAttribute('href') === '#offrir' ? 'Offrir une carte cadeau' : 'Réserver une session';
      window.DLYR_toast ? window.DLYR_toast(kind + ' — réservation en ligne bientôt disponible !') : alert(kind + ' — bientôt disponible.');
    });
  }

  /* ---------- Toast léger ---------- */
  function toastInit() {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translate(-50%,140%);z-index:200;background:#dbf83a;color:#272727;font-family:Cuprum,sans-serif;font-weight:700;font-size:18px;padding:14px 26px;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.3);transition:transform .4s cubic-bezier(.6,0,.2,1);max-width:90vw;text-align:center';
    document.body.appendChild(t);
    let to;
    window.DLYR_toast = (msg) => {
      t.textContent = msg; t.style.transform = 'translate(-50%,0)';
      clearTimeout(to); to = setTimeout(() => t.style.transform = 'translate(-50%,140%)', 2800);
    };
  }

  /* ---------- Section "Où nous trouver" (réutilisable) ---------- */
  function buildMaps() {
    const mount = document.querySelector('[data-maps]');
    if (!mount) return;
    mount.outerHTML = `
    <section class="section bg-ink">
      <div class="wrap">
        <h2 class="h1 pmaps__h">Où nous trouver ?</h2>
        <div class="pmaps__layout reveal">
          <div class="ph ph--dark pmaps__map"><span class="ph__label">Carte · 3 Bd Charles de Gaulle, Colombes</span></div>
          <div class="pmaps__card">
            <h3 class="h3">Horaires d'ouverture</h3>
            <p class="pmaps__line">${ICONS.pin} 3 Bd Charles de Gaulle, 92700 Colombes</p>
            <p class="pmaps__line">${ICONS.clock} Tous les jours 11h–23h · Sam. 10h–Minuit · Dim. 10h–22h</p>
            <hr class="pmaps__rule">
            <h3 class="h3">Comment s'y rendre ?</h3>
            <div class="pmaps__how">
              <p><strong>En métro&nbsp;:</strong> Ligne T2 — arrêt Charlebourg, à 5 min à pied.</p>
              <p><strong>En bus&nbsp;:</strong> Lignes 167 / 366 — arrêt Charles de Gaulle.</p>
              <p><strong>En voiture&nbsp;:</strong> Parking gratuit à proximité, accès A86.</p>
            </div>
            <a class="btn btn--light" href="#" style="align-self:flex-start;margin-top:8px">Nous contacter</a>
          </div>
        </div>
      </div>
    </section>`;
  }

  /* ---------- Teaser Snack Bar (réutilisable) ---------- */
  function buildSnackTeaser() {
    const mount = document.querySelector('[data-snack-teaser]');
    if (!mount) return;
    mount.outerHTML = `
    <section class="section bg-paper tex">
      <div class="wrap">
        <h2 class="h1 eyebrow-bar" style="margin-bottom:clamp(36px,4vw,56px)"><span>Snack Bar</span></h2>
        <div class="steaser__grid reveal">
          <div class="ph steaser__media steaser__media--tall"><span class="ph__label">Photo · Cocktails</span></div>
          <div class="ph steaser__media"><span class="ph__label">Photo · Bar</span></div>
          <div class="ph steaser__media"><span class="ph__label">Photo · Tapas</span></div>
        </div>
        <div class="steaser__foot reveal"><a class="btn btn--ink-o" href="snack-bar.html">Voir la carte</a></div>
      </div>
    </section>`;
  }

  function init() {
    [buildNav, buildFooter, buildMaps, buildSnackTeaser, toastInit, reserve, marquees].forEach(fn => {
      try { fn(); } catch (e) { console.warn('[DLYR]', fn.name, e); }
    });
    try { reveal(); } catch (e) { console.warn('[DLYR] reveal', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('load', () => { try { reveal(); } catch (e) {} });
})();
