/* ══════════════════════════════════════════
   ALJRAD Digital Solutions — app.js
   ══════════════════════════════════════════ */

let currentLang = 'de';
let drawerOpen  = false;
let siteData    = null;

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initParticles();
  initRevealObserver();
  initCounterAnimation();
  initSmoothScroll();
  initActiveNavLink();
  initNavbarScroll();
});

/* ══ SCROLL PROGRESS ══ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

/* ══ PARTICLES CANVAS ══ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = 'rgba(37, 99, 235, ' + this.opacity + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 10), 100);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  init();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.strokeStyle = 'rgba(37, 99, 235, ' + (0.1 * (1 - dist / 100)) + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ══ REVEAL ON SCROLL ══ */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        const counters = entry.target.querySelectorAll('.stat-num[data-target]');
        counters.forEach(num => {
          if (!num.classList.contains('counted')) {
            num.classList.add('counted');
            animateCounter(num);
          }
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* ══ COUNTER ANIMATION ══ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (isNaN(target)) return;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const original = el.textContent;
  const hasPlus = original.includes('+');
  const hasPercent = original.includes('%');

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      let final = target.toString();
      if (hasPlus) final = '+' + final;
      if (hasPercent) final = final + '%';
      el.textContent = final;
      clearInterval(timer);
    } else {
      let val = Math.floor(current).toString();
      if (hasPlus) val = '+' + val;
      if (hasPercent) val = val + '%';
      el.textContent = val;
    }
  }, 16);
}

/* ══ SMOOTH SCROLL + ACTIVE LINK ON CLICK ══ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      
      /* Set active immediately */
      setActiveLink(href);
      
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ══ SET ACTIVE LINK ══ */
function setActiveLink(href) {
if (!href || href === '#') {
  href = '#home';
}

  document.querySelectorAll('.nav-links a, .drawer-nav-link').forEach(link => {
    link.classList.remove('active');
  });

  document.querySelectorAll('.nav-links a[href="' + href + '"]').forEach(link => {
    link.classList.add('active');
  });
  document.querySelectorAll('.drawer-nav-link[href="' + href + '"]').forEach(link => {
    link.classList.add('active');
  });
}

/* ══ ACTIVE NAV LINK ON SCROLL ══ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActive() {
    let current = 'home';
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    syncActiveLink('#' + current);
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
}

/* ══ NAVBAR SCROLL EFFECT ══ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ── Fetch data.json ── */
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    siteData = data;
    renderAll(data);
    setLang(currentLang);
  })
  .catch(() => {
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
  const activeHref = document.querySelector('.nav-links a.active')?.getAttribute('href') || '#';

  document.querySelectorAll('.nav-links a[data-key]').forEach(a => {
    const key = a.dataset.key;
    if (nav[key]) a.textContent = t(nav[key], currentLang);
  });

  document.querySelectorAll('.drawer-nav-link [data-key]').forEach(el => {
    const key = el.dataset.key;
    if (nav[key]) el.textContent = t(nav[key], currentLang);
  });

  const langLabel = document.querySelector('.drawer-lang-label[data-key="language"]');
  if (langLabel && nav.language) langLabel.textContent = t(nav.language, currentLang);

  document.querySelectorAll('[data-key="cta"]').forEach(el => {
    if (nav.cta) el.textContent = t(nav.cta, currentLang);
  });

  /* Restore active after text change */
  syncActiveLink(activeHref);
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

function setText(scopeOrSelector, selectorOrText, text) {
  if (text === undefined) {
    const els = document.querySelectorAll(scopeOrSelector);
    els.forEach(el => { if (el) el.textContent = selectorOrText; });
  } else {
    const scope = typeof scopeOrSelector === 'string'
      ? document.querySelector(scopeOrSelector)
      : scopeOrSelector;
    if (!scope) return;
    const el = scope.querySelector(selectorOrText);
    if (el) el.textContent = text;
  }
}

/* ══ SYNC ACTIVE LINK ══ */
function syncActiveLink(href) {
if (!href || href === '#') href = '#home';
  document.querySelectorAll('.nav-links a, .drawer-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  document.querySelectorAll('.nav-links a[href="' + href + '"]').forEach(link => {
    link.classList.add('active');
  });
  document.querySelectorAll('.drawer-nav-link[href="' + href + '"]').forEach(link => {
    link.classList.add('active');
  });
}

/* ══ LANGUAGE SWITCHING ══ */
function setLang(lang) {
  currentLang = lang;
  const isRtl = lang === 'ar';

  document.documentElement.lang = lang;
  document.documentElement.dir  = isRtl ? 'rtl' : 'ltr';
  document.body.classList.toggle('ltr', !isRtl);

  const drawer = document.getElementById('drawer');
  if (drawer) {
    drawer.classList.toggle('drawer-rtl', isRtl);
    drawer.classList.toggle('drawer-ltr', !isRtl);
  }

  const activeHref = document.querySelector('.nav-links a.active')?.getAttribute('href') || 
                     document.querySelector('.drawer-nav-link.active')?.getAttribute('href') || '#';

  if (siteData) renderAll(siteData);

  syncActiveLink(activeHref);

  document.querySelectorAll('.lang-menu li').forEach(li => {
    li.classList.toggle('active', li.dataset.lang === lang);
  });

  document.querySelectorAll('.drawer-lang-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
}

/* ══ LANG MENU TOGGLE ══ */
function toggleLangMenu(event) {
  event.stopPropagation();
  const dropdown = event.currentTarget.closest('.lang-dropdown');
  if (!dropdown) return;
  const menu = dropdown.querySelector('.lang-menu');
  if (!menu) return;
  const isOpen = menu.style.display === 'block';
  document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
  menu.style.display = isOpen ? 'none' : 'block';
}

document.addEventListener('click', e => {
  const insideDropdown = e.target.closest('.lang-dropdown');
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMenu();
    document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
  }
});

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
