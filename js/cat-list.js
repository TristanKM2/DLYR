/* ============================================================
   D'LYR — Catalogue : données, filtres, tri, rendu
   ============================================================ */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';

  const GAMES = (window.DLYR_GAMES || []).map(g => ({
    name: g.name, genre: g.genre, dur: g.dur, players: g.players, pl: g.pl,
    img: g.img, href: 'jeu-' + g.slug + '.html'
  }));
  const GENRES = ['Tous', 'Action', 'Aventure', 'Horreur', 'Famille', 'Quiz', 'Escape game'];
  const GCOLOR = { Action: '#234db4', Horreur: '#581383', Aventure: '#1b8a4b', Famille: '#c2410c', Quiz: '#0e7490', 'Escape game': '#7c3aed' };

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
      (state.players === 'all' || (g.players && playersBucket(g.players) === state.players))
    );
    list.sort((a, b) => state.sort === 'dur' ? (a.dur || 99) - (b.dur || 99) : a.name.localeCompare(b.name));

    countEl.textContent = `${list.length} expérience${list.length > 1 ? 's' : ''} disponible${list.length > 1 ? 's' : ''}`;
    emptyEl.hidden = list.length > 0;

    gridEl.innerHTML = list.map((g, i) => `
      <a class="xcard reveal" data-d="${i % 4}" href="${g.href}">
        <div class="ph ph--dark">${g.img ? `<img class="ph__img" src="${g.img}" alt="${g.name}">` : `<span class="ph__label">Visuel · ${g.name}</span>`}</div>
        <span class="xcard__scrim"></span>
        <span class="xcard__tag tag-genre" style="background:${GCOLOR[g.genre] || 'var(--blue)'}">${g.genre}</span>
        <span class="xcard__name">${g.name}</span>
        <span class="xcard__meta">${g.dur ? `<span>${clock} ${g.dur} min</span>` : ''}${g.pl ? `<span>${ppl} ${g.pl}</span>` : ''}</span>
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
