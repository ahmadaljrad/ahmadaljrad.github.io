/* ══════════════════════════════════════════
   ALJRAD Digital Solutions — app.js v2
   Enhanced: Dark Mode · Particles · RTL
   ══════════════════════════════════════════ */

let currentLang = 'de';
let drawerOpen  = false;
let siteData    = null;
let isDark      = false;

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initParticles();
  initRevealObserver();
  initSmoothScroll();
  initActiveNavLink();
  initNavbarScroll();
  initKeyboardNav();
  syncDrawerDarkToggle();
});

/* ══ THEME (Dark / Light) ══ */
function initTheme() {
  const stored = localStorage.getItem('aljrad-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark = stored ? stored === 'dark' : prefersDark;
  applyTheme(isDark);
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme(isDark);
  localStorage.setItem('aljrad-theme', isDark ? 'dark' : 'light');
  syncDrawerDarkToggle();
}

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  // Update particle color for dark mode
  if (window._particleSystem) window._particleSystem.setDark(dark);
}

function syncDrawerDarkToggle() {
  const toggle = document.getElementById('drawerDarkToggle');
  if (toggle) toggle.checked = isDark;
}

/* ══ SCROLL PROGRESS ══ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = scrolled + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══ PARTICLES CANVAS — Enhanced ══ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { canvas.style.display = 'none'; return; }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); init(); }, 200);
  }, { passive: true });

  function getColor() {
    return isDark ? 'rgba(96,165,250,' : 'rgba(37,99,235,';
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size    = Math.random() * 1.8 + 0.4;
      this.speedX  = (Math.random() - 0.5) * 0.4;
      this.speedY  = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.45 + 0.08;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width + 10)  this.x = -10;
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.y > canvas.height + 10) this.y = -10;
      if (this.y < -10) this.y = canvas.height + 10;
    }
    draw() {
      ctx.fillStyle = getColor() + this.opacity + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 12), 80);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  init();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    const maxDist = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = 0.08 * (1 - dist / maxDist);
          ctx.strokeStyle = getColor() + alpha + ')';
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(animate);
  }
  animate();

  // Expose to theme toggler
  window._particleSystem = { setDark: (d) => { isDark = d; } };
}

/* ══ REVEAL ON SCROLL ══ */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Trigger counters inside revealed elements
        entry.target.querySelectorAll('.stat-num[data-target]').forEach(num => {
          if (!num.dataset.counted) {
            num.dataset.counted = '1';
            animateCounter(num);
          }
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* ══ COUNTER ANIMATION ══ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (isNaN(target)) return;
  const duration = 1800;
  const original  = el.textContent;
  const hasPlus   = original.includes('+');
  const hasPercent = original.includes('%');
  const startTime = performance.now();

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const val      = Math.floor(easeOutQuart(progress) * target);
    let display    = val.toString();
    if (hasPlus)   display = '+' + display;
    if (hasPercent) display = display + '%';
    el.textContent = display;
    if (progress < 1) requestAnimationFrame(step);
    else {
      let final = target.toString();
      if (hasPlus)   final = '+' + final;
      if (hasPercent) final = final + '%';
      el.textContent = final;
    }
  }
  requestAnimationFrame(step);
}

/* ══ SMOOTH SCROLL ══ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      setActiveLink(href);
      const target = document.querySelector(href);
      if (target) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ══ SET ACTIVE LINK ══ */
function setActiveLink(href) {
  if (!href || href === '#') href = '#home';
  document.querySelectorAll('.nav-links a, .drawer-nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.nav-links a[href="${href}"], .drawer-nav-link[href="${href}"]`).forEach(l => l.classList.add('active'));
}

function syncActiveLink(href) {
  if (!href || href === '#') href = '#home';
  setActiveLink(href);
}

/* ══ ACTIVE NAV ON SCROLL ══ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id], div[id]');
  let scrollTick = false;

  function updateActive() {
    let current = 'home';
    const scrollY = window.scrollY + 160;
    sections.forEach(sec => { if (scrollY >= sec.offsetTop) current = sec.id; });
    syncActiveLink('#' + current);
  }

  window.addEventListener('scroll', () => {
    if (!scrollTick) {
      requestAnimationFrame(() => { updateActive(); scrollTick = false; });
      scrollTick = true;
    }
  }, { passive: true });
  updateActive();
}

/* ══ NAVBAR SCROLL EFFECT ══ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ══ KEYBOARD NAVIGATION ══ */
function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
      document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
    }
    // Tab trap in drawer
    if (e.key === 'Tab' && drawerOpen) {
      const drawer = document.getElementById('drawer');
      const focusable = drawer.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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
  syncActiveLink(activeHref);
}

function renderHero(data) {
  const h = data.hero;
  setText('[data-hero="badge"]',        t(h.badge, currentLang));
  setText('[data-hero="h1_1"]',         t(h.h1_1, currentLang));
  setText('[data-hero="h1_2"]',         t(h.h1_2, currentLang));
  setText('[data-hero="desc"]',         t(h.desc, currentLang));
  setText('[data-hero="btn_primary"]',  t(h.btn_primary, currentLang));
  setText('[data-hero="btn_secondary"]', t(h.btn_secondary, currentLang));
setText('[data-hero="cv_banner.title"]', t(data.hero.cv_banner.title, currentLang));
  setText('[data-hero="cv_banner.desc"]', t(data.hero.cv_banner.desc, currentLang));
  setText('[data-hero="cv_banner.btn"]', t(data.hero.cv_banner.btn, currentLang));
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
  setText('#services .sec-desc',  t(sec.desc, currentLang));
  const cards = document.querySelectorAll('.svc-card[data-svc]');
  cards.forEach(card => {
    const key = card.dataset.svc;
    const svc = data.services.find(s => s.key === key);
    if (!svc) return;
    setText(card, '.svc-card-title',   t(svc.title,   currentLang));
    setText(card, '.svc-card-short',   t(svc.short,   currentLang));
    setText(card, '.svc-detail-title', t(sec.what,    currentLang));
    setText(card, '.svc-detail p',     t(svc.detail,  currentLang));
    setText(card, '.svc-example',      '💡 ' + t(svc.example, currentLang));
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
    setText(card, 'h3',           t(pkg.title,    currentLang));
    setText(card, '.price-note',  t(pkg.monthly,  currentLang));
    setText(card, '.price-btn',   t(sec.order,    currentLang));
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
    const ci  = calc.items[idx];
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
    const f   = data.footer_features[idx];
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
    document.querySelectorAll(scopeOrSelector).forEach(el => { if (el) el.textContent = selectorOrText; });
  } else {
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

  // Update active states in menus
  document.querySelectorAll('.lang-menu li').forEach(li => {
    li.classList.toggle('active', li.dataset.lang === lang);
  });
  document.querySelectorAll('.drawer-lang-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');

  // Arabic-specific font size adjustments
  if (lang === 'ar') {
    document.body.style.setProperty('--arabic-size-adj', '1.05');
  } else {
    document.body.style.removeProperty('--arabic-size-adj');
  }
}

/* ══ LANG MENU TOGGLE ══ */
function toggleLangMenu(event) {
  event.stopPropagation();
  const dropdown = event.currentTarget.closest('.lang-dropdown');
  if (!dropdown) return;
  const menu     = dropdown.querySelector('.lang-menu');
  const toggle   = dropdown.querySelector('.lang-toggle');
  if (!menu) return;
  const isOpen   = menu.style.display === 'block';
  document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
  menu.style.display = isOpen ? 'none' : 'block';
  toggle?.setAttribute('aria-expanded', String(!isOpen));
}

document.addEventListener('click', e => {
  if (!e.target.closest('.lang-dropdown')) {
    document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
    document.querySelectorAll('.lang-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
  }
});

/* ══ MOBILE DRAWER ══ */
function toggleMenu() {
  drawerOpen ? closeMenu() : openMenu();
}

function openMenu() {
  drawerOpen = true;
  const hbg     = document.getElementById('hbg');
  const overlay = document.getElementById('overlay');
  const drawer  = document.getElementById('drawer');
  hbg?.classList.add('open');
  overlay?.classList.add('open');
  drawer?.classList.add('open');
  document.body.style.overflow = 'hidden';
  hbg?.setAttribute('aria-expanded', 'true');
  // Focus first focusable element in drawer
  setTimeout(() => {
    drawer?.querySelector('button, a')?.focus();
  }, 100);
}

function closeMenu() {
  drawerOpen = false;
  const hbg     = document.getElementById('hbg');
  const overlay = document.getElementById('overlay');
  const drawer  = document.getElementById('drawer');
  hbg?.classList.remove('open');
  overlay?.classList.remove('open');
  drawer?.classList.remove('open');
  document.body.style.overflow = '';
  hbg?.setAttribute('aria-expanded', 'false');
  hbg?.focus();
}

/* ══ CALCULATOR ══ */
function toggleCalc(item) {
  const cb = item.querySelector('input[type=checkbox]');
  if (!cb) return;
  cb.checked = !cb.checked;
  item.classList.toggle('selected', cb.checked);
  // Animate the price change
  animateCalcChange();
}

function animateCalcChange() {
  const totalEl = document.getElementById('calcTotal');
  if (!totalEl) return;
  totalEl.style.transform = 'scale(1.1)';
  totalEl.style.transition = 'transform 0.2s ease';
  setTimeout(() => {
    updateCalc();
    totalEl.style.transform = 'scale(1)';
  }, 100);
}

function updateCalc() {
  let total = 0;
  document.querySelectorAll('#calcGrid input[type=checkbox]:checked').forEach(cb => {
    total += parseInt(cb.value) || 0;
  });
  const totalEl = document.getElementById('calcTotal');
  if (totalEl) totalEl.textContent = total.toLocaleString('de-DE') + ' €';
}

/* ══ SMOOTH HOVER EFFECTS on Service Cards ══ */
document.addEventListener('DOMContentLoaded', () => {
  // Add magnetic hover to CTA button
  const ctaBtn = document.querySelector('.nav-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.15;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.15;
      this.style.transform = `translateY(-2px) translate(${x}px, ${y}px)`;
    });
    ctaBtn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }
});


/* ══ END ══ */
