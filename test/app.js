/* ══════════════════════════════════════════
   ALJRAD Digital Solutions — app.js
   Handles: language switching, mobile drawer,
            cost calculator, data.json rendering
   ══════════════════════════════════════════ */

let currentLang = 'de';
let drawerOpen  = false;
let siteData    = null;

/* ── Fetch data.json and boot ── */
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    siteData = data;
    renderAll(data);
    setLang(currentLang);
  })
  .catch(() => {
    /* Fallback: page already has inline content, just set language */
    setLang(currentLang);
  });

/* ══ RENDER FUNCTIONS ══ */

function renderAll(data) {
  renderNav(data);
  renderHero(data);
  renderStats(data);
  renderServices(data);
  renderPricing(data);
  renderCalculator(data);
  renderCTA(data);
  renderFooterFeatures(data);
  renderFooter(data);
}

function t(obj, lang) {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['en'] || '';
}

function renderNav(data) {
  const nav = data.nav;
  const links = document.querySelectorAll('.nav-links a[data-key]');
  links.forEach(a => {
    const key = a.dataset.key;
    if (nav[key]) a.textContent = t(nav[key], currentLang);
  });
  const cta = document.querySelector('.nav-cta [data-key="cta"]');
  if (cta) cta.textContent = t(nav.cta, currentLang);
}

function renderHero(data) {
  const h = data.hero;
  setText('[data-hero="badge"]',     t(h.badge, currentLang));
  setText('[data-hero="h1_1"]',      t(h.h1_1, currentLang));
  setText('[data-hero="h1_2"]',      t(h.h1_2, currentLang));
  setText('[data-hero="desc"]',      t(h.desc, currentLang));
  setText('[data-hero="btn_primary"]',   t(h.btn_primary, currentLang));
  setText('[data-hero="btn_secondary"]', t(h.btn_secondary, currentLang));
}

function renderStats(data) {
  const items = document.querySelectorAll('.stat-item');
  data.stats.forEach((s, i) => {
    if (!items[i]) return;
    const numEl = items[i].querySelector('.stat-num');
    const lblEl = items[i].querySelector('.stat-lbl');
    if (numEl) numEl.textContent = t(s.num, currentLang);
    if (lblEl) lblEl.textContent = t(s.lbl, currentLang);
  });
}

function renderServices(data) {
  const sec = data.services_section;
  setText('#services .sec-label', t(sec.label, currentLang));
  setText('#services .sec-title', t(sec.title, currentLang));
  setText('#services .sec-desc',  t(sec.desc,  currentLang));

  const cards = document.querySelectorAll('.svc-card[data-svc]');
  cards.forEach(card => {
    const key = card.dataset.svc;
    const svc = data.services.find(s => s.key === key);
    if (!svc) return;
    setText(card, '.svc-card-title',  t(svc.title,   currentLang));
    setText(card, '.svc-card-short',  t(svc.short,   currentLang));
    setText(card, '.svc-detail-title',t(sec.what,    currentLang));
    setText(card, '.svc-detail p',    t(svc.detail,  currentLang));
    setText(card, '.svc-example',     '💡 ' + t(svc.example, currentLang));
  });
}

function renderPricing(data) {
  const sec = data.pricing_section;
  setText('#pricing .sec-label', t(sec.label, currentLang));
  setText('#pricing .sec-title', t(sec.title, currentLang));
  setText('#pricing .sec-desc',  t(sec.desc,  currentLang));

  const cards = document.querySelectorAll('.price-card[data-pkg]');
  cards.forEach(card => {
    const key = card.dataset.pkg;
    const pkg = data.packages.find(p => p.key === key);
    if (!pkg) return;
    const badge = card.querySelector('.popular-badge');
    if (badge && pkg.popularLabel) badge.textContent = t(pkg.popularLabel, currentLang);
    setText(card, 'h3',            t(pkg.title,    currentLang));
    setText(card, '.price-note',   t(pkg.monthly,  currentLang));
    setText(card, '.price-btn',    t(sec.order,    currentLang));

    const amountEl = card.querySelector('.price-amount');
    if (amountEl) amountEl.innerHTML = pkg.price + ' <span>' + t(pkg.priceNote, currentLang) + '</span>';

    const featureEls = card.querySelectorAll('.price-features li');
    pkg.features.forEach((f, i) => {
      if (featureEls[i]) featureEls[i].textContent = t(f, currentLang);
    });
  });
}

function renderCalculator(data) {
  const calc = data.calculator;
  setText('.calc-title',        t(calc.title, currentLang));
  setText('.calc-desc',         t(calc.desc,  currentLang));
  setText('.calc-result-label', t(calc.result_label, currentLang));
  setText('.calc-result-note',  t(calc.result_note,  currentLang));
  setText('.calc-contact-btn span', t(calc.cta, currentLang));

  const items = document.querySelectorAll('.calc-item[data-calc-idx]');
  items.forEach(item => {
    const idx = parseInt(item.dataset.calcIdx);
    const ci = calc.items[idx];
    if (!ci) return;
    const span = item.querySelector('label span');
    if (span) span.textContent = t(ci.label, currentLang);
    const priceEl = item.querySelector('.calc-item-price');
    if (priceEl) priceEl.textContent = t(ci.priceLabel, currentLang);
  });
}

function renderCTA(data) {
  const c = data.cta_banner;
  setText('.cta-text h2', t(c.title, currentLang));
  setText('.cta-text p',  t(c.desc,  currentLang));
  setText('.btn-white span', t(c.message_btn, currentLang));
}

function renderFooterFeatures(data) {
  const items = document.querySelectorAll('.ff-item[data-ff-idx]');
  items.forEach(item => {
    const idx = parseInt(item.dataset.ffIdx);
    const f = data.footer_features[idx];
    if (!f) return;
    setText(item, 'h4', t(f.title, currentLang));
    setText(item, 'p',  t(f.desc,  currentLang));
  });
}

function renderFooter(data) {
  setText('.footer-copy', t(data.footer.copy, currentLang));
}

/* ── Helper: set text in scope ── */
function setText(scopeOrSelector, selectorOrText, text) {
  if (text === undefined) {
    /* called as setText(selector, text) */
    const els = document.querySelectorAll(scopeOrSelector);
    els.forEach(el => { if (el) el.textContent = selectorOrText; });
  } else {
    /* called as setText(scope, childSelector, text) */
    const scope = typeof scopeOrSelector === 'string'
      ? document.querySelector(scopeOrSelector)
      : scopeOrSelector;
    if (!scope) return;
    const el = scope.querySelector(selectorOrText);
    if (el) el.textContent = text;
  }
}

/* ══ LANGUAGE SWITCHING ══ */

function setLang(lang) {
  currentLang = lang;

  /* Direction & font */
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ltr', lang !== 'ar');

  /* Re-render dynamic content if data loaded */
  if (siteData) renderAll(siteData);

  /* Mark active language in all lang menus */
  document.querySelectorAll('.lang-menu li').forEach(li => {
    li.classList.toggle('active', li.dataset.lang === lang);
  });

  /* Close all lang menus */
  document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
}

/* ══ LANG MENU TOGGLE ══ */

function toggleLangMenu(event) {
  event.stopPropagation();

  /* Find the closest .lang-dropdown OR the drawer lang item */
  const dropdown = event.currentTarget.closest('.lang-dropdown') ||
                   event.currentTarget.closest('.drawer-lang-item');
  if (!dropdown) return;

  const menu = dropdown.querySelector('.lang-menu');
  if (!menu) return;

  const isOpen = menu.style.display === 'block';

  /* Close every other open menu first */
  document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');

  menu.style.display = isOpen ? 'none' : 'block';
}

/* Close lang menus on outside click */
document.addEventListener('click', e => {
  const insideDropdown = e.target.closest('.lang-dropdown') ||
                         e.target.closest('.drawer-lang-item');
  if (!insideDropdown) {
    document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
  }
});

/* ══ MOBILE DRAWER ══ */

function toggleMenu() {
  drawerOpen = !drawerOpen;
  document.getElementById('hbg').classList.toggle('open', drawerOpen);
  document.getElementById('overlay').classList.toggle('open', drawerOpen);
  document.getElementById('drawer').classList.toggle('open', drawerOpen);
  document.body.style.overflow = drawerOpen ? 'hidden' : '';
}

function closeMenu() {
  drawerOpen = false;
  document.getElementById('hbg').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('drawer').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* ══ CALCULATOR ══ */

function toggleCalc(item) {
  const cb = item.querySelector('input[type=checkbox]');
  cb.checked = !cb.checked;
  item.classList.toggle('selected', cb.checked);
  updateCalc();
}

function updateCalc() {
  let total = 0;
  document.querySelectorAll('#calcGrid input[type=checkbox]:checked').forEach(cb => {
    total += parseInt(cb.value);
  });
  document.getElementById('calcTotal').textContent = total + ' €';
}
