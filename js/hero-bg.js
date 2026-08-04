/* ============================================================
   D'LYR — Fond animé du hero (starfield immersif VR, en boucle)
   - 100% généré (canvas), pas de fichier vidéo externe
   - Décoratif : le <canvas> est aria-hidden (cf. index.html)
   - RGAA : respecte prefers-reduced-motion (image fixe, sans animation)
   - Perf : se met en pause quand l'onglet n'est pas visible
   ============================================================ */
(function () {
  const canvas = document.querySelector('[data-hero-bg]');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, cx = 0, cy = 0, dpr = 1;
  const COLORS = ['255,255,255', '120,160,240', '160,130,220', '219,248,58'];
  const ZMAX = 1.0;
  let stars = [];

  function count() {
    // densité raisonnable, plafonnée pour les petits écrans / mobiles
    return Math.min(220, Math.round((W * H) / 9000));
  }

  function spawn(initial) {
    return {
      x: (Math.random() * 2 - 1),
      y: (Math.random() * 2 - 1),
      z: initial ? Math.random() * ZMAX : ZMAX,
      c: COLORS[Math.random() < 0.08 ? 3 : (Math.random() * 3) | 0],
      pz: 0,
    };
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    cx = W / 2; cy = H / 2;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: count() }, () => spawn(true));
  }

  const scale = () => Math.max(W, H) * 0.9;

  function project(s) {
    const k = scale() / s.z;
    return { px: cx + s.x * k, py: cy + s.y * k, k };
  }

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const { px, py, k } = project(s);
      const size = Math.max(0.5, (1 - s.z / ZMAX) * 2.4 * (k / scale()) * 60);
      const a = Math.min(0.7, (1 - s.z / ZMAX) * 0.8 + 0.1);
      ctx.fillStyle = `rgba(${s.c},${a})`;
      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.4, size), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let running = false;
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.pz = s.z;
      s.z -= 0.006;
      if (s.z <= 0.06) { Object.assign(s, spawn(false)); continue; }
      const cur = project(s);
      const prev = (() => { const k = scale() / s.pz; return { px: cx + s.x * k, py: cy + s.y * k }; })();
      const depth = 1 - s.z / ZMAX;
      const a = Math.min(0.8, depth * 0.9 + 0.05);
      const lw = Math.max(0.6, depth * 2.6);
      // hors-cadre : on recycle
      if (cur.px < -40 || cur.px > W + 40 || cur.py < -40 || cur.py > H + 40) {
        Object.assign(s, spawn(false));
        continue;
      }
      ctx.strokeStyle = `rgba(${s.c},${a})`;
      ctx.lineWidth = lw;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(prev.px, prev.py);
      ctx.lineTo(cur.px, cur.py);
      ctx.stroke();
    }
    requestAnimationFrame(frame);
  }

  function start() { if (running) return; running = true; requestAnimationFrame(frame); }
  function stop() { running = false; }

  resize();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); }, { passive: true });

  if (reduce) {
    drawStatic();
    return;
  }

  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
  start();
})();
