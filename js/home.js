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
    { name: 'Outbreak Lab', genre: 'Horreur', theme: 'Survie · Zombies', pitch: "Un laboratoire contaminé, des couloirs plongés dans le noir et une horde qui se rapproche : survivrez-vous assez longtemps pour percer le secret de X-Labs ?", dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/outbreak-lab.jpg', href: 'jeu-outbreak-lab.html' },
    { name: 'Harbor Siege', genre: 'Action', theme: 'Conquête · Stratégie', pitch: "Deux équipes, un port abandonné, des ruelles à prendre mètre par mètre. Coordonnez-vous, tenez vos positions et dominez le champ de bataille.", dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/harbor-siege.jpg', href: 'jeu-harbor-siege.html' },
    { name: 'Paradise Expedition', genre: 'Action', theme: 'Free For All · Survie', pitch: "Une serre tropicale magnifique… et impitoyable. Chacun pour soi : dans ce paradis perdu, chaque rencontre peut être votre dernière.", dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/paradise-expedition.jpg', href: 'jeu-paradise-expedition.html' },
    { name: 'Volcanic Warfare', genre: 'Action', theme: 'Team Deathmatch · Tactique', pitch: "La lave dévale l'île et le sol tremble sous vos pieds. Deux équipes s'affrontent, une seule victoire : jouez serré, la montagne ne pardonne pas.", dur: '30 min', pl: '4 à 8 joueurs', img: 'uploads/volcanic-warfare.jpg', href: 'jeu-volcanic-warfare.html' },
    { name: 'Time Quest', genre: 'Aventure', theme: 'Narratif · Culturel', pitch: "Une faille temporelle vous propulse d'une civilisation à l'autre. Explorez, déchiffrez, résolvez les mystères du temps et vivez l'Histoire de l'intérieur.", dur: '30 min', pl: '2 à 20 participants', img: 'uploads/time-quest.jpg', href: 'jeu-time-quest.html' },
    { name: 'Snow Village', genre: 'Famille', theme: 'Coopératif · Magie de Noël', pitch: "Le village du Père Noël est attaqué et la magie s'éteint. En famille, défendez les lutins et rendez Noël à Snow Village.", dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/snow-village.jpg', href: 'jeu-snow-village.html' },
    { name: 'Icarus Station', genre: 'Escape game', theme: 'Coopératif · Science-fiction', pitch: "La station Icarus-7 dérive et ses systèmes lâchent un à un. Réparez, coopérez, atteignez la plateforme d'extraction avant le vide spatial.", dur: '30 min', pl: '2 à 12 joueurs', img: 'uploads/icarus-station.jpg', href: 'jeu-icarus-station.html' },
    { name: 'Brain Arena', genre: 'Quiz', theme: 'Multijoueur · Culture générale', pitch: "Le premier jeu télévisé immersif où votre cerveau est l'arme absolue. Buzzez plus vite que les autres et grimpez au classement.", dur: '30 min', pl: '2 à 8 joueurs', img: 'uploads/brain-arena.jpg', href: 'jeu-brain-arena.html' },
    { name: 'Spirit of the Wild', genre: 'Aventure', theme: 'Sensoriel · Nature', pitch: "Inspiré des légendes du Grand Nord : devenez créature mythique, traversez des paysages enchanteurs et éveillez l'animal qui sommeille en vous.", dur: '30 min', pl: '2 à 10 joueurs', img: 'uploads/spirit-of-the-wild.jpg', href: 'jeu-spirit-of-the-wild.html' },
  ];
  function posters() {
    const grid = document.querySelector('[data-posters]');
    if (!grid) return;
    grid.innerHTML = GAMES.map((g, i) => `
      <div class="pslide">
        <a class="poster" href="${g.href}" aria-label="${g.name}" data-fit>
          <img class="poster__img" src="${g.img}" alt="${g.name} — affiche du jeu VR" loading="${i ? 'lazy' : 'eager'}">
        </a>
        <div class="pinfo">
          <span class="tag-genre">${g.genre}</span>
          <h3 class="pinfo__name">${g.name}</h3>
          <p class="pinfo__theme">${g.theme}</p>
          <p class="pinfo__pitch">${g.pitch}</p>
          <ul class="pinfo__meta">
            <li><svg aria-hidden=\"true\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3.5 2\"/></svg>${g.dur}</li>
            <li><svg aria-hidden=\"true\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><circle cx=\"17\" cy=\"9\" r=\"2.4\"/><path d=\"M3.5 19a5.5 5.5 0 0 1 11 0M15 19a4.5 4.5 0 0 1 6 0\"/></svg>${g.pl}</li>
          </ul>
          <a class="btn btn--lime-o btn--sm" href="${g.href}">Découvrir le jeu</a>
        </div>
      </div>`).join('');
    /* chaque affiche adopte le ratio exact de son image : aucun recadrage */
    grid.querySelectorAll('[data-fit] img').forEach(img => {
      const fit = () => {
        if (!img.naturalWidth) return;
        img.closest('[data-fit]').style.setProperty('--ar', img.naturalWidth + ' / ' + img.naturalHeight);
      };
      img.complete ? fit() : img.addEventListener('load', fit, { once: true });
    });

    const rail = document.querySelector('[data-prail]');
    if (!rail) return;
    const prev = rail.querySelector('[data-prail-prev]');
    const next = rail.querySelector('[data-prail-next]');
    const slides = [...grid.children];
    let i = 0;

    const go = (n, smooth) => {
      i = (n + slides.length) % slides.length;
      grid.scrollTo({ left: slides[i].offsetLeft - grid.offsetLeft, behavior: smooth === false ? 'auto' : 'smooth' });
      dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
    };

    const dotsWrap = rail.parentElement.querySelector('[data-prail-dots]');
    const dots = slides.map((s, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pdot';
      b.setAttribute('aria-label', GAMES[k].name);
      b.addEventListener('click', () => go(k));
      dotsWrap && dotsWrap.appendChild(b);
      return b;
    });

    prev.addEventListener('click', () => go(i - 1));
    next.addEventListener('click', () => go(i + 1));

    /* garde l'index en phase avec le défilement tactile */
    let t;
    grid.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const c = grid.scrollLeft + grid.clientWidth / 2;
        let best = 0, bd = Infinity;
        slides.forEach((s, k) => {
          const d = Math.abs(s.offsetLeft - grid.offsetLeft + s.offsetWidth / 2 - c);
          if (d < bd) { bd = d; best = k; }
        });
        i = best;
        dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
      }, 90);
    }, { passive: true });

    window.addEventListener('resize', () => go(i, false));
    go(0, false);
  }

  /* ---------- Carrousel d'avis ---------- */
  const REVIEWS = [
    { n: 'Thomas M.', c: '#43744c', t: "Une expérience VR bluffante ! On s'est cru dans le jeu pendant 30 minutes. L'équipe est top et le bar parfait pour finir la soirée." },
    { n: 'Sophie L.', c: '#55703a', t: "Organisé l'EVJF de ma sœur ici, soirée inoubliable. Quiz Hologame, fléchettes, boissons… tout y était. Je recommande à 200%." },
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
    icons(); posters(); reviews(); counters();
  });
})();
