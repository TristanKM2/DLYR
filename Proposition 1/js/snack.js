/* ============================================================
   D'LYR — Snack Bar : carte à onglets
   ============================================================ */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';

  const MENU = {
    cocktails: [
      { n: "D'LYR Signature", d: "Rhum ambré, fruit de la passion, citron vert, gingembre", p: "11€", b: "Star" },
      { n: "Virtual Sunset", d: "Tequila, pamplemousse, sirop d'agave, soda", p: "10€" },
      { n: "Neon Mojito", d: "Rhum blanc, menthe fraîche, citron vert, sucre de canne", p: "9€" },
      { n: "Headshot", d: "Vodka, liqueur de café, sucre vanillé", p: "10€" },
      { n: "Spritz Arena", d: "Apérol, prosecco, eau gazeuse, orange", p: "9€" },
      { n: "Game Over", d: "Gin, fruits rouges, basilic, tonic", p: "11€" },
    ],
    mocktails: [
      { n: "Sunset Zero", d: "Pamplemousse, fruit de la passion, soda gingembre", p: "7€", b: "Sans alcool" },
      { n: "Virgin Mojito", d: "Menthe fraîche, citron vert, sucre de canne, soda", p: "6€" },
      { n: "Berry Boost", d: "Fruits rouges, citron, eau pétillante", p: "6€" },
      { n: "Tropical Glow", d: "Ananas, coco, citron vert", p: "7€" },
      { n: "Cold Brew Tonic", d: "Café infusé à froid, tonic, citron", p: "6€" },
      { n: "Limonade maison", d: "Citron pressé, menthe, sirop artisanal", p: "5€" },
    ],
    food: [
      { n: "Planche à partager", d: "Charcuterie, fromages, olives, focaccia", p: "16€", b: "À partager" },
      { n: "Nachos D'LYR", d: "Tortillas, cheddar fondu, guacamole, salsa", p: "9€" },
      { n: "Tenders croustillants", d: "Poulet pané maison, sauce au choix", p: "8€" },
      { n: "Frites maison", d: "Pommes de terre fraîches, sel aux herbes", p: "5€" },
      { n: "Mozza sticks", d: "Bâtonnets de mozzarella panés, sauce tomate", p: "7€" },
      { n: "Cookie tiède", d: "Cookie maison, pépites de chocolat", p: "4€" },
    ],
    pizza: [
      { n: "Margherita", d: "Tomate, mozzarella, basilic frais", p: "11€", b: "2 min" },
      { n: "Regina", d: "Tomate, mozzarella, jambon, champignons", p: "13€" },
      { n: "Diavola", d: "Tomate, mozzarella, chorizo piquant", p: "13€" },
      { n: "Végétarienne", d: "Tomate, légumes grillés, mozzarella", p: "12€", b: "Végé" },
      { n: "4 Fromages", d: "Mozzarella, gorgonzola, chèvre, parmesan", p: "14€" },
      { n: "BBQ Chicken", d: "Sauce BBQ, poulet, oignons rouges, mozzarella", p: "14€" },
    ],
  };

  const listEl = document.querySelector('[data-menu]');
  const tabsEl = document.querySelector('[data-tabs]');

  function render(key) {
    const items = MENU[key] || [];
    listEl.innerHTML = items.map((it, i) => `
      <div class="mitem reveal" data-d="${i % 4}">
        <div class="mitem__info">
          <div class="mitem__name">${it.n}${it.b ? `<span class="mitem__badge">${it.b}</span>` : ''}</div>
          <div class="mitem__desc">${it.d}</div>
        </div>
        <span class="mitem__dots"></span>
        <span class="mitem__price">${it.p}</span>
      </div>`).join('');
    if (window.DLYR_reveal) window.DLYR_reveal();
  }

  tabsEl.querySelectorAll('.menu__tab').forEach(b => b.addEventListener('click', () => {
    tabsEl.querySelectorAll('.menu__tab').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); render(b.dataset.tab);
  }));

  render('cocktails');
})();
