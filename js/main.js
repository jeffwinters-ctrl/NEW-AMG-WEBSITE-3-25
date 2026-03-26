/* ============================================
   ABSTRAKT - Main JavaScript
   Nav, Scroll Animations, Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initCounterAnimation();
  initSmoothScroll();
});

/* --- Page Loader --- */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 300);
  });
  setTimeout(() => loader.classList.add('is-hidden'), 2500);
}

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.header__mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-active');
    menu.classList.toggle('is-open');
    document.body.style.overflow = menu.classList.contains('is-open') ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-active');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* --- Counter Animation --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* --- Business Email Validation --- */
const PERSONAL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'proton.me', 'zoho.com',
  'yandex.com', 'gmx.com', 'live.com', 'msn.com', 'me.com',
  'comcast.net', 'att.net', 'verizon.net', 'cox.net', 'sbcglobal.net',
  'earthlink.net', 'mac.com', 'inbox.com', 'rocketmail.com'
];

function isBusinessEmail(email) {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase();
  return !PERSONAL_DOMAINS.includes(domain);
}

function validatePopupForm(form) {
  let valid = true;
  const fields = form.querySelectorAll('input[required]');

  fields.forEach(field => {
    const error = field.nextElementSibling;
    field.classList.remove('is-error');
    if (error && error.classList.contains('popup-form__error')) {
      error.classList.remove('is-visible');
    }

    if (!field.value.trim()) {
      field.classList.add('is-error');
      if (error) {
        error.textContent = 'This field is required';
        error.classList.add('is-visible');
      }
      valid = false;
    } else if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        field.classList.add('is-error');
        if (error) {
          error.textContent = 'Please enter a valid email';
          error.classList.add('is-visible');
        }
        valid = false;
      } else if (!isBusinessEmail(field.value)) {
        field.classList.add('is-error');
        if (error) {
          error.textContent = 'Please use a business email address';
          error.classList.add('is-visible');
        }
        valid = false;
      }
    }
  });

  return valid;
}

window.validatePopupForm = validatePopupForm;
window.isBusinessEmail = isBusinessEmail;
