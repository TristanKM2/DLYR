/* ============================================================
   D'LYR — Accueil : interactions
   ============================================================ */
(function () {
  const I = window.DLYR_ICONS || {};

  /* ---------- Injection des icônes ---------- */
  function icons() {
    const soc = document.querySelector('[data-social]');
    if (soc) soc.innerHTML =
      `<a href="#" aria-label="TikTok">${I.tiktok}</a>
       <a href="#" aria-label="Facebook">${I.facebook}</a>
       <a href="#" aria-label="Instagram">${I.instagram}</a>
       <a href="#" aria-label="LinkedIn">${I.linkedin}</a>`;
    document.querySelectorAll('.btn-arrow').forEach(b => { if (b.textContent.trim() === '_ARROW_') b.innerHTML = I.arrow; });
    document.querySelectorAll('[data-ic]').forEach(s => { s.innerHTML = I[s.dataset.ic] || ''; });
  }

  /* ---------- Slider Expériences VR ---------- */
  const GAMES = [
    { name: 'Outbreak Lab',        genre: 'Horreur',  dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/outbreak-lab.jpg', vid: 'uploads/video-gamers.mp4', href: 'jeu-outbreak-lab.html' },
    { name: 'Harbor Siege',        genre: 'Action',   dur: '20 min', pl: '2 à 12 joueurs', img: 'uploads/harbor-siege.jpg', vid: 'uploads/harbor-siege.mp4', vp: true, href: 'jeu-harbor-siege.html' },
    { name: 'Paradise Expedition', genre: 'Action',   dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/paradise-expedition.jpg', vid: 'uploads/paradise-expedition.mp4', vp: true, href: 'jeu-paradise-expedition.html' },
    { name: 'Volcanic Warfare',    genre: 'Action',   dur: '30 min', pl: '4 à 8 joueurs',  img: 'uploads/volcanic-warfare.jpg', vid: 'uploads/volcanic-warfare.mp4', href: 'jeu-volcanic-warfare.html' },
    { name: 'Time Quest',          genre: 'Aventure', dur: '30 min', pl: '2 à 20 participants', img: 'uploads/time-quest.jpg', vid: 'uploads/time-quest.mp4', href: 'jeu-time-quest.html' },
    { name: 'Snow Village',        genre: 'Famille',  dur: '15 min', pl: '2 à 12 joueurs', img: 'uploads/snow-village.jpg', vid: 'uploads/snow-village.mp4', vp: true, href: 'jeu-snow-village.html' },
    { name: 'Icarus Station',      genre: 'Escape game', dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/icarus-station.jpg', vid: 'uploads/icarus-station.mp4', href: 'jeu-icarus-station.html' },
    { name: 'Brain Arena',         genre: 'Quiz',     dur: '30 min', pl: '2 à 8 joueurs', img: 'uploads/brain-arena.jpg', vid: 'uploads/brain-arena.mp4', vp: true, href: 'jeu-brain-arena.html' },
    { name: 'Spirit of the Wild',  genre: 'Aventure', dur: '30 min', pl: '2 à 10 joueurs', img: 'uploads/spirit-of-the-wild.jpg', href: 'jeu-spirit-of-the-wild.html' },
  ];
  function slider() {
    const root = document.querySelector('[data-slider]');
    if (!root) return;
    const track = root.querySelector('[data-track]');
    const dots = document.querySelector('[data-dots]');
    const titleEl = document.querySelector('[data-xp-title]');
    const clockSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
    const plSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15 19a4.5 4.5 0 0 1 6 0"/></svg>';
    track.innerHTML = GAMES.map(g => `
      <${g.href ? `a href="${g.href}"` : 'div'} class="slide${g.vid ? ' slide--video' : ''}">
        <div class="ph ph--dark">${g.img ? `<img class="ph__img" src="${g.img}" alt="${g.name}" style="object-position:center 30%">` : `<span class="ph__label">Visuel · ${g.name}</span>`}</div>
        ${g.vid ? `<video class="slide__video${g.vp ? ' slide__video--portrait' : ''}" src="${g.vid}" muted loop playsinline preload="metadata"></video>` : ''}
        <div class="slide__scrim"></div>
        <div class="slide__top"><span class="tag-genre">${g.genre}</span></div>
        ${g.vid ? `<div class="slide__ctrl"><button type="button" data-vplay aria-label="Lecture / pause"></button><button type="button" data-vmute aria-label="Activer / couper le son"></button></div>` : ''}
        <div class="slide__name">${g.name}</div>
        <div class="slide__meta">
          <span>${clockSvg} Durée ${g.dur}</span>
          <span>${plSvg} ${g.pl}</span>
        </div>
      </${g.href ? 'a' : 'div'}>`).join('');

    /* contrôles vidéo (sans quitter le lien vers la fiche jeu) */
    const icPlay = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>';
    const icPause = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
    const icVol = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>';
    const icMute = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/><path d="M16 9l6 6M22 9l-6 6"/></svg>';
    track.querySelectorAll('.slide--video').forEach(sl => {
      const v = sl.querySelector('video');
      const bp = sl.querySelector('[data-vplay]');
      const bm = sl.querySelector('[data-vmute]');
      const sync = () => { bp.innerHTML = v.paused ? icPlay : icPause; bm.innerHTML = v.muted ? icMute : icVol; };
      bp.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); if (v.paused) { v.dataset.user = ''; v.play(); } else { v.dataset.user = 'paused'; v.pause(); } });
      bm.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); v.muted = !v.muted; });
      ['play', 'pause', 'volumechange'].forEach(ev => v.addEventListener(ev, sync));
      sync();
    });
    dots.innerHTML = GAMES.map((_, i) => `<button aria-label="Slide ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('');
    let idx = 0; const n = GAMES.length;

    /* lecture uniquement quand la vidéo est visible (slide actif + slider à l'écran) */
    let inView = false;
    const vids = [...track.querySelectorAll('.slide--video')].map(sl => ({
      v: sl.querySelector('video'),
      k: [...track.children].indexOf(sl),
    }));
    function syncPlayback() {
      vids.forEach(({ v, k }) => {
        const active = (k === idx) && inView;
        if (!active) { if (!v.paused) v.pause(); }
        else if (v.dataset.user !== 'paused' && v.paused) { v.play().catch(() => {}); }
      });
    }
    if (vids.length && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        syncPlayback();
      }, { threshold: .35 }).observe(root);
    } else { inView = true; syncPlayback(); }

    function go(i) {
      idx = (i + n) % n;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.querySelectorAll('button').forEach((b, k) => b.classList.toggle('on', k === idx));
      if (titleEl) titleEl.textContent = GAMES[idx].name;
      syncPlayback();
    }
    root.querySelector('.slider__nav--next').addEventListener('click', () => go(idx + 1));
    root.querySelector('.slider__nav--prev').addEventListener('click', () => go(idx - 1));
    // Navigation clavier (flèches) quand le slider a le focus
    root.setAttribute('tabindex', '0');
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Expériences VR — carrousel');
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); restart(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); restart(); }
    });
    dots.querySelectorAll('button').forEach((b, k) => b.addEventListener('click', () => go(k)));
    let timer = setInterval(() => go(idx + 1), 5000);
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5000); };
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', restart);
    if (window.DLYR_swipe) window.DLYR_swipe(root.querySelector('.slider__viewport'), {
      left: () => { go(idx + 1); restart(); },
      right: () => { go(idx - 1); restart(); },
    });
    go(0);
  }

  /* ---------- Carrousel d'avis ---------- */
  const REVIEWS = [
    { n: 'Thomas M.', c: '#43744c', t: "Une expérience VR bluffante ! On s'est cru dans le jeu pendant 30 minutes. L'équipe est top et le bar parfait pour finir la soirée." },
    { n: 'Sophie L.', c: '#55703a', t: "Organisé l'EVJF de ma sœur ici, soirée inoubliable. Quiz Hologame, fléchettes, cocktails… tout y était. Je recommande à 200%." },
    { n: 'Julien R.', c: '#1b8a4b', t: "Le meilleur spot de Colombes pour s'amuser entre potes. Les jeux sont variés et l'immersion est totale. On reviendra !" },
    { n: 'Inès B.',   c: '#c2410c', t: "Anniversaire de mon fils au top, les enfants ont adoré la réalité virtuelle. Accueil chaleureux et formule goûter parfaite." },
    { n: 'Karim D.',  c: '#43744c', t: "Team building d'entreprise réussi. Ambiance garantie, défis VR en équipe et privatisation impeccable. Bravo à toute l'équipe." },
  ];
  function reviews() {
    const root = document.querySelector('[data-reviews]');
    if (!root) return;
    const track = root.querySelector('[data-rev-track]');
    const dots = document.querySelector('[data-rev-dots]');
    track.innerHTML = REVIEWS.map(r => `
      <div class="rcard">
        <div class="rcard__inner">
          <div class="rcard__stars">★★★★★</div>
          <p class="rcard__text">"${r.t}"</p>
          <div class="rcard__who">
            <span class="rcard__av" style="background:${r.c}">${r.n[0]}</span>
            <span class="rcard__name">${r.n}</span>
          </div>
        </div>
      </div>`).join('');

    function perView() { return window.innerWidth <= 720 ? 1 : window.innerWidth <= 980 ? 2 : 3; }
    let idx = 0;
    function maxIdx() { return Math.max(0, REVIEWS.length - perView()); }
    function render() {
      const pv = perView();
      track.querySelectorAll('.rcard').forEach(c => c.style.flexBasis = (100 / pv) + '%');
      idx = Math.min(idx, maxIdx());
      track.style.transform = `translateX(-${idx * (100 / pv)}%)`;
      dots.innerHTML = Array.from({ length: maxIdx() + 1 }, (_, i) =>
        `<button${i === idx ? ' class="on"' : ''} aria-label="Page ${i + 1}"></button>`).join('');
      dots.querySelectorAll('button').forEach((b, k) => b.addEventListener('click', () => { idx = k; render(); }));
    }
    root.querySelector('.rev__nav--next').addEventListener('click', () => { idx = Math.min(idx + 1, maxIdx()); render(); });
    root.querySelector('.rev__nav--prev').addEventListener('click', () => { idx = Math.max(idx - 1, 0); render(); });
    if (window.DLYR_swipe) window.DLYR_swipe(root.querySelector('.rev__viewport'), {
      left: () => { idx = Math.min(idx + 1, maxIdx()); render(); },
      right: () => { idx = Math.max(idx - 1, 0); render(); },
    });
    window.addEventListener('resize', render);
    render();
  }

  /* ---------- Compteurs animés ---------- */
  function counters() {
    const els = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target; io.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.dec || '0', 10);
        const dur = 1400; const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * ease).toFixed(dec);
          if (p < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    els.forEach(el => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    icons(); slider(); reviews(); counters();
  });
})();
