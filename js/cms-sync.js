(async function () {
  var PAGE_MAP = {
    'snack':       'snack-bar.json',
    'accueil':     'index.json',
    'catalogue':   'catalogue.json',
    'activites':   'activites.json',
    'evenements':  'evenements.json',
    'entreprises': 'entreprises.json',
    'jeux':        'jeux-vr.json',
    'offrir':      'offrir.json',
    'faq':         'faq.json'
  };

  var BASE = 'https://raw.githubusercontent.com/TristanKM2/DLYR/main/content/';
  var page = document.body.dataset.page;
  var fichier = PAGE_MAP[page];
  if (!fichier) return;

  try {
    var res = await fetch(BASE + fichier + '?t=' + Date.now());
    if (!res.ok) return;
    var data = await res.json();
    var lang = document.documentElement.lang || 'fr';
    var c = data[lang] || data['fr'];
    if (!c) return;

    var titre = document.querySelector('.phero__title');
    if (titre && c.titre) titre.innerHTML = c.titre.replace(/\n/g, '<br>');

    var lead = document.querySelector('.phero__lead');
    if (lead && (c.sous || c.sous_titre)) lead.textContent = c.sous || c.sous_titre;

    var desc = document.querySelector('.amb__foot .lead, .intro__desc, .jstory__text .lead');
    if (desc && c.desc) desc.textContent = c.desc;

    var pdfLink = document.querySelector('a[href*=".pdf"]');
    if (pdfLink && c.pdf_menu_url && c.pdf_menu_url !== '') {
      pdfLink.href = c.pdf_menu_url;
    }

    if (c.metaTitle) document.title = c.metaTitle;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && c.metaDesc) metaDesc.setAttribute('content', c.metaDesc);

  } catch (e) { console.error('CMS sync error:', e); }
})();
