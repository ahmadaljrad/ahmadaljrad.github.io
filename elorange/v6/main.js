/* =====================================================
   Orange Fahrschule – main.js
   ===================================================== */

'use strict';

// ─── State ────────────────────────────────────────────
let currentLang = 'de';
let translations = null;

// ─── Boot ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  translations = await loadTranslations();
  applyLang(currentLang);
  initNav();
  initMobileMenu();
  initReveal();
  initStats();
  initLangSwitcher();
  initDarkMode();
  initStarPicker();
});

// ─── Load data.json ───────────────────────────────────
async function loadTranslations() {
  const res = await fetch('data.json');
  if (!res.ok) throw new Error('Could not load data.json');
  return res.json();
}

// ─── Language switcher ────────────────────────────────
function initLangSwitcher() {
  // Sync both desktop and mobile lang buttons together
  const allBtns = document.querySelectorAll('.lang-switcher button, .mobile-lang-switcher button');
  allBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      // Update active state on all switchers
      allBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
      currentLang = lang;
      applyLang(lang);
    });
  });
}

// ─── Apply language ───────────────────────────────────
function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;

  // RTL support for Arabic
  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

  renderNav(t.nav);
  renderMobileMenu(t.mobileMenu);
  renderHero(t.hero);
  renderAbout(t.about);
  renderStats(t.stats);
  renderFeatures(t.features);
  renderCourses(t.courses);
  renderTestimonials(t.testimonials);
  renderContact(t.contact);
  renderFooter(t.footer);
  renderBooking(t.booking);
  renderReviewForm(t.reviewForm);
  setText('#toast', t.toast);
}

// ─── Section renderers ────────────────────────────────

function renderNav(nav) {
  setText('#nav-link-about',        nav.about);
  setText('#nav-link-features',     nav.features);
  setText('#nav-link-courses',      nav.courses);
  setText('#nav-link-testimonials', nav.testimonials);
  setText('#nav-link-booking',      nav.booking);
  setText('#nav-link-contact',      nav.contact);
  setText('#nav-cta',               nav.cta);
}

function renderMobileMenu(m) {
  setText('#mob-link-about',        m.about);
  setText('#mob-link-features',     m.features);
  setText('#mob-link-courses',      m.courses);
  setText('#mob-link-testimonials', m.testimonials);
  setText('#mob-link-booking',      m.booking);
  setText('#mob-link-contact',      m.contact);
  setText('#mob-cta',               m.cta);
}

function renderHero(h) {
  setText('#hero-tag',          h.tag);
  setText('#hero-btn-primary',  h.btnPrimary);
  setText('#hero-btn-secondary',h.btnSecondary);
  setText('#hero-scroll-text',  h.scroll);

  // h1: plain + <em> + rest
  const h1 = document.getElementById('hero-h1');
  if (h1) h1.innerHTML = `${esc(h.h1_plain)}<em>${esc(h.h1_em)}</em>${esc(h.h1_rest)}`;

  setText('#hero-p', h.p);
}

function renderAbout(a) {
  setText('#about-label',       a.label);
  setText('#about-h2',          a.h2);
  setText('#about-p1',          a.p1);
  setText('#about-p2',          a.p2);
  setText('#about-badge-suffix',a.badgeSuffix);

  const container = document.getElementById('about-features');
  if (container) {
    container.querySelectorAll('.about-feature p').forEach((el, i) => {
      if (a.features[i]) el.textContent = a.features[i];
    });
  }
}

function renderStats(s) {
  const cards = document.querySelectorAll('.stat-card');
  s.items.forEach((item, i) => {
    if (!cards[i]) return;
    cards[i].querySelector('.stat-label').textContent = item.label;
    // number is re-animated on intersection; store targets for reuse
    cards[i].dataset.target = item.number;
    cards[i].dataset.suffix = item.suffix;
  });
}

function renderFeatures(f) {
  setText('#features-label', f.label);
  setText('#features-h2',    f.h2);
  setText('#features-p',     f.p);

  const cards = document.querySelectorAll('.feature-card');
  f.cards.forEach((c, i) => {
    if (!cards[i]) return;
    cards[i].querySelector('.feature-body h3').textContent = c.h3;
    cards[i].querySelector('.feature-body p').textContent  = c.p;
  });
}

function renderCourses(c) {
  setText('#courses-label', c.label);
  setText('#courses-h2',    c.h2);

  const cards = document.querySelectorAll('.course-card');
  c.cards.forEach((card, i) => {
    if (!cards[i]) return;
    cards[i].querySelector('.course-badge').textContent = card.badge;
    cards[i].querySelector('h3').textContent            = card.h3;
    cards[i].querySelector('p').textContent             = card.p;
    const metaItems = cards[i].querySelectorAll('.course-meta-item');
    card.meta.forEach((m, j) => {
      if (metaItems[j]) metaItems[j].lastChild.textContent = ' ' + m;
    });
    const btn = cards[i].querySelector('.btn-course');
    if (btn) btn.textContent = c.btn;
  });
}

function renderTestimonials(t) {
  setText('#testi-label', t.label);
  setText('#testi-h2',    t.h2);

  const cards = document.querySelectorAll('.testi-card');
  t.cards.forEach((card, i) => {
    if (!cards[i]) return;
    cards[i].querySelector('blockquote').textContent   = card.quote;
    cards[i].querySelector('.testi-name').textContent  = card.name;
    cards[i].querySelector('.testi-meta').textContent  = card.meta;
    cards[i].querySelector('.testi-avatar').textContent = card.initials;
  });
}

function renderContact(c) {
  setText('#contact-label', c.label);
  setText('#contact-h2',    c.h2);
  setText('#contact-intro', c.intro);

  // Form
  const f = c.form;
  setAttr('#field-name',    'placeholder', f.namePlaceholder);
  setText('#label-name',     f.nameLabel);
  setText('#label-phone',    f.phoneLabel);
  setAttr('#field-phone',   'placeholder', f.phonePlaceholder);
  setText('#label-email',    f.emailLabel);
  setAttr('#field-email',   'placeholder', f.emailPlaceholder);
  setText('#label-course',   f.courseLabel);
  setText('#label-message',  f.messageLabel);
  setAttr('#field-message', 'placeholder', f.messagePlaceholder);
  setText('#btn-submit',     f.submitBtn);

  // Course select options
  const select = document.getElementById('field-course');
  if (select) {
    select.innerHTML = '';
    f.courseOptions.forEach(opt => {
      const o = document.createElement('option');
      o.textContent = opt;
      select.appendChild(o);
    });
  }

  // Info
  const info = c.info;
  setText('#info-address-label', info.addressLabel);
  setHTML('#info-address-value', info.addressValue);
  setText('#info-phone-label',   info.phoneLabel);
  setHTML('#info-phone-value',   info.phoneValue);
  setText('#info-email-label',   info.emailLabel);
  setHTML('#info-email-value',   info.emailValue);
  setText('#social-label',       c.socialLabel);
}

function renderFooter(f) {
  setText('#footer-tagline',   f.tagline);
  setText('#footer-nav-title', f.nav.title);
  setText('#footer-courses-title', f.courses.title);
  setText('#footer-legal-title',   f.legal.title);
  setText('#footer-copyright', f.copyright);
  setText('#footer-madewith',  f.madeWith);

  renderFooterLinks('#footer-nav-links',     f.nav.links,     ['#about','#features','#courses','#testimonials','#contact']);
  renderFooterLinks('#footer-courses-links', f.courses.links, ['#courses','#courses','#courses','#courses']);
  renderFooterLinks('#footer-legal-links',   f.legal.links,   ['#','#','#','#']);
}

function renderFooterLinks(selector, labels, hrefs) {
  const ul = document.querySelector(selector);
  if (!ul) return;
  const items = ul.querySelectorAll('li a');
  labels.forEach((label, i) => {
    if (items[i]) items[i].textContent = label;
  });
}

// ─── Nav scroll ───────────────────────────────────────
function initNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── Mobile menu ──────────────────────────────────────
function initMobileMenu() {
  window.toggleMenu = function () {
    document.getElementById('mobileMenu').classList.toggle('open');
  };
}

// ─── Scroll reveal ────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Stats counter ────────────────────────────────────
function initStats() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.stat-card').forEach(card => {
          const target = parseInt(card.dataset.target, 10);
          const suffix = card.dataset.suffix || '';
          animateCounter(card.querySelector('.stat-number'), target, suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });

  statsObserver.observe(statsSection);
}

function animateCounter(el, target, suffix) {
  let start = null;
  const duration = 1800;
  const step = (ts) => {
    if (!start) start = ts;
    const progress  = Math.min((ts - start) / duration, 1);
    const eased     = 1 - Math.pow(1 - progress, 3);
    el.textContent  = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── Form submit ──────────────────────────────────────
window.submitForm = function (e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.style.transform = 'translateY(0)';
  toast.style.opacity   = '1';
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity   = '0';
  }, 4000);
  e.target.reset();
};

// ─── Dark mode ────────────────────────────────────────
function initDarkMode() {
  const stored = localStorage.getItem('darkMode');
  if (stored === 'true') enableDark();
}

window.toggleDarkMode = function () {
  if (document.body.classList.contains('dark-mode')) {
    disableDark();
  } else {
    enableDark();
  }
};

function enableDark() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'true');
  document.getElementById('icon-moon').style.display = 'none';
  document.getElementById('icon-sun').style.display  = 'block';
}
function disableDark() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', 'false');
  document.getElementById('icon-moon').style.display = 'block';
  document.getElementById('icon-sun').style.display  = 'none';
}

// ─── Star picker ──────────────────────────────────────
function initStarPicker() {
  const stars = document.querySelectorAll('#starPicker span');
  const input = document.getElementById('field-comment-rating');
  let selected = 5;

  // Set initial state
  stars.forEach((s, i) => { if (i < 5) s.classList.add('active'); });

  stars.forEach((star, idx) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i <= idx));
    });
    star.addEventListener('mouseout', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i < selected));
    });
    star.addEventListener('click', () => {
      selected = idx + 1;
      if (input) input.value = selected;
      stars.forEach((s, i) => s.classList.toggle('active', i < selected));
    });
  });
}

// ─── Comment submit ───────────────────────────────────
window.submitComment = function (e) {
  e.preventDefault();
  const name    = document.getElementById('field-comment-name').value.trim();
  const text    = document.getElementById('field-comment-text').value.trim();
  const rating  = parseInt(document.getElementById('field-comment-rating').value, 10) || 5;
  if (!name || !text) return;

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const stars    = '★'.repeat(rating);
  const now      = new Date();
  const months   = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  const date     = months[now.getMonth()] + ' ' + now.getFullYear();

  const card = document.createElement('div');
  card.className = 'comment-card new-comment';
  card.innerHTML = `
    <div class="comment-header">
      <div class="comment-avatar">${initials}</div>
      <div>
        <div class="comment-author">${esc(name)}</div>
        <div class="comment-stars">${stars}</div>
      </div>
      <div class="comment-date">${date}</div>
    </div>
    <p class="comment-text">${esc(text)}</p>
  `;

  const list = document.getElementById('commentsList');
  list.insertBefore(card, list.firstChild);

  e.target.reset();
  // Reset stars to 5
  document.getElementById('field-comment-rating').value = 5;
  document.querySelectorAll('#starPicker span').forEach((s, i) => s.classList.toggle('active', i < 5));

  // Show toast
  const toast = document.getElementById('toast');
  if (window._reviewSuccessMsg) toast.textContent = window._reviewSuccessMsg;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity   = '1';
  setTimeout(() => { toast.style.transform = 'translateY(100px)'; toast.style.opacity = '0'; }, 3500);
};

// ─── Booking renderer ─────────────────────────────────
function renderBooking(b) {
  if (!b) return;
  setText('#booking-label',       b.label);
  setText('#booking-h2',          b.h2);
  setText('#booking-p',           b.p);
  setText('#booking-date-label',  b.dateLabel);
  setText('#booking-time-label',  b.timeLabel);
  setText('#booking-name-label',  b.nameLabel);
  setText('#booking-phone-label', b.phoneLabel);
  setText('#booking-submit-btn',  '');
  // keep the WA icon, append text
  const btn = document.getElementById('booking-submit-btn');
  if (btn) {
    const icon = btn.querySelector('svg');
    btn.textContent = b.submitBtn;
    if (icon) btn.prepend(icon);
  }
  setText('#booking-unavail-note', b.unavailableDaysNote);
  setAttr('#booking-name',  'placeholder', b.namePlaceholder);
  setAttr('#booking-phone', 'placeholder', b.phonePlaceholder);

  // Rebuild time select
  const timeSelect = document.getElementById('booking-time');
  if (timeSelect && b.timeSlots) {
    timeSelect.innerHTML = `<option value="">${b.selectTimePlaceholder}</option>`;
    b.timeSlots.forEach(t => {
      const o = document.createElement('option');
      o.value = o.textContent = t;
      timeSelect.appendChild(o);
    });
  }

  // Rebuild instructor buttons
  const selector = document.getElementById('instructorSelector');
  if (selector && b.instructors) {
    selector.innerHTML = '';
    b.instructors.forEach((ins, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'instructor-btn' + (i === 0 ? ' active' : '');
      btn.dataset.id = ins.id;
      btn.textContent = ins.name;
      btn.addEventListener('click', () => {
        selector.querySelectorAll('.instructor-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      selector.appendChild(btn);
    });
  }

  // Date min = today, disable weekends inline
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.addEventListener('change', () => {
      const d = new Date(dateInput.value + 'T12:00:00');
      const day = d.getDay(); // 0=Sun, 6=Sat
      if ((b.unavailableDays || [0,6]).includes(day)) {
        dateInput.setCustomValidity(b.unavailableDaysNote || 'Not available');
        dateInput.reportValidity();
        dateInput.value = '';
      } else {
        dateInput.setCustomValidity('');
      }
    });
  }

  // Store booking data for submitBooking
  window._bookingData = b;
}

// ─── Submit booking via WhatsApp ──────────────────────
window.submitBooking = function () {
  const b    = window._bookingData || {};
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;
  const name = document.getElementById('booking-name').value.trim();
  const phone= document.getElementById('booking-phone').value.trim();
  const activeBtn = document.querySelector('#instructorSelector .instructor-btn.active');
  const instructor = activeBtn ? activeBtn.textContent : '';
  const msgEl = document.getElementById('booking-validation-msg');

  if (!date || !time || !name || !phone) {
    if (msgEl) { msgEl.textContent = b.validationMsg || 'Bitte alle Felder ausfüllen.'; msgEl.style.display = 'block'; }
    return;
  }
  if (msgEl) msgEl.style.display = 'none';

  // Format date nicely
  const dateObj = new Date(date + 'T12:00:00');
  const dateFormatted = dateObj.toLocaleDateString(
    document.documentElement.lang === 'ar' ? 'ar-DE' :
    document.documentElement.lang === 'en' ? 'en-DE' : 'de-DE',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  const whatsappNum = b.whatsappNumber || '4930123456789';
  let msg = (b.whatsappMessage || 'Datum: {date}\nZeit: {time}\nFahrlehrer: {instructor}\nName: {name}\nTel: {phone}')
    .replace('{date}', dateFormatted)
    .replace('{time}', time)
    .replace('{instructor}', instructor)
    .replace('{name}', name)
    .replace('{phone}', phone);

  window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`, '_blank');
};

// ─── Review form renderer ─────────────────────────────
function renderReviewForm(r) {
  if (!r) return;
  setText('#comments-label',      r.label);
  setText('#comments-h2',         r.h2);
  setText('#comments-intro',      r.p);
  setText('#label-comment-name',  r.nameLabel);
  setAttr('#field-comment-name', 'placeholder', r.namePlaceholder);
  setText('#label-comment-rating',r.ratingLabel);
  setText('#label-comment-text',  r.commentLabel);
  setAttr('#field-comment-text', 'placeholder', r.commentPlaceholder);
  setText('#btn-comment-submit',  r.submitBtn);
  // store success msg
  window._reviewSuccessMsg = r.successMsg;
}

// ─── Helpers ──────────────────────────────────────────
function setText(sel, text) {
  const el = document.querySelector(sel);
  if (el) el.textContent = text;
}
function setHTML(sel, html) {
  const el = document.querySelector(sel);
  if (el) el.innerHTML = html;
}
function setAttr(sel, attr, value) {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, value);
}
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
