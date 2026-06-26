/* ============================================================
   D'LYR — Catalogue : données, filtres, tri, rendu
   ============================================================ */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';

  const GAMES = [
    { name: 'Quiz Hologame',    genre: 'Hologame', dur: 30, players: 6, href: 'activites.html#quiz' },
    { name: 'Contagion',        genre: 'Horreur',  dur: 20, players: 6, href: 'jeux-vr.html' },
    { name: 'Contagion Origin', genre: 'Action',   dur: 20, players: 6, href: 'jeux-vr.html' },
    { name: 'Wild Odyssey',     genre: 'Aventure', dur: 30, players: 6, href: 'jeux-vr.html' },
    { name: 'The Smurfs',       genre: 'Famille',  dur: 25, players: 4, href: 'jeux-vr.html' },
    { name: 'Affected',         genre: 'Horreur',  dur: 35, players: 4, href: 'jeux-vr.html' },
    { name: 'Space Pirates',    genre: 'Aventure', dur: 25, players: 6, href: 'jeux-vr.html' },
    { name: 'Zombie Survival',  genre: 'Action',   dur: 20, players: 4, href: 'jeux-vr.html' },
    { name: 'Mystery Manor',    genre: 'Horreur',  dur: 30, players: 2, href: 'jeux-vr.html' },
    { name: 'Dragon Quest VR',  genre: 'Aventure', dur: 40, players: 4, href: 'jeux-vr.html' },
    { name: 'Kids Adventure',   genre: 'Famille',  dur: 15, players: 4, href: 'jeux-vr.html' },
    { name: 'Cyber Arena',      genre: 'Action',   dur: 20, players: 6, href: 'jeux-vr.html' },
    { name: 'Ocean Deep',       genre: 'Famille',  dur: 25, players: 4, href: 'jeux-vr.html' },
  ];
  const GENRES = ['Tous', 'Action', 'Horreur', 'Aventure', 'Famille', 'Hologame'];
  const GCOLOR = { Action: '#234db4', Horreur: '#581383', Aventure: '#1b8a4b', Famille: '#c2410c', Hologame: '#0e7490' };

  const state = { genre: 'Tous', players: 'all', sort: 'az' };

  const filtersEl = document.querySelector('[data-genre-filters]');
  const gridEl = document.querySelector('[data-grid]');
  const countEl = document.querySelector('[data-count]');
  const emptyEl = document.querySelector('[data-empty]');

  filtersEl.innerHTML = GENRES.map(g =>
    `<button class="cat__chip${g === 'Tous' ? ' on' : ''}" data-genre="${g}">${g}</button>`).join('');

  const clock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const ppl = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15 19a4.5 4.5 0 0 1 6 0"/></svg>';

  function playersBucket(p) { return p <= 1 ? 'solo' : p <= 4 ? 'small' : 'large'; }

  function apply() {
    let list = GAMES.filter(g =>
      (state.genre === 'Tous' || g.genre === state.genre) &&
      (state.players === 'all' || playersBucket(g.players) === state.players)
    );
    list.sort((a, b) => state.sort === 'dur' ? a.dur - b.dur : a.name.localeCompare(b.name));

    countEl.textContent = `${list.length} expérience${list.length > 1 ? 's' : ''} disponible${list.length > 1 ? 's' : ''}`;
    emptyEl.hidden = list.length > 0;

    gridEl.innerHTML = list.map((g, i) => `
      <a class="xcard reveal" data-d="${i % 4}" href="${g.href}">
        <div class="ph ph--dark"><span class="ph__label">Visuel · ${g.name}</span></div>
        <span class="xcard__scrim"></span>
        <span class="xcard__tag tag-genre" style="background:${GCOLOR[g.genre] || 'var(--blue)'}">${g.genre}</span>
        <span class="xcard__name">${g.name}</span>
        <span class="xcard__meta"><span>${clock} ${g.dur} min</span><span>${ppl} ${g.players <= 1 ? 'Solo' : '1 à ' + g.players}</span></span>
      </a>`).join('');

    if (window.DLYR_reveal) window.DLYR_reveal();
  }

  filtersEl.querySelectorAll('.cat__chip').forEach(b => b.addEventListener('click', () => {
    filtersEl.querySelectorAll('.cat__chip').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); state.genre = b.dataset.genre; apply();
  }));
  document.querySelector('[data-filter-players]').addEventListener('change', e => { state.players = e.target.value; apply(); });
  document.querySelector('[data-sort]').addEventListener('change', e => { state.sort = e.target.value; apply(); });

  apply();
})();
