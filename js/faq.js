/* ============================================================
   D'LYR — FAQ : données + accordéon + filtres + pagination
   ============================================================ */
(function () {
  const FAQ = [
    { cat: 'vr', q: "Qu'est-ce que la réalité virtuelle en déplacement libre (Free-Roaming) ?", a: "Chez D'LYR, vous n'êtes pas statique, ni dans un box, relié à un fil ou avec sac à dos. Grâce à notre technologie de pointe et nos grandes arènes, vous êtes équipé d'un casque VR autonome de dernière génération et vous vous déplacez réellement et librement sur notre plateau de jeu. Vos mouvements physiques sont instantanément reproduits dans le monde virtuel." },
    { cat: 'vr', q: "À partir de quel âge peut-on jouer ?", a: "Nos expériences sont accessibles à partir de 8 ans. Cette limite est liée à la taille des casques VR pour garantir un confort visuel optimal, ainsi qu'au contenu de nos catalogues de jeux. Les mineurs doivent être accompagnés d'un adulte." },
    { cat: 'vr', q: "Est-ce que je risque d'avoir le mal des transports (motion sickness) ?", a: "C'est une excellente question&nbsp;! Le «&nbsp;mal de la VR&nbsp;» survient généralement quand votre personnage bouge dans le jeu alors que votre corps reste immobile. Chez D'LYR, comme vous marchez vraiment pour vous déplacer, votre cerveau et votre oreille interne restent parfaitement synchronisés. Le risque de cinétose est donc quasi nul." },
    { cat: 'food', q: "Est-il possible de boire un verre ou de manger sur place ?", a: "Oui, absolument&nbsp;! D'LYR dispose d'un grand espace bar et convivialité pour prolonger l'expérience avant ou après votre session de jeu. Nous proposons une sélection de boissons (avec et sans alcool) ainsi que de délicieuses pizzas artisanales préparées sur place pour vous restaurer. Que vous jouiez ou que vous veniez simplement accompagner, vous êtes les bienvenus&nbsp;!" },
    { cat: 'food', q: "Quelle est l'ambiance de l'espace d'accueil et de convivialité ?", a: "Nous avons conçu un lieu où l'on se sent bien&nbsp;! D'LYR vous accueille aussi dans un espace lounge très confortable, idéal pour vous détendre en groupe, débriefer vos expériences ou simplement boire un verre. Pour une immersion totale, le lounge est équipé d'un mur d'images LED géant qui diffuse les sessions en cours, des contenus exclusifs et des événements sportifs. L'ambiance y est à la fois moderne, chaleureuse et dynamique&nbsp;!" },
    { cat: 'resa', q: "Quels sont les moyens de paiement acceptés ?", a: "Pour toutes les réservations (en ligne ou sur place) ainsi que pour vos consommations au bar, nous acceptons uniquement les paiements par carte bancaire (Visa, Mastercard, etc.). Nous n'acceptons pas les chèques, les espèces ni les chèques-vacances." },
    { cat: 'resa', q: "Combien de joueurs peuvent s'affronter ou coopérer en même temps ?", a: "Nos sessions peuvent accueillir jusqu'à 12 joueurs en simultané sur la même partie. C'est l'activité idéale à partager entre amis, en famille ou entre collègues&nbsp;! Si votre groupe est plus nombreux, nous organisons des rotations fluides pour que tout le monde profite de l'expérience." },
    { cat: 'resa', q: "Proposez-vous des offres pour les évènements (entreprise ou particulier) ?", a: "Tout à fait&nbsp;! Avec notre espace de plus de 700 m², D'LYR est le lieu idéal pour accueillir des groupes importants. Nous proposons des formules clés en main pour les séminaires, team building, anniversaires ou EVG/EVJF, avec possibilité de privatisation complète ou partielle et accès à nos espaces de convivialité (bar, restauration et lounge)." },
    { cat: 'resa', q: "Faut-il réserver à l'avance ?", a: "La réservation en ligne est fortement recommandée pour vous garantir d'avoir votre créneau, surtout les week-ends, en soirée et pendant les vacances scolaires. Si vous venez à l'improviste, nous ferons de notre mieux pour vous intégrer selon les places disponibles." },
    { cat: 'resa', q: "Quelle est la politique d'annulation, de report et de remboursement ?", a: "<ul class='faq__ul'><li><strong>Modification et report&nbsp;:</strong> vous pouvez reporter votre session sans frais jusqu'à 48 heures avant l'heure initialement réservée. Pour cela, contactez-nous directement par téléphone ou via votre espace client. Passé ce délai, aucun report ne sera possible.</li><li><strong>Annulation et remboursement&nbsp;:</strong> toute réservation est ferme et définitive. Nous ne procédons à aucun remboursement en cas d'annulation de votre part. En cas d'imprévu majeur signalé plus de 48 heures à l'avance, nous pourrons vous proposer un bon d'achat (avoir) valable pour une future session.</li><li><strong>Retards&nbsp;:</strong> afin de ne pas pénaliser les groupes suivants, les sessions commencent à l'heure pile. En cas de retard supérieur à 10 minutes, la session pourra être écourtée ou annulée, sans possibilité de remboursement ou de report.</li><li><strong>Événements &amp; privatisation&nbsp;:</strong> pour les entreprises et privatisations, des conditions spécifiques s'appliquent (se référer aux modalités indiquées sur votre devis).</li></ul>" },
    { cat: 'pratique', q: "Comment dois-je m'habiller pour venir jouer ?", a: "Optez pour une tenue décontractée et des chaussures plates/baskets. Vous allez bouger, marcher, et parfois esquiver des tirs, le confort est donc de mise&nbsp;! Les talons hauts et les chaussures de sécurité sont interdits sur la zone de jeu pour des raisons de sécurité." },
    { cat: 'pratique', q: "Je porte des lunettes, puis-je quand même jouer ?", a: "Oui&nbsp;! Nos casques de réalité virtuelle sont conçus pour laisser la place à la grande majorité des lunettes de vue. Si vous portez des lentilles de contact, nous vous conseillons néanmoins de les privilégier pour un confort visuel encore plus optimal." },
    { cat: 'pratique', q: "Combien de temps à l'avance dois-je arriver ?", a: "Merci de vous présenter 15 minutes avant l'heure exacte de votre réservation. Ce temps est indispensable pour l'accueil, l'enregistrement et le brief de sécurité par nos maîtres du jeu afin de ne pas mordre sur votre temps de session." },
    { cat: 'pratique', q: "Êtes-vous accessible aux personnes à mobilité réduite ?", a: "Nous avons à cœur d'accueillir tout le monde et nos locaux sont aux normes d'accessibilité PMR. Néanmoins, pour garantir votre sécurité et un confort de déplacement optimal, nos expériences ne sont pas encore adaptées aux personnes en fauteuil roulant." },
    { cat: 'pratique', q: "Est-il facile de se garer ?", a: "Oui, très facilement&nbsp;! Le quartier offre de nombreuses possibilités de stationnement.<br><br>Pour vous garantir un maximum de confort, nous avons également conclu un partenariat avec Q-Park, situé à seulement 100 mètres de D'LYR. Vous aurez ainsi accès à un parking souterrain sécurisé de 450 places à un tarif privilégié.<br><br><strong>⚠️ Attention&nbsp;:</strong> pour bénéficier de ce tarif préférentiel, vous devez impérativement réserver votre place de parking à l'avance directement via notre site internet lors de votre commande." },
    { cat: 'securite', q: "Est-on en sécurité dans l'arène ? Voit-on les autres joueurs ?", a: "Absolument. Même si vous êtes totalement immergé dans un autre univers, un système de barrières virtuelles de sécurité (gardien) apparaît dans votre casque si vous vous approchez trop d'un mur réel. De plus, vous voyez les avatars de vos coéquipiers en temps réel et à leur position exacte pour éviter toute collision." },
    { cat: 'securite', q: "Y a-t-il des contre-indications médicales ?", a: "L'expérience est déconseillée aux personnes souffrant d'épilepsie photosensible, de troubles cardiaques sévères ou de troubles de l'équilibre marqués. Par mesure de précaution, certaines de nos expériences les plus dynamiques sont déconseillées aux femmes enceintes." },
  ];
  window.DLYR_FAQ_DATA = FAQ; // exposé pour le JSON-LD FAQPage (seo-jsonld.js)
  const CATS = { all: 'Toutes les questions', vr: 'VR & Jeux', food: 'Bar & Restauration', resa: 'Réservations & Tarifs', pratique: 'Infos Pratiques', securite: 'Sécurité & Santé' };
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
