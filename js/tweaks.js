/* ============================================================
   D'LYR — Panneau Tweaks (vanilla, multi-pages)
   Persistance localStorage partagée entre toutes les pages.
   ============================================================ */
(function () {
  const KEY = 'dlyr_tweaks';
  const DEFAULTS = {
    accent: '#dbf83a',
    headingFont: 'Barlow',
    radius: 16,
    marquee: 28,
    buttonStyle: 'filled',
  };
  const FONTS = {
    Barlow: { stack: "'Barlow', sans-serif", import: null },
    Archivo: { stack: "'Archivo', sans-serif", import: 'Archivo:wght@600;700;800;900' },
    Anton: { stack: "'Anton', sans-serif", import: 'Anton' },
    Oswald: { stack: "'Oswald', sans-serif", import: 'Oswald:wght@500;600;700' },
  };
  const ACCENTS = [
    { v: '#dbf83a', n: 'Citron' },
    { v: '#3ad8f8', n: 'Cyan' },
    { v: '#ff7a2c', n: 'Orange' },
    { v: '#f83ad8', n: 'Magenta' },
    { v: '#5cf86a', n: 'Vert' },
  ];

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (_) { return Object.assign({}, DEFAULTS); }
  }
  function save(t) { try { localStorage.setItem(KEY, JSON.stringify(t)); } catch (_) {} }

  let t = load();
  const loadedFonts = {};

  function ensureFont(name) {
    const f = FONTS[name];
    if (!f || !f.import || loadedFonts[name]) return;
    loadedFonts[name] = true;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + f.import + '&display=swap';
    document.head.appendChild(l);
  }

  // accent + dérivés
  function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function apply() {
    const root = document.documentElement;
    root.style.setProperty('--lime', t.accent);
    root.style.setProperty('--lime-2', t.accent);
    const [r, g, b] = hexToRgb(t.accent);
    root.style.setProperty('--accent-rgb', `${r},${g},${b}`);
    root.style.setProperty('--r-sm', t.radius + 'px');
    root.style.setProperty('--r-lg', (t.radius * 2) + 'px');
    root.style.setProperty('--mspeed', t.marquee + 's');
    if (t.headingFont && FONTS[t.headingFont]) {
      ensureFont(t.headingFont);
      root.style.setProperty('--f-display', FONTS[t.headingFont].stack);
    }
    root.setAttribute('data-btn-style', t.buttonStyle);
    save(t);
  }
  // applique tout de suite (avant rendu du panneau) pour cohérence cross-pages
  apply();

  /* ---------------- Protocole hôte ---------------- */
  let panel = null, open = false;
  window.addEventListener('message', (e) => {
    const ty = e && e.data && e.data.type;
    if (ty === '__activate_edit_mode') { build(); setOpen(true); }
    else if (ty === '__deactivate_edit_mode') setOpen(false);
  });
  function announce() { try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', announce);
  else announce();

  function setOpen(v) { open = v; if (panel) panel.classList.toggle('open', v); }
  function dismiss() { setOpen(false); try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (_) {} }

  /* ---------------- UI ---------------- */
  function build() {
    if (panel) return;
    panel = document.createElement('div');
    panel.className = 'tw';
    panel.innerHTML = `
      <div class="tw__head">
        <span class="tw__title">Tweaks</span>
        <button class="tw__close" aria-label="Fermer">&times;</button>
      </div>
      <div class="tw__body">
        <div class="tw__sec">Couleur d'accent</div>
        <div class="tw__swatches" data-accent></div>

        <div class="tw__sec">Police des titres</div>
        <div class="tw__seg" data-font></div>

        <div class="tw__sec">Arrondi des cartes <span class="tw__val" data-radius-val></span></div>
        <input class="tw__range" type="range" min="0" max="28" step="2" data-radius>

        <div class="tw__sec">Vitesse des marquees <span class="tw__val" data-marquee-val></span></div>
        <input class="tw__range" type="range" min="12" max="44" step="2" data-marquee>

        <div class="tw__sec">Style des boutons</div>
        <div class="tw__seg" data-btn></div>

        <button class="tw__reset">Réinitialiser</button>
      </div>`;
    document.body.appendChild(panel);

    // accent
    const accWrap = panel.querySelector('[data-accent]');
    accWrap.innerHTML = ACCENTS.map(a =>
      `<button class="tw__sw${t.accent === a.v ? ' on' : ''}" style="background:${a.v}" title="${a.n}" data-v="${a.v}"></button>`).join('');
    accWrap.querySelectorAll('.tw__sw').forEach(b => b.addEventListener('click', () => {
      t.accent = b.dataset.v; accWrap.querySelectorAll('.tw__sw').forEach(x => x.classList.remove('on')); b.classList.add('on'); apply();
    }));

    // font
    const fontWrap = panel.querySelector('[data-font]');
    fontWrap.innerHTML = Object.keys(FONTS).map(f =>
      `<button class="tw__opt${t.headingFont === f ? ' on' : ''}" data-v="${f}">${f}</button>`).join('');
    fontWrap.querySelectorAll('.tw__opt').forEach(b => b.addEventListener('click', () => {
      t.headingFont = b.dataset.v; fontWrap.querySelectorAll('.tw__opt').forEach(x => x.classList.remove('on')); b.classList.add('on'); apply();
    }));

    // radius
    const rad = panel.querySelector('[data-radius]'); const radVal = panel.querySelector('[data-radius-val]');
    rad.value = t.radius; radVal.textContent = t.radius + 'px';
    rad.addEventListener('input', () => { t.radius = +rad.value; radVal.textContent = t.radius + 'px'; apply(); });

    // marquee
    const mq = panel.querySelector('[data-marquee]'); const mqVal = panel.querySelector('[data-marquee-val]');
    mq.value = t.marquee; mqVal.textContent = t.marquee + 's';
    mq.addEventListener('input', () => { t.marquee = +mq.value; mqVal.textContent = t.marquee + 's'; apply(); });

    // button style
    const btnWrap = panel.querySelector('[data-btn]');
    const BSTYLE = [['filled', 'Plein'], ['outline', 'Contour']];
    btnWrap.innerHTML = BSTYLE.map(([v, n]) => `<button class="tw__opt${t.buttonStyle === v ? ' on' : ''}" data-v="${v}">${n}</button>`).join('');
    btnWrap.querySelectorAll('.tw__opt').forEach(b => b.addEventListener('click', () => {
      t.buttonStyle = b.dataset.v; btnWrap.querySelectorAll('.tw__opt').forEach(x => x.classList.remove('on')); b.classList.add('on'); apply();
    }));

    panel.querySelector('.tw__close').addEventListener('click', dismiss);
    panel.querySelector('.tw__reset').addEventListener('click', () => {
      t = Object.assign({}, DEFAULTS); apply();
      panel.remove(); panel = null; build(); setOpen(true);
    });
  }
})();
