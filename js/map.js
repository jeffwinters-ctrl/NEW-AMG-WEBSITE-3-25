/* ============================================
   ABSTRAKT - Interactive Market Map
   Dark theme Leaflet map with industry context
   ============================================ */

let mapInstance = null;

function initMap() {
  const mapEl = document.getElementById('market-map');
  if (!mapEl || mapInstance) return;

  mapInstance = L.map('market-map', {
    center: [39.5, -98.5],
    zoom: 4.5,
    minZoom: 3,
    maxZoom: 10,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false
  });

  // Dark map tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(mapInstance);

  L.control.attribution({ prefix: false, position: 'bottomright' })
    .addAttribution('&copy; <a href="https://carto.com/">CARTO</a>')
    .addTo(mapInstance);

  loadMarkets();
}

async function loadMarkets() {
  try {
    const res = await fetch('./data/markets.json');
    const data = await res.json();
    window.marketsData = data.markets;
    addMarkets(data.markets);
  } catch (err) {
    console.error('Failed to load market data:', err);
  }
}

function addMarkets(markets) {
  if (!mapInstance) return;

  markets.forEach(market => {
    const isAvailable = market.status === 'available';
    const markerClass = isAvailable ? 'market-marker--available' : 'market-marker--call';

    const icon = L.divIcon({
      className: '',
      html: '<div class="market-marker ' + markerClass + '"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });

    const marker = L.marker([market.lat, market.lng], { icon }).addTo(mapInstance);
    marker.bindPopup(() => createPopupContent(market), {
      maxWidth: 340,
      closeButton: true,
      className: 'market-popup'
    });
  });
}

function createPopupContent(market) {
  const isAvailable = market.status === 'available';
  const statusClass = isAvailable ? 'popup-content__status--available' : 'popup-content__status--call';
  const statusText = isAvailable ? 'Available' : 'Call for Availability';
  const statusIcon = isAvailable ? '&#10003;' : '&#9743;';
  const industry = window.selectedIndustry || 'your industry';

  const message = isAvailable
    ? 'We have availability for <strong>' + industry + '</strong> in the ' + market.city + ' metro. Submit your info and a Pipeline Strategist will reach out within 24 hours.'
    : 'The ' + market.city + ' market for <strong>' + industry + '</strong> is in high demand. Submit your info and we\'ll update you on availability.';

  return '<div class="popup-content">' +
    '<div class="popup-content__header">' +
      '<span class="popup-content__city">' + market.city + ', ' + market.state + '</span>' +
      '<span class="popup-content__status ' + statusClass + '">' + statusIcon + ' ' + statusText + '</span>' +
    '</div>' +
    '<div class="popup-content__industry">' + industry + '</div>' +
    '<p class="popup-content__message">' + message + '</p>' +
    '<form class="popup-form" onsubmit="handlePopupSubmit(event, \'' + market.city + '\', \'' + market.state + '\')">' +
      '<input type="text" name="name" placeholder="Full Name" required />' +
      '<span class="popup-form__error"></span>' +
      '<input type="email" name="email" placeholder="Business Email" required />' +
      '<span class="popup-form__error"></span>' +
      '<input type="tel" name="phone" placeholder="Phone Number" required />' +
      '<span class="popup-form__error"></span>' +
      '<input type="text" name="company" placeholder="Company Name" required />' +
      '<span class="popup-form__error"></span>' +
      '<button type="submit" class="btn btn--primary btn--sm">Get Market Details</button>' +
    '</form>' +
  '</div>';
}

function refreshPopups() {
  if (mapInstance) mapInstance.closePopup();
}

function handlePopupSubmit(e, city, state) {
  e.preventDefault();
  const form = e.target;
  if (!window.validatePopupForm(form)) return;

  const industry = window.selectedIndustry || 'Not specified';
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    company: form.company.value,
    market: city + ', ' + state,
    industry: industry
  };

  console.log('Market inquiry submitted:', data);

  form.innerHTML =
    '<div class="popup-form__success">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>' +
        '<polyline points="22 4 12 14.01 9 11.01"/>' +
      '</svg>' +
      '<p><strong>Thank you!</strong><br/>A Pipeline Strategist will contact you within 24 hours about ' + industry + ' in ' + city + '.</p>' +
    '</div>';
}

window.initMap = initMap;
window.refreshPopups = refreshPopups;
window.handlePopupSubmit = handlePopupSubmit;
