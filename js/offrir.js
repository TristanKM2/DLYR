/* D'LYR — Offrir : actions cartes cadeaux (placeholder Smeetz) */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';
  document.querySelectorAll('[data-ic]').forEach(s => { s.innerHTML = I[s.dataset.ic] || ''; });

  // URL de la billetterie Smeetz (à configurer avec les cadeaux pré-paramétrés)
  const SMEETZ_URL = '';

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-offrir]');
    if (!a) return;
    e.preventDefault();
    const label = a.getAttribute('data-offrir') || 'carte cadeau';
    if (SMEETZ_URL) {
      window.open(SMEETZ_URL, '_blank', 'noopener');
      return;
    }
    window.DLYR_toast
      ? window.DLYR_toast('Offrir « ' + label + ' » — paiement en ligne via Smeetz bientôt disponible !')
      : alert('Offrir « ' + label + ' » — bientôt disponible via Smeetz.');
  });
})();
