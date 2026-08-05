/* D'LYR — Page Contact (formulaire + icônes) */
(function () {
  const I = window.DLYR_ICONS || {};
  const MAIL = '<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>';

  function chrome() {
    const S = window.DLYR_SOCIAL || {
      tiktok: 'https://www.tiktok.com/@dlyr.vr',
      facebook: 'https://www.facebook.com/profile.php?id=61591286531090',
      instagram: 'https://www.instagram.com/dlyr.vr/',
      linkedin: 'https://www.linkedin.com/company/d-lyr/'
    };
    const ar = document.querySelector('[data-arrow]');
    if (ar) ar.innerHTML = I.arrow || '';
    document.querySelectorAll('[data-ic]').forEach(s => { s.innerHTML = s.dataset.ic === 'mail' ? MAIL : (I[s.dataset.ic] || ''); });
    const soc = document.querySelector('[data-social]');
    if (soc) soc.innerHTML =
      `<a href="${S.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${I.tiktok || ''}</a>
       <a href="${S.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${I.facebook || ''}</a>
       <a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram || ''}</a>
       <a href="${S.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.linkedin || ''}</a>`;
  }

  /* Envoi via FormSubmit (même service que la demande de devis), repli mailto.
     ⚠️ RAPPEL : le 1er envoi déclenche un mail d'activation à confirmer sur contact@dlyr-vr.com. */
  const DEST = 'tristankouker@gmail.com';
  const WORKER_ENDPOINT = 'https://dlyr-cms-worker.tristankouker.workers.dev/send-email';
  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/' + encodeURIComponent(DEST);

  function form() {
    const f = document.querySelector('[data-contact]');
    if (!f) return;
    const en = document.documentElement.lang === 'en';
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      const nom = (f.nom.value || '').trim();
      const email = (f.email.value || '').trim();
      const tel = (f.tel.value || '').trim();
      const sujet = f.sujet.value || '';
      const msg = (f.msg.value || '').trim();
      const btn = f.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = en ? 'Sending…' : 'Envoi en cours…';

      const payload = {
        Nom: nom, Email: email,
        'Téléphone': tel || (en ? 'Not provided' : 'Non précisé'),
        Sujet: sujet, Message: msg || '—',
        _subject: `Contact D'LYR — ${sujet}`,
      };
      try {
        let sent = false;
        // 1. Essai d'envoi via Resend (Cloudflare Worker)
        try {
          const res = await fetch(WORKER_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data && data.ok) sent = true;
        } catch (_) {}

        // 2. Repli automatique si le worker n'est pas encore déployé
        if (!sent) {
          const res2 = await fetch(FORMSUBMIT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ ...payload, _template: 'table', _captcha: 'false' }),
          });
          const data2 = await res2.json().catch(() => ({}));
          if (!res2.ok || (data2 && data2.success === 'false')) throw new Error('fail');
        }

        f.innerHTML = `<div class="quote__done"><strong>${en ? 'Thank you' : 'Merci'} ${nom || ''} !</strong><br>${en ? 'Your message has been sent. We reply within 24/48h.' : 'Votre message a bien été envoyé. Nous vous répondons sous 24/48h.'}</div>`;
        window.DLYR_toast && window.DLYR_toast(en ? 'Message sent!' : 'Message envoyé !');
      } catch (err) {
        btn.disabled = false;
        btn.textContent = original;
        const subject = encodeURIComponent(`Contact D'LYR — ${sujet}`);
        const body = encodeURIComponent(
          `${en ? 'Name' : 'Nom'} : ${nom}\nEmail : ${email}\n${en ? 'Phone' : 'Téléphone'} : ${tel || '—'}\n${en ? 'Subject' : 'Sujet'} : ${sujet}\n\nMessage :\n${msg || '—'}`
        );
        let box = f.querySelector('.quote__err');
        if (!box) {
          box = document.createElement('div');
          box.className = 'quote__err';
          btn.parentNode.insertBefore(box, btn);
        }
        box.innerHTML = en
          ? `Automatic sending failed. <a href="mailto:${DEST}?subject=${subject}&body=${body}">Click here to email us directly</a>.`
          : `L'envoi automatique a échoué. <a href="mailto:${DEST}?subject=${subject}&body=${body}">Cliquez ici pour nous écrire directement par mail</a>.`;
        window.DLYR_toast && window.DLYR_toast(en ? 'Sending failed — use the email link' : 'Envoi impossible — utilisez le lien mail proposé');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => { chrome(); form(); });
})();
