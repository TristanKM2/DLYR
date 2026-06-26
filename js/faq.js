/* ============================================================
   D'LYR — FAQ : données + accordéon + filtres + pagination
   ============================================================ */
(function () {
  const FAQ = [
    { cat: 'vr', q: "Qu'est-ce que le VR Freeroaming ?", a: "Le VR Freeroaming est une expérience de réalité virtuelle sans câbles ni limites physiques. Dans notre complexe, qui abrite l'une des plus grandes arènes de la région, vous vous déplacez librement dans un espace immersif, vos mouvements réels étant parfaitement traduits dans le monde virtuel." },
    { cat: 'food', q: "Que proposez-vous côté restauration ?", a: "Nous proposons une carte de boissons saines et originales ainsi que des pizzas artisanales de haute qualité, prêtes en seulement 2 minutes grâce à notre technologie de cuisson haute performance. Cocktails avec ou sans alcool sont également au menu." },
    { cat: 'activites', q: "Quelles sont les autres activités disponibles ?", a: "En plus de la VR, D'LYR est un véritable hub de loisirs. Nous disposons de pistes de fléchettes électroniques connectées pour défier vos amis, et du Quiz Hologame en VR, un blind-test et quiz de culture générale à vivre en équipe." },
    { cat: 'vr', q: "Quelle est l'ambiance chez D'LYR ?", a: "Nous cultivons une ambiance « afterwork » unique. C'est l'endroit idéal pour décompresser après le travail : commencez par une pizza et un verre entre collègues, puis basculez dans le virtuel pour une session de jeu intense." },
    { cat: 'vr', q: "Faut-il réserver à l'avance ?", a: "La réservation en ligne est fortement conseillée, surtout le week-end, afin de garantir votre créneau et le nombre de casques nécessaires. Les visites spontanées restent possibles selon les disponibilités du moment." },
    { cat: 'vr', q: "À partir de quel âge peut-on jouer ?", a: "La plupart de nos expériences sont accessibles dès 8 ans. Certaines aventures plus intenses (horreur, action) sont recommandées à partir de 12 ou 16 ans. Un accompagnateur adulte est demandé pour les plus jeunes." },
    { cat: 'food', q: "Peut-on venir seulement pour boire un verre ?", a: "Bien sûr ! Notre espace bar est ouvert à toutes et tous, que vous jouiez ou non. Profitez de nos cocktails signature et de notre snacking dans une ambiance conviviale." },
    { cat: 'activites', q: "Le Quiz Hologame, qu'est-ce que c'est ?", a: "C'est un contenu VR à part entière&nbsp;: un blind-test et un quiz de culture générale vécus en réalité virtuelle, en équipe et buzzer en main. On le retrouve dans le catalogue des expériences VR, mais il est aussi accessible directement depuis la page Activités, jusqu'à 6 joueurs." },
    { cat: 'pro', q: "Organisez-vous des événements d'entreprise ?", a: "Absolument. Team building, séminaires, soirées de fin d'année : nous privatisons tout ou partie du complexe et construisons un programme sur mesure avec une équipe dédiée et des formules restauration." },
    { cat: 'pro', q: "Proposez-vous des formules anniversaire ?", a: "Oui, nos formules anniversaire incluent une session de jeu, une salle privative et une option goûter ou snacking. Idéal pour les enfants comme pour les adultes." },
    { cat: 'pro', q: "Quelle est la capacité maximale pour un groupe ?", a: "Nous pouvons accueillir jusqu'à 20 joueurs simultanément en VR, et davantage en combinant les différentes activités du complexe. Contactez-nous pour étudier votre projet." },
    { cat: 'food', q: "Avez-vous des options sans alcool et végétariennes ?", a: "Oui, notre carte comprend une large sélection de mocktails et de boissons sans alcool, ainsi que des options végétariennes pour le snacking et les pizzas." },
  ];
  const CATS = { all: 'Toutes les questions', vr: 'VR Freeroaming', food: 'Food & Drinks', activites: 'Fléchettes & Quiz', pro: 'Évènements Pro' };
  // Toutes les questions sur une seule page — pas de pagination (demande Tristan)
  const PER = 1000;

  const listEl = document.querySelector('[data-faq]');
  const pagerEl = document.querySelector('[data-faq-pager]');
  if (!listEl) return;
  let cat = 'all', page = 0;

  const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';

  function filtered() { return FAQ.filter(f => cat === 'all' || f.cat === cat); }

  function render() {
    const data = filtered();
    const pages = Math.max(1, Math.ceil(data.length / PER));
    page = Math.min(page, pages - 1);
    const slice = data.slice(page * PER, page * PER + PER);
    listEl.innerHTML = slice.map((f, i) => `
      <div class="faq__item reveal" data-d="${i % 4}">
        <button class="faq__q" aria-expanded="false">
          <span>${f.q}</span><span class="faq__chev">${chev}</span>
        </button>
        <div class="faq__a"><div class="faq__a-inner">${f.a}</div></div>
      </div>`).join('');

    listEl.querySelectorAll('.faq__item').forEach(item => {
      const btn = item.querySelector('.faq__q');
      const panel = item.querySelector('.faq__a');
      btn.addEventListener('click', () => {
        const open = item.classList.contains('open');
        // referme les autres
        listEl.querySelectorAll('.faq__item.open').forEach(o => {
          if (o !== item) { o.classList.remove('open'); o.querySelector('.faq__a').style.maxHeight = null; o.querySelector('.faq__q').setAttribute('aria-expanded', 'false'); }
        });
        item.classList.toggle('open', !open);
        btn.setAttribute('aria-expanded', String(!open));
        panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
      });
    });

    pagerEl.innerHTML = pages > 1
      ? Array.from({ length: pages }, (_, i) => `<button class="${i === page ? 'on' : ''}">${i + 1}</button>`).join('')
      : '';
    pagerEl.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => { page = i; render(); window.scrollY > 600 && window.scrollTo({ top: document.querySelector('.faq').offsetTop - 80, behavior: 'smooth' }); }));

    // re-arme le reveal pour le contenu fraîchement injecté
    if (window.DLYR_reveal) window.DLYR_reveal();
  }

  document.querySelectorAll('[data-cats] .faq__cat').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('[data-cats] .faq__cat').forEach(x => x.classList.remove('on'));
      b.classList.add('on'); cat = b.dataset.cat; page = 0; render();
    });
  });

  // flèche
  const arrow = document.querySelector('[data-arrow]');
  if (arrow && window.DLYR_ICONS) arrow.innerHTML = window.DLYR_ICONS.arrow;

  document.addEventListener('DOMContentLoaded', render);
})();
