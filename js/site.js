/* ============================================================
   D'LYR — Site shell (nav + footer + interactions partagées)
   ============================================================ */
(function () {
  document.documentElement.classList.add('js-anim');
  const PAGES = [
    { href: 'jeux-vr.html',     label: 'Jeux VR',     key: 'jeux' },
    { href: 'catalogue.html',   label: 'Expériences VR', key: 'catalogue' },
    { href: 'activites.html',   label: 'Activités',   key: 'activites' },
    { href: 'evenements.html',  label: 'Évènements',  key: 'evenements' },
    { href: 'entreprises.html', label: 'Entreprises', key: 'entreprises' },
    { href: 'snack-bar.html',   label: 'Snack Bar',   key: 'snack' },
    { href: 'faq.html',         label: 'FAQ',         key: 'faq' },
  ];

  const ICONS = {
    tiktok: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16.5 3c.3 2.1 1.6 3.6 3.6 3.8v2.4c-1.3.1-2.5-.3-3.6-1v5.8a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.5a3.2 3.2 0 1 0 2.3 3V3h2.5z"/></svg>',
    facebook: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.5 22v-8.1h2.7l.4-3.1h-3.1V8.8c0-.9.25-1.5 1.55-1.5h1.65V4.5c-.3-.04-1.3-.13-2.4-.13-2.4 0-4.05 1.47-4.05 4.15v2.27H7.55v3.1h2.7V22h3.25z"/></svg>',
    instagram: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.4 8.4h3.1V21H3.4V8.4zM9.2 8.4h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.52c0-1.32-.02-3.01-1.84-3.01-1.84 0-2.12 1.44-2.12 2.92V21H9.2V8.4z"/></svg>',
    pin: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    clock: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    phone: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l1.6 5-2.2 1.4a12 12 0 0 0 5.2 5.2L15.2 15l5 1.6V21a1.6 1.6 0 0 1-1.8 1.6A17 17 0 0 1 3.4 5.8 1.6 1.6 0 0 1 5 4z"/></svg>',
    arrow: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 9v9H9"/></svg>',
  };
  window.DLYR_ICONS = ICONS;

  function brand(onPaper) {
    const logo = onPaper ? 'uploads/DLYR-01.png' : 'uploads/DLYR-02.png';
    return `<a class="brand" href="index.html" aria-label="D'LYR — accueil"><img src="${logo}" alt="D'LYR — vivez l'immersion VR"></a>`;
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
        ${brand(onPaper)}
        <nav class="nav__links">${links}</nav>
        <div class="nav__cta">
          <a class="btn btn--sm ${onPaper ? 'btn--ink-o' : 'btn--paper-o'}" href="#reserver">Réserver</a>
        </div>
        <button class="nav__burger" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
    body.prepend(nav);

    // Lien d'évitement (RGAA 12.7) — première cible focusable de la page
    const main = document.querySelector('.hero, .phero, .jhero, main, .section');
    if (main) {
      if (!main.id) main.id = 'contenu';
      main.setAttribute('tabindex', '-1');
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#' + main.id;
      skip.textContent = 'Aller au contenu';
      body.prepend(skip);
    }

    const drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.innerHTML = `
      <button class="drawer__close" aria-label="Fermer">&times;</button>
      ${PAGES.map(p => `<a href="${p.href}"${p.key === current ? ' aria-current="page"' : ''}>${p.label}</a>`).join('')}
      <div class="drawer__cta">
        <a class="btn btn--lime" href="#reserver">Réserver</a>
        <a class="btn btn--paper-o" href="offrir.html">Offrir</a>
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
            <p>${ICONS.clock}<span>Ouvert 7j/7 · Lun–Ven 11h–22h30<br>Samedi 10h–23h · Dimanche 10h–21h30</span></p>
            <p>${ICONS.phone}<span><a href="tel:+33147800000">01 47 80 00 00</a></span></p>
            <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg><a href="mailto:contact@dlyr.fr" style="text-decoration:underline">contact@dlyr.fr</a></p>
            <div class="footer__followlabel">Follow us !</div>
            <div class="footer__social">
              <a href="#" aria-label="TikTok">${ICONS.tiktok}</a>
              <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
              <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
              <a href="#" aria-label="LinkedIn">${ICONS.linkedin}</a>
            </div>
          </div>
          ${col('Activités', [['Jeux VR','jeux-vr.html'],['Fléchettes & Quiz','activites.html'],['Catalogue VR','catalogue.html']])}
          ${col('Mentions légales', [['Politique de confidentialité','politique-confidentialite.html'],['Mentions légales','mentions-legales.html'],['CGV','cgv.html']])}
          ${col('Plan du site', [['Accueil','index.html'],['Jeux VR','jeux-vr.html'],['Activités','activites.html'],['Évènements','evenements.html'],['Entreprises','entreprises.html'],['Offrir','offrir.html'],['Snack Bar','snack-bar.html'],['FAQ','faq.html']])}
        </div>
      </div>
      <div class="footer__word" aria-hidden="true"><img src="uploads/DLYR-05.png" alt=""></div>
      <div class="footer__bar">© D'LYR — Vivez l'immersion VR · Colombes</div>
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
      const container = tr.parentElement;
      const unit = tr.innerHTML;
      // Répète le motif de base jusqu'à ce qu'une "moitié" remplisse largement l'écran,
      // puis duplique le tout : les deux moitiés identiques donnent une boucle sans raccord.
      let half = unit;
      tr.innerHTML = half;
      let guard = 0;
      while (tr.scrollWidth < container.offsetWidth + 100 && guard < 40) {
        half += unit;
        tr.innerHTML = half;
        guard++;
      }
      tr.innerHTML = half + half;
    });
  }

  /* ---------- Réservation (placeholder) ---------- */
  function reserve() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href="#reserver"]');
      if (!a) return;
      e.preventDefault();
      const kind = 'Réserver une session';
      window.DLYR_toast ? window.DLYR_toast(kind + ' — réservation en ligne bientôt disponible !') : alert(kind + ' — bientôt disponible.');
    });
  }

  /* ---------- Bandeau cookies (RGPD) ---------- */
  function cookies() {
    var KEY = 'dlyr_cookie_consent';
    try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }
    var b = document.createElement('div');
    b.className = 'cookiebar';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Gestion des cookies');
    b.innerHTML =
      '<div class="cookiebar__txt"><strong>Cookies &amp; confidentialit\u00e9</strong>' +
      'Nous utilisons des cookies pour le bon fonctionnement du site et, avec votre accord, pour mesurer son audience. Notre module de r\u00e9servation (Smeetz) d\u00e9pose \u00e9galement ses propres cookies. ' +
      '<a href="politique-confidentialite.html#cookies">En savoir plus</a></div>' +
      '<div class="cookiebar__btns">' +
      '<button class="btn btn--lime btn--sm" data-cc="accepted">Tout accepter</button>' +
      '<button class="btn btn--paper-o btn--sm" data-cc="refused">Continuer sans accepter</button>' +
      '</div>';
    b.addEventListener('click', function (e) {
      var t = e.target.closest('[data-cc]');
      if (!t) return;
      try { localStorage.setItem(KEY, t.dataset.cc); } catch (err) {}
      b.classList.remove('cookiebar--in');
      setTimeout(function () { b.remove(); }, 400);
    });
    document.body.appendChild(b);
    setTimeout(function () { b.classList.add('cookiebar--in'); }, 80);
    // Failsafe : si la transition ne progresse pas (environnement throttlé), on force la position finale.
    setTimeout(function () {
      if (getComputedStyle(b).transform.indexOf('matrix') !== -1 && b.getBoundingClientRect().top > window.innerHeight) {
        b.style.transition = 'none';
        b.classList.add('cookiebar--in');
        b.style.transform = 'translate(-50%,0)';
      }
    }, 900);
  }

  /* ---------- Toast léger ---------- */
  function toastInit() {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translate(-50%,140%);z-index:200;background:#dbf83a;color:#272727;font-family:Barlow,sans-serif;font-weight:700;font-size:18px;padding:14px 26px;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.3);transition:transform .4s cubic-bezier(.6,0,.2,1);max-width:90vw;text-align:center';
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
          <div class="ph ph--dark pmaps__map map-embed"><iframe src="https://www.google.com/maps?q=3%20Boulevard%20Charles%20de%20Gaulle%2C%2092700%20Colombes&output=embed&hl=fr" title="Carte — D'LYR, 3 Bd Charles de Gaulle, Colombes" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
          <div class="pmaps__card">
            <h3 class="h3">Horaires d'ouverture</h3>
            <p class="pmaps__line">${ICONS.pin} 3 Bd Charles de Gaulle, 92700 Colombes</p>
            <p class="pmaps__line">${ICONS.clock} 7j/7 · Lun–Ven 11h–22h30 · Sam. 10h–23h · Dim. 10h–21h30</p>
            <hr class="pmaps__rule">
            <h3 class="h3">Comment s'y rendre ?</h3>
            <div class="pmaps__how">
              <p><strong>En métro&nbsp;:</strong> Ligne T2 — arrêt Charlebourg, à 5 min à pied.</p>
              <p><strong>En bus&nbsp;:</strong> Lignes 167 / 366 — arrêt Charles de Gaulle.</p>
              <p><strong>En voiture&nbsp;:</strong> Parking gratuit à proximité, accès A86.</p>
            </div>
            <a class="btn btn--light" href="mailto:contact@dlyr.fr?subject=${encodeURIComponent("Contact D'LYR")}" style="align-self:flex-start;margin-top:8px">Nous contacter</a>
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
    [buildNav, buildFooter, buildMaps, buildSnackTeaser, toastInit, reserve, marquees, cookies].forEach(fn => {
      try { fn(); } catch (e) { console.warn('[DLYR]', fn.name, e); }
    });
    try { reveal(); } catch (e) { console.warn('[DLYR] reveal', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('load', () => { try { reveal(); } catch (e) {} });
})();
