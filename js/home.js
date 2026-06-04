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
       <a href="#" aria-label="X">${I.x}</a>
       <a href="#" aria-label="Instagram">${I.instagram}</a>`;
    document.querySelectorAll('.btn-arrow').forEach(b => { if (b.textContent.trim() === '_ARROW_') b.innerHTML = I.arrow; });
    document.querySelectorAll('[data-ic]').forEach(s => { s.innerHTML = I[s.dataset.ic] || ''; });
  }

  /* ---------- Slider Expériences VR ---------- */
  const GAMES = [
    { name: 'Contagion',        genre: 'Horreur',   dur: '20 min', pl: '1 à 6 joueurs' },
    { name: 'Wild Odyssey',     genre: 'Aventure',  dur: '30 min', pl: '2 à 6 joueurs' },
    { name: 'The Smurfs',       genre: 'Famille',   dur: '25 min', pl: '1 à 4 joueurs' },
    { name: 'Contagion Origin', genre: 'Action',    dur: '20 min', pl: '1 à 6 joueurs' },
    { name: 'Affected',         genre: 'Horreur',   dur: '35 min', pl: '2 à 4 joueurs' },
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
      <div class="slide">
        <div class="ph ph--dark"><span class="ph__label">Visuel · ${g.name}</span></div>
        <div class="slide__scrim"></div>
        <div class="slide__top"><span class="tag-genre">${g.genre}</span></div>
        <div class="slide__name">${g.name}</div>
        <div class="slide__meta">
          <span>${clockSvg} Durée ${g.dur}</span>
          <span>${plSvg} ${g.pl}</span>
        </div>
      </div>`).join('');
    dots.innerHTML = GAMES.map((_, i) => `<button aria-label="Slide ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('');
    let idx = 0; const n = GAMES.length;
    function go(i) {
      idx = (i + n) % n;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.querySelectorAll('button').forEach((b, k) => b.classList.toggle('on', k === idx));
      if (titleEl) titleEl.textContent = GAMES[idx].name;
    }
    root.querySelector('.slider__nav--next').addEventListener('click', () => go(idx + 1));
    root.querySelector('.slider__nav--prev').addEventListener('click', () => go(idx - 1));
    dots.querySelectorAll('button').forEach((b, k) => b.addEventListener('click', () => go(k)));
    let timer = setInterval(() => go(idx + 1), 5000);
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => timer = setInterval(() => go(idx + 1), 5000));
    go(0);
  }

  /* ---------- Carrousel d'avis ---------- */
  const REVIEWS = [
    { n: 'Thomas M.', c: '#234db4', t: "Une expérience VR bluffante ! On s'est cru dans le jeu pendant 30 minutes. L'équipe est top et le bar parfait pour finir la soirée." },
    { n: 'Sophie L.', c: '#581383', t: "Organisé l'EVJF de ma sœur ici, soirée inoubliable. Karaoké, fléchettes, cocktails… tout y était. Je recommande à 200%." },
    { n: 'Julien R.', c: '#1b8a4b', t: "Le meilleur spot de Colombes pour s'amuser entre potes. Les jeux sont variés et l'immersion est totale. On reviendra !" },
    { n: 'Inès B.',   c: '#c2410c', t: "Anniversaire de mon fils au top, les enfants ont adoré la réalité virtuelle. Accueil chaleureux et formule goûter parfaite." },
    { n: 'Karim D.',  c: '#234db4', t: "Team building d'entreprise réussi. Ambiance garantie, défis VR en équipe et privatisation impeccable. Bravo à toute l'équipe." },
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
