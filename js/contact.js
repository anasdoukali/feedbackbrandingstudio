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

// Reuse the site's GSAP engine; text remains visible if animation is unavailable.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !window.gsap) return;
  const reveal = () => {
    gsap.fromTo('.contact-line > span', { yPercent: 115 }, {
      yPercent: 0, duration: .85, stagger: .12, ease: 'power3.out', clearProps: 'transform'
    });
  };
  // Wait for the shared loader to finish so the reveal is visible.
  const loader = document.querySelector('.mxd-loader');
  if (loader && getComputedStyle(loader).display !== 'none') {
    const observer = new MutationObserver(() => {
      if (getComputedStyle(loader).display === 'none') { observer.disconnect(); reveal(); }
    });
    observer.observe(loader, { attributes: true, attributeFilter: ['style', 'class'] });
  } else reveal();
  const magnet = document.querySelector('.contact-magnet');
  if (!magnet || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  magnet.addEventListener('pointermove', event => {
    if (reduced.matches) return;
    const box = magnet.getBoundingClientRect();
    gsap.to(magnet, { x: (event.clientX - box.left - box.width / 2) * .18,
      y: (event.clientY - box.top - box.height / 2) * .18, duration: .35, ease: 'power2.out' });
  });
  magnet.addEventListener('pointerleave', () => gsap.to(magnet, { x: 0, y: 0, duration: .5, ease: 'power3.out' }));
})();
