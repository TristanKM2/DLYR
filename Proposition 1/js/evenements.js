/* D'LYR — Évènements */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';

  const form = document.querySelector('[data-quote]');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = (form.nom.value || '').trim();
    form.innerHTML = `<div class="quote__done"><strong>Merci ${nom || ''} !</strong><br>Votre demande a bien été envoyée. Notre équipe vous recontacte sous 24h.</div>`;
    window.DLYR_toast && window.DLYR_toast('Demande de devis envoyée !');
  });
})();
