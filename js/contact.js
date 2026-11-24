// Keep contact delivery consistent with this static site's email links.
document.querySelector('.feedback-contact-form')?.addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const body = [
    `Nom : ${data.get('name')}`,
    `Email : ${data.get('email')}`,
    `Téléphone : ${data.get('phone') || 'Non renseigné'}`,
    '',
    data.get('message')
  ].join('\n');
  window.location.href = 'mailto:Hafid@FeedbackBranding.Studio?subject=' +
    encodeURIComponent(`Nouveau projet — ${data.get('name')}`) + '&body=' + encodeURIComponent(body);
});
