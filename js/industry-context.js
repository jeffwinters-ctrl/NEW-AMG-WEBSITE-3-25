/* ============================================
   ABSTRAKT - Industry Context
   Redirects to gateway if no industry selected,
   injects header badge for switching industry
   ============================================ */

(function () {
  var industry = localStorage.getItem('abstrakt_industry');

  // Redirect to gateway if no industry selected
  if (!industry) {
    var isGateway = window.location.pathname.indexOf('gateway') !== -1;
    if (!isGateway) {
      window.location.replace('./gateway.html');
      return;
    }
  }

  var names = {
    'hvac': 'HVAC',
    'roofing': 'Roofing',
    'construction': 'Construction',
    'landscaping': 'Landscaping',
    'paving': 'Paving',
    'commercial-cleaning': 'Commercial Cleaning',
    'flooring': 'Flooring',
    'electrical': 'Electrical',
    'fire-protection': 'Fire Protection',
    'painting': 'Painting',
    'solar': 'Solar',
    'general-contracting': 'General Contracting',
    'plumbing': 'Plumbing',
    'all': 'All Industries',
  };

  // Inject industry badge into header
  document.addEventListener('DOMContentLoaded', function () {
    if (!industry) return;

    var headerRight = document.querySelector('.header__right');
    if (!headerRight) return;

    var badge = document.createElement('a');
    badge.className = 'header__industry-badge';
    badge.href = '#';
    badge.title = 'Change industry';
    badge.innerHTML = (names[industry] || industry) + ' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>';

    badge.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('abstrakt_industry');
      window.location.href = './gateway.html';
    });

    headerRight.insertBefore(badge, headerRight.firstChild);
  });
})();
