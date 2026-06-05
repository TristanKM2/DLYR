/* D'LYR — Activités */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';
  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg>';
  document.querySelectorAll('[data-ic="check"]').forEach(s => s.innerHTML = check);
})();
