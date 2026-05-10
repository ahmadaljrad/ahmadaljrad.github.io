document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentLang = localStorage.getItem('lang') || 'ar';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let translations = {};

    // DOM Elements
    const html = document.documentElement;
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const themeBtn = document.getElementById('themeBtn');
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const mobileThemeBtn = document.getElementById('mobileThemeBtn');

    // Init
    applyTheme(currentTheme);
    loadTranslations().then(() => {
        setLanguage(currentLang);
        renderDynamicContent();
        initAnimations();
        setTimeout(() => loader.classList.add('hidden'), 500);
    });

    // Load JSON
    async function loadTranslations() {
        try {
            const res = await fetch('data.json');
            translations = await res.json();
        } catch (e) {
            console.error('Failed to load translations', e);
            loader.innerHTML = '<p style="color:red;text-align:center;">خطأ في تحميل البيانات</p>';
        }
    }

    // Language System
    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        const data = translations[lang];
        
        html.setAttribute('dir', data.dir);
        html.setAttribute('lang', data.lang);
        localStorage.setItem('lang', lang);

        // Update static text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keys = el.getAttribute('data-i18n').split('.');
            let val = data;
            keys.forEach(k => val = val?.[k]);
            if (val) el.textContent = val;
        });

        // Close dropdown
        langDropdown.classList.remove('show');
    }

    // Theme System
    function applyTheme(theme) {
        currentTheme = theme;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        themeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if(mobileThemeBtn) mobileThemeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }

    function toggleTheme() {
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    // Dynamic Content Rendering (Services & Pricing)
    function renderDynamicContent() {
        const data = translations[currentLang];
        if (!data) return;

        // Services
        const servicesGrid = document.getElementById('servicesGrid');
        servicesGrid.innerHTML = data.services.cards.map((s, i) => `
            <article class="service-card reveal" style="transition-delay: ${i * 0.1}s">
                <div class="service-icon"><i class="${s.icon}"></i></div>
                <h3>${s.title}</h3>
                <ul>${s.items.map(item => `<li>${item}</li>`).join('')}</ul>
            </article>
        `).join('');

        // Pricing
        const pricingGrid = document.getElementById('pricingGrid');
        pricingGrid.innerHTML = data.pricing.plans.map((p, i) => `
            <article class="pricing-card reveal ${p.badge ? 'featured' : ''}" data-badge="${p.badge}" style="transition-delay: ${i * 0.15}s">
                <h3>${p.name}</h3>
                <div class="price">${p.price}<span>${p.period}</span></div>
                <ul>${p.items.map(item => `<li>${item}</li>`).join('')}</ul>
                <a href="#contact" class="btn btn-primary" style="width:100%;justify-content:center;">${currentLang === 'ar' ? 'اطلب الآن' : 'Order Now'}</a>
            </article>
        `).join('');

        // Calculator Options
        const calcOptions = document.getElementById('calcOptions');
        calcOptions.innerHTML = data.calc.options.map((opt, i) => `
            <label class="calc-option reveal" style="transition-delay: ${i * 0.05}s">
                <input type="checkbox" value="${opt.price}" id="calc-${opt.id}">
                <span>${opt.label} (${opt.price}€)</span>
            </label>
        `).join('');
        
        // Re-observe new elements
        initAnimations();
    }

    // Calculator Logic
    document.getElementById('calcBtn').addEventListener('click', () => {
        const checks = document.querySelectorAll('#calcOptions input:checked');
        let total = 0;
        checks.forEach(c => total += parseFloat(c.value));
        
        const resultEl = document.getElementById('calcResult');
        resultEl.style.opacity = '0';
        resultEl.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            document.getElementById('totalPrice').textContent = `${total}€`;
            resultEl.style.opacity = '1';
            resultEl.style.transform = 'scale(1)';
            resultEl.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 150);
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        document.querySelectorAll('#calcOptions input').forEach(c => c.checked = false);
        document.getElementById('calcResult').style.opacity = '0';
    });

    document.getElementById('sendBtn').addEventListener('click', () => {
        const total = document.getElementById('totalPrice').textContent;
        if(total === '0€') { alert('الرجاء اختيار خدمة أولاً'); return; }
        window.open(`https://wa.me/4915259859931?text=${encodeURIComponent(`طلب خدمة:\nالمبلغ التقريبي: ${total}`)}`, '_blank');
    });

    // UI Interactions
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });
    
    document.querySelectorAll('.dropdown button').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
            renderDynamicContent();
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-switcher')) langDropdown.classList.remove('show');
    });

    themeBtn.addEventListener('click', toggleTheme);
    if(mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // Mobile Menu
    function openMenu() {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    mobileBtn.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMenu));

    // Scroll Effects
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Animations Observer
    function initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Counter animation for stats
                    if(entry.target.querySelector('.stat-num')) {
                        animateCounter(entry.target.querySelector('.stat-num'));
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        if(isNaN(target)) return;
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if(current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(current);
            }
        }, 30);
    }
});