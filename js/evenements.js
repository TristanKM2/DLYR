/* D'LYR — Évènements */
(function () {
  const I = window.DLYR_ICONS || {};
  const ar = document.querySelector('[data-arrow]');
  if (ar) ar.innerHTML = I.arrow || '';

  // Adresse de réception des demandes de devis
  // ⚠️ RAPPEL : la boîte contact@dlyr-vr.com n'est pas encore active côté client.
  // Le 1er envoi via FormSubmit déclenchera un e-mail d'activation à confirmer sur cette adresse.
  const DEST = 'contact@dlyr-vr.com';
  const ENDPOINT = 'https://formsubmit.co/ajax/' + encodeURIComponent(DEST);

  const form = document.querySelector('[data-quote]');
  if (!form) return;

  const TYPE_LABEL = {
    'Anniversaire': 'Anniversaire', 'EVG / EVJF': 'EVG / EVJF',
    'Team building': 'Team building', 'Séminaire': 'Séminaire', 'Autre': 'Autre',
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nom = (form.nom.value || '').trim();
    const email = (form.email.value || '').trim();
    const tel = (form.tel && form.tel.value || '').trim();
    const type = form.type.value || '';
    const pers = (form.pers.value || '').trim();
    const msg = (form.msg.value || '').trim();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    // Charge utile envoyée à FormSubmit (clés _ = options du service)
    const payload = {
      Nom: nom,
      Email: email,
      'Téléphone': tel || 'Non précisé',
      'Type d\'évènement': TYPE_LABEL[type] || type,
      'Nombre de personnes': pers || 'Non précisé',
      Message: msg || '—',
      _subject: `Nouvelle demande de devis D'LYR — ${TYPE_LABEL[type] || type}`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (data && data.success === 'false')) throw new Error(data.message || 'Échec de l\'envoi');

      form.innerHTML = `<div class="quote__done"><strong>Merci ${nom || ''} !</strong><br>Votre demande a bien été envoyée. Notre équipe vous recontacte sous 24h.</div>`;
      window.DLYR_toast && window.DLYR_toast('Demande de devis envoyée !');
    } catch (err) {
      btn.disabled = false;
      btn.textContent = original;
      // Repli : ouverture du client mail pré-rempli
      const subject = encodeURIComponent(`Demande de devis D'LYR — ${TYPE_LABEL[type] || type}`);
      const body = encodeURIComponent(
        `Nom : ${nom}\nEmail : ${email}\nTéléphone : ${tel || 'Non précisé'}\nType d'évènement : ${TYPE_LABEL[type] || type}\n` +
        `Nombre de personnes : ${pers || 'Non précisé'}\n\nMessage :\n${msg || '—'}`
      );
      const mailto = `mailto:${DEST}?subject=${subject}&body=${body}`;
      let err2 = form.querySelector('.quote__err');
      if (!err2) {
        err2 = document.createElement('div');
        err2.className = 'quote__err';
        btn.parentNode.insertBefore(err2, btn);
      }
      err2.innerHTML = `L'envoi automatique a échoué. <a href="${mailto}">Cliquez ici pour nous écrire directement par mail</a>.`;
      window.DLYR_toast && window.DLYR_toast('Envoi impossible — utilisez le lien mail proposé');
    }
  });
})();
