/* ============================================================
   D'LYR — Snack Bar : carte à onglets
   ============================================================ */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';

  const isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');

  const MENU_FR = {
    "boissons-froides": [
      { n: "Coca-Cola", d: "Canette 33 cl", p: "3€" },
      { n: "Coca-Cola Zéro", d: "Canette 33 cl", p: "3€" },
      { n: "Fanta Orange", d: "Canette 33 cl", p: "3€" },
      { n: "Orangina", d: "Canette 33 cl", p: "3€" },
      { n: "Sprite", d: "Canette 33 cl", p: "3€" },
      { n: "Fuze Tea Pêche", d: "Canette 33 cl", p: "3€" },
      { n: "Oasis Tropical", d: "Canette 33 cl", p: "3€" },
      { n: "Schweppes Agrumes", d: "Canette 33 cl", p: "3€" },
      { n: "Red Bull", d: "Canette 35,5 cl", p: "4€" },
      { n: "Eau minérale Mont Blanc", d: "Bouteille 50 cl", p: "3€" },
      { n: "Eau gazeuse San Pellegrino", d: "Bouteille 50 cl", p: "3€" },
      { n: "Pago Orange", d: "Jus de fruits · Bouteille 33 cl", p: "4€" },
      { n: "Pago Fraise", d: "Jus de fruits · Bouteille 33 cl", p: "4€" },
      { n: "Pago Tropical", d: "Jus de fruits · Bouteille 33 cl", p: "4€" },
      { n: "Pago Ananas", d: "Jus de fruits · Bouteille 33 cl", p: "4€" }
    ],
    "boissons-chaudes": [
      { n: "Café expresso", d: "7 cl", p: "2,50€" },
      { n: "Café allongé", d: "12 cl", p: "3€" },
      { n: "Café double", d: "14 cl", p: "3,50€" },
      { n: "Thé vert Menthe", d: "Théière 40 cl", p: "3,50€" },
      { n: "Thé Noir Earl Grey", d: "Théière 40 cl", p: "3,50€" },
      { n: "Thé vert Agrumes", d: "Théière 40 cl", p: "3,50€" },
      { n: "Infusion Menthe", d: "Théière 40 cl", p: "3,50€" }
    ],
    "alcool": [],
    "pizza": [
      { n: "Margherita", d: "Sauce tomate à l'origan, mozzarella et basilic", p: "10€", b: "Végé" },
      { n: "Reine", d: "Sauce tomate à l'origan, mozzarella, jambon et basilic", p: "11€" },
      { n: "3 Fromages", d: "Sauce tomate à l'origan, mozzarella, emmental, chèvre et basilic", p: "11,50€", b: "Végé" },
      { n: "Orientale", d: "Sauce tomate à l'origan, mozzarella, merguez halal, poivrons et basilic", p: "11,50€", b: "Halal" },
      { n: "Diavola", d: "Sauce tomate à l'origan, mozzarella, chorizo, poivrons et basilic", p: "11,50€" },
      { n: "Montagnarde", d: "Crème fraîche, mozzarella, jambon cru, raclette, champignons et basilic", p: "12€" },
      { n: "All Pollo", d: "Sauce tomate à l'origan, mozzarella, poulet rôti halal, oignons rouges, sauce BBQ et basilic", p: "12€", b: "Halal" },
      { n: "Méridionale", d: "Sauce tomate à l'origan, poivrons, courgettes, mozzarella, oignons rouges, provola fumé, tomates séchées et basilic", p: "12€", b: "Végé" },
      { n: "Raffinée", d: "Crème fraîche, mozzarella, jambon cuit fumé, mascarpone, huile de truffe et basilic", p: "13€" }
    ]
  };

  const MENU_EN = {
    "boissons-froides": [
      { n: "Coca-Cola", d: "Can 33 cl", p: "€3" },
      { n: "Coca-Cola Zero", d: "Can 33 cl", p: "€3" },
      { n: "Fanta Orange", d: "Can 33 cl", p: "€3" },
      { n: "Orangina", d: "Can 33 cl", p: "€3" },
      { n: "Sprite", d: "Can 33 cl", p: "€3" },
      { n: "Fuze Tea Peach", d: "Can 33 cl", p: "€3" },
      { n: "Oasis Tropical", d: "Can 33 cl", p: "€3" },
      { n: "Schweppes Citrus", d: "Can 33 cl", p: "€3" },
      { n: "Red Bull", d: "Can 35.5 cl", p: "€4" },
      { n: "Mont Blanc Mineral Water", d: "Still water bottle 50 cl", p: "€3" },
      { n: "San Pellegrino Sparkling Water", d: "Sparkling water bottle 50 cl", p: "€3" },
      { n: "Pago Orange", d: "Fruit juice · Bottle 33 cl", p: "€4" },
      { n: "Pago Strawberry", d: "Fruit juice · Bottle 33 cl", p: "€4" },
      { n: "Pago Tropical", d: "Fruit juice · Bottle 33 cl", p: "€4" },
      { n: "Pago Pineapple", d: "Fruit juice · Bottle 33 cl", p: "€4" }
    ],
    "boissons-chaudes": [
      { n: "Espresso", d: "7 cl", p: "€2.50" },
      { n: "Americano", d: "12 cl", p: "€3" },
      { n: "Double Espresso", d: "14 cl", p: "€3.50" },
      { n: "Mint Green Tea", d: "Teapot 40 cl", p: "€3.50" },
      { n: "Earl Grey Black Tea", d: "Teapot 40 cl", p: "€3.50" },
      { n: "Citrus Green Tea", d: "Teapot 40 cl", p: "€3.50" },
      { n: "Mint Herbal Infusion", d: "Teapot 40 cl", p: "€3.50" }
    ],
    "alcool": [],
    "pizza": [
      { n: "Margherita", d: "Oregano tomato sauce, mozzarella and fresh basil", p: "€10", b: "Veggie" },
      { n: "Reine", d: "Oregano tomato sauce, mozzarella, ham and fresh basil", p: "€11" },
      { n: "3 Cheeses", d: "Oregano tomato sauce, mozzarella, Emmental, goat cheese and basil", p: "€11.50", b: "Veggie" },
      { n: "Orientale", d: "Oregano tomato sauce, mozzarella, halal merguez sausage, peppers and basil", p: "€11.50", b: "Halal" },
      { n: "Diavola", d: "Oregano tomato sauce, mozzarella, chorizo, peppers and basil", p: "€11.50" },
      { n: "Montagnarde", d: "Fresh cream, mozzarella, cured ham, raclette cheese, mushrooms and basil", p: "€12" },
      { n: "All Pollo", d: "Oregano tomato sauce, mozzarella, halal roasted chicken, red onions, BBQ sauce and basil", p: "€12", b: "Halal" },
      { n: "Méridionale", d: "Oregano tomato sauce, bell peppers, zucchini, mozzarella, red onions, smoked provola, sun-dried tomatoes and basil", p: "€12", b: "Veggie" },
      { n: "Raffinée", d: "Fresh cream, mozzarella, smoked cooked ham, mascarpone, truffle oil and basil", p: "€13" }
    ]
  };

  const MENU = isEn ? MENU_EN : MENU_FR;
  const listEl = document.querySelector('[data-menu]');
  const tabsEl = document.querySelector('[data-tabs]');

  if (!listEl || !tabsEl) return;

  function render(key) {
    if (key === 'alcool') {
      const isBgPaper = !!listEl.closest('.bg-paper');
      const comingBg = isBgPaper ? 'rgba(28,48,36,.04)' : 'rgba(194,208,179,.04)';
      const comingBd = isBgPaper ? 'rgba(28,48,36,.22)' : 'rgba(194,208,179,.25)';
      const comingTitleColor = isBgPaper ? 'var(--ink)' : 'var(--paper)';
      const comingTextColor = isBgPaper ? 'rgba(28,48,36,.75)' : 'rgba(194,208,179,.7)';
      const comingBadgeBg = isBgPaper ? 'var(--ink)' : 'var(--lime)';
      const comingBadgeColor = isBgPaper ? 'var(--paper)' : 'var(--ink)';

      listEl.innerHTML = `
        <div class="mitem-coming-soon reveal" style="grid-column: 1 / -1; text-align:center; padding: 48px 24px; background: ${comingBg}; border: 1px dashed ${comingBd}; border-radius: var(--r-md);">
          <span style="font-family:var(--f-btn); font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:.08em; color:${comingBadgeColor}; background:${comingBadgeBg}; padding:4px 14px; border-radius:var(--r-pill); display:inline-block; margin-bottom:16px;">
            ${isEn ? 'Coming Soon' : 'À venir'}
          </span>
          <h3 style="font-family:var(--f-display); font-weight:700; font-size:clamp(22px,2vw,28px); color:${comingTitleColor}; margin-bottom:12px;">
            ${isEn ? 'Alcoholic Drinks Menu Coming Soon' : 'Carte des boissons alcoolisées à venir'}
          </h3>
          <p style="font-size:15px; color:${comingTextColor}; max-width:52ch; margin:0 auto; line-height:1.5;">
            ${isEn ? 'Our selection of beers, wines and champagnes will be available very soon.' : 'Notre sélection de bières, vins et champagnes sera disponible très prochainement.'}
          </p>
        </div>`;
      if (window.DLYR_reveal) window.DLYR_reveal();
      return;
    }

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
    b.classList.add('on');
    render(b.dataset.tab);
  }));

  render('boissons-froides');
})();
