/* ═══════════════════════════════════════════════════════════
   App — loads data.json, renders everything, handles UX
═══════════════════════════════════════════════════════════ */
const App = (() => {

    /* ── state ──────────────────────────────────────────── */
    let DATA = null;
    let lang = 'en';

    /* ── helpers ────────────────────────────────────────── */
    const t = (obj) => (obj && typeof obj === 'object') ? (obj[lang] ?? obj.en ?? '') : (obj ?? '');
    const el = (tag, cls, html) => {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html !== undefined) e.innerHTML = html;
        return e;
    };
    const svg = (id) => `<svg><use href="#${id}"/></svg>`;
    const sendIcon = `<svg width="13" height="13"><use href="#ico-send"/></svg>`;

    /* ── render helpers ─────────────────────────────────── */
    function secHeader(tagText, titleHtml, align) {
        const div = el('div', 'sec-header reveal' + (align === 'right' ? ' style-right' : ''));
        if (align === 'right') div.style.textAlign = 'right';
        const tag = el('div', 'sec-tag', tagText);
        const h2 = el('h2', 'sec-h2', titleHtml);
        div.append(tag, h2);
        return div;
    }

    function timelineRow(item, isRtl) {
        const row = el('div', 'tl-row reveal');
        const dateC = el('div', 'tl-date-cell');
        const dateD = el('div', 'tl-date', t(item.date));
        dateC.append(dateD);

        const contC = el('div', 'tl-content-cell');
        const dot = el('span', 'tl-dot');
        const role = el('div', 'tl-role', t(item.role));
        const org = el('div', 'tl-org', t(item.org));
        const desc = el('div', 'tl-desc', t(item.desc));
        contC.append(dot, role, org, desc);
        if (item.badge) {
            contC.append(el('span', 'cert-badge', t(item.badge)));
        }

        if (isRtl) {
            row.style.direction = 'rtl';
            contC.style.cssText = 'padding:30px 34px 30px 0;text-align:right';
            dateC.style.cssText = 'padding:30px 0 30px 34px;border-right:none;border-left:1px solid var(--border);text-align:right';
            row.append(dateC, contC);
        } else {
            row.append(dateC, contC);
        }
        return row;
    }

    /* ── build: hero ────────────────────────────────────── */
    function buildHero() {
        const h = DATA.hero;
        const c = DATA.contact;
        const sl = DATA.socialLinks;
        const isRtl = lang === 'ar';

        const sec = el('section', 'hero');
        // Hero animated grid background
        const gridBg = el('div', 'hero-grid-bg');
        sec.append(gridBg);
        const con = el('div', 'container');
        const inner = el('div', 'hero-inner');
        if (isRtl) inner.style.direction = 'rtl';

        /* text */
        const text = el('div', 'hero-text');
        if (isRtl) text.style.textAlign = 'right';

        const kicker = el('div', 'hero-kicker');
        kicker.append(el('span', 'hero-kicker-line'), document.createTextNode(t(h.kicker)));

        const h1 = el('h1', 'hero-h1');
        h1.innerHTML = t(h.firstName) + '<br><strong>' + t(h.lastName) + '</strong>';

        const sub = el('p', 'hero-sub', t(h.subtitle));
        if (isRtl) sub.style.textAlign = 'right';
        const div = el('div', 'hero-divider');
        const bio = el('p', 'hero-bio', t(h.bio));
        if (isRtl) bio.style.textAlign = 'right';

        const ctas = el('div', 'hero-ctas');
        const secId = `contact-${lang}`;
        const expId = `exp-${lang}`;
        const btnP = el('a', 'btn btn-primary', `${sendIcon} ${t(h.cta.primary)}`);
        btnP.href = `#${secId}`;
        const btnG = el('a', 'btn btn-ghost', t(h.cta.secondary));
        btnG.href = `#${expId}`;
        ctas.append(btnP, btnG);

        text.append(kicker, h1, sub, div, bio, ctas);

        /* card */
        const card = el('div', 'hero-card');
        const frame = el('div', 'hero-frame');
        const avatar = el('div', 'hero-avatar');
        avatar.innerHTML = `
  <img src="foto.jpeg" alt="${t(h.firstName)} ${t(h.lastName)}" class="avatar-img">
  <span class="avatar-label">${t(h.firstName)} ${t(h.lastName)}</span>
`;
        const detail = el('div', 'hero-card-detail');
        h.stats.forEach((s, i) => {
            if (i > 0) detail.append(el('div', 'hero-stat-sep'));
            const stat = el('div', 'hero-stat');
            stat.innerHTML = `<div class="hero-stat-n" data-target="${s.value}">${s.value}</div><div class="hero-stat-l">${t(s.label)}</div>`;
            detail.append(stat);
        });

        const strip = el('div', 'social-strip');
        sl.forEach(s => {
            const a = el('a', 'social-icon');
            a.href = s.url;
            a.target = '_blank';
            a.title = s.label;

            // مثال: تحويل "ico-gh" إلى أيقونة FontAwesome
            let iconClass = '';
            switch (s.icon) {
                case 'ico-gh': iconClass = 'fab fa-github'; break;
                case 'ico-li': iconClass = 'fab fa-linkedin'; break;
                case 'ico-xing': iconClass = 'fab fa-xing'; break;
                case 'ico-credly': iconClass = 'fas fa-award'; break;
                case 'ico-web': iconClass = 'fas fa-globe'; break;
            }

            a.innerHTML = `<i class="${iconClass}"></i>`;
            strip.append(a);
        });

        card.append(frame, avatar, detail, strip);
        inner.append(text, card);
        con.append(inner);
        sec.append(con);
        return sec;
    }

    /* ── build: skills ──────────────────────────────────── */
    function buildSkills() {
        const s = DATA.sections.skills;
        const isRtl = lang === 'ar';
        const sec = el('section', 'section');
        sec.id = `skills-${lang}`;
        const con = el('div', 'container');
        con.append(secHeader(t(s.tag), t(s.title), isRtl ? 'right' : ''));

        const grid = el('div', 'skills-grid');
        s.items.forEach((item, i) => {
            const cell = el('div', `skill-cell reveal d${i + 1}`);
            if (isRtl) cell.style.textAlign = 'right';
            const tags = item.tags.map(tag => `<span class="tag">${t(tag)}</span>`).join('');
            cell.innerHTML = `<span class="skill-icon">${item.icon}</span>
        <div class="skill-title">${t(item.title)}</div>
        <div class="skill-tags">${tags}</div>`;
            grid.append(cell);
        });
        con.append(grid);
        sec.append(con);
        return sec;
    }

    /* ── build: timeline section ────────────────────────── */
    function buildTimeline(key) {
        const s = DATA.sections[key];
        const isRtl = lang === 'ar';
        const sec = el('section', 'section');
        sec.id = `${key === 'experience' ? 'exp' : 'edu'}-${lang}`;
        const con = el('div', 'container');
        con.append(secHeader(t(s.tag), t(s.title), isRtl ? 'right' : ''));
        const rows = el('div', 'timeline-rows');
        s.items.forEach(item => rows.append(timelineRow(item, isRtl)));
        con.append(rows);
        sec.append(con);
        return sec;
    }

    /* ── build: languages ───────────────────────────────── */
    function buildLanguages() {
        const s = DATA.sections.languages;
        const isRtl = lang === 'ar';
        const sec = el('section', 'section');
        sec.id = `lang-${lang}`;
        const con = el('div', 'container');
        con.append(secHeader(t(s.tag), t(s.title), isRtl ? 'right' : ''));
        const grid = el('div', 'lang-grid');
        s.items.forEach((item, i) => {
            const cell = el('div', `lang-cell reveal d${i + 1}`);
            if (isRtl) cell.style.textAlign = 'right';
            cell.innerHTML = `
        <div class="lang-name">${t(item.name)}</div>
        <div class="lang-lv">${t(item.level)}</div>
        <div class="lang-bar-track"><div class="lang-bar-fill" data-w="${item.pct}"></div></div>`;
            grid.append(cell);
        });
        con.append(grid);
        sec.append(con);
        return sec;
    }

    /* ── build: contact ─────────────────────────────────── */
    function buildContact() {
        const cs = DATA.sections.contact;
        const cd = DATA.contact;
        const sl = DATA.socialLinks;
        const f = cs.form;
        const isRtl = lang === 'ar';

        const sec = el('section', 'contact-section');
        sec.id = `contact-${lang}`;
        const con = el('div', 'container');
        const grid = el('div', 'contact-grid');
        if (isRtl) grid.style.direction = 'rtl';

        /* intro */
        const intro = el('div', `contact-intro ${isRtl ? 'reveal-right' : 'reveal-left'}`);
        if (isRtl) intro.style.textAlign = 'right';
        const tag = el('div', 'sec-tag', t(cs.tag));
        const h2 = el('h2', 'sec-h2', t(cs.title));
        const p = el('p', '', t(cs.intro));

        const meta = el('div', 'contact-meta');
        const metaRows = [
            ['📍', t(cd.location)],
            ['📧', `<a href="mailto:${cd.email}" style="color:var(--blue)">${cd.email}</a>`],
            ['🎓', t(cd.degree)],
            ['🌐', t(cd.languages_line)],
        ];
        metaRows.forEach(([icon, content]) => {
            const row = el('div', 'contact-meta-row');
            if (isRtl) row.style.cssText = 'flex-direction:row-reverse;text-align:right';
            row.innerHTML = `<span class="meta-icon">${icon}</span><span>${content}</span>`;
            meta.append(row);
        });

        const social = el('div', 'contact-social');
        if (isRtl) social.style.flexDirection = 'row-reverse';
        sl.forEach(s => {
            const a = el('a', 'soc-btn');
            a.href = s.url;
            a.target = '_blank';
            let iconClass = '';
            switch (s.icon) {
                case 'ico-gh': iconClass = 'fab fa-github'; break;
                case 'ico-li': iconClass = 'fab fa-linkedin'; break;
                case 'ico-xing': iconClass = 'fab fa-xing'; break;
                case 'ico-credly': iconClass = 'fas fa-award'; break;
                case 'ico-web': iconClass = 'fas fa-globe'; break;
            }
            a.innerHTML = `<i class="${iconClass}"></i> ${s.label}`;
            social.append(a);
        });

        intro.append(tag, h2, p, meta, social);

        /* form */
        const formWrap = el('div', `contact-form-wrap ${isRtl ? 'reveal-left' : 'reveal-right'}`);
        if (isRtl) { formWrap.style.direction = 'rtl'; formWrap.style.textAlign = 'right'; }
        const lid = lang;

        formWrap.innerHTML = `
      <div class="form-title">${t(f.title)}</div>
      <div class="form-2col">
        <div class="form-group">
          <label class="form-label">${t(f.nameLbl)}</label>
          <input class="form-control" id="f-${lid}-name" type="text" placeholder="${t(f.namePh)}" ${isRtl ? 'style="text-align:right"' : ''}>
        </div>
        <div class="form-group">
          <label class="form-label">${t(f.emailLbl)}</label>
          <input class="form-control" id="f-${lid}-email" type="email" placeholder="${t(f.emailPh)}" ${isRtl ? 'style="direction:ltr;text-align:left"' : ''}>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${t(f.subjectLbl)}</label>
        <input class="form-control" id="f-${lid}-subject" type="text" placeholder="${t(f.subjectPh)}" ${isRtl ? 'style="text-align:right"' : ''}>
      </div>
      <div class="form-group">
        <label class="form-label">${t(f.messageLbl)}</label>
        <textarea class="form-control" id="f-${lid}-message" rows="5" placeholder="${t(f.messagePh)}" ${isRtl ? 'style="text-align:right"' : ''}></textarea>
      </div>
      <button class="btn-send" id="f-${lid}-btn" onclick="App.sendMail('${lid}')">
        ${sendIcon} ${t(f.send)}
      </button>
      <div class="form-msg" id="f-${lid}-msg"></div>`;

        grid.append(intro, formWrap);
        con.append(grid);
        sec.append(con);
        return sec;
    }

    /* ── build: footer ──────────────────────────────────── */
    function buildFooter() {
        const foot = document.getElementById('site-footer');
        const isRtl = lang === 'ar';
        foot.style.direction = isRtl ? 'rtl' : 'ltr';
        foot.innerHTML = `
      <div class="footer-brand">${t(DATA.footer.name)}</div>
      <span>${t(DATA.footer.copy)}</span>
      <a href="mailto:${DATA.contact.email}">${DATA.contact.email}</a>`;
    }

    /* ── build: nav ─────────────────────────────────────── */
    function buildNav() {
        document.getElementById('nav-mono').textContent = DATA.nav.monogram;
        document.getElementById('nav-name').textContent = t(DATA.nav.name);
    }

    /* ── render all ─────────────────────────────────────── */
    function render() {
        const main = document.getElementById('main');
        main.innerHTML = '';

        main.append(
            buildHero(),
            buildSkills(),
            buildTimeline('experience'),
            buildTimeline('education'),
            buildLanguages(),
            buildContact(),
        );

        buildNav();
        buildFooter();

        /* page meta */
        const m = DATA.meta[lang];
        document.title = m.title;
        document.documentElement.lang = m.lang;
        document.body.dir = m.dir;

        /* lang pills */
        document.querySelectorAll('[data-lang-btn]').forEach(b =>
            b.classList.toggle('active', b.dataset.langBtn === lang));

        /* scroll-reveal observer */
        requestAnimationFrame(() => {
            const io = new IntersectionObserver(entries => {
                entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
            }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
            document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));

            /* counter animation */
            const countIO = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        document.querySelectorAll('.hero-stat-n[data-target]').forEach(el => {
                            const raw = el.dataset.target;
                            const num = parseInt(raw);
                            if (isNaN(num)) return;
                            const suffix = raw.replace(num, '');
                            let start = 0, duration = 1200, step = 16;
                            const inc = num / (duration / step);
                            const timer = setInterval(() => {
                                start += inc;
                                if (start >= num) { start = num; clearInterval(timer); }
                                el.textContent = Math.floor(start) + suffix;
                            }, step);
                        });
                        countIO.disconnect();
                    }
                });
            }, { threshold: .5 });
            document.querySelectorAll('.hero-card-detail').forEach(g => countIO.observe(g));

            const barIO = new IntersectionObserver(entries => {
                entries.forEach(e => { if (e.isIntersecting) animateBars(); });
            }, { threshold: .3 });
            document.querySelectorAll('.lang-grid').forEach(g => barIO.observe(g));
        });
    }

    function animateBars() {
        document.querySelectorAll('.lang-bar-fill').forEach(b => {
            b.style.width = '0';
            requestAnimationFrame(() => setTimeout(() => { b.style.width = (b.dataset.w || 0) + '%'; }, 80));
        });
    }

    /* ── public: setLang ────────────────────────────────── */
    function setLang(l) {
        lang = l;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ── public: toggleTheme ────────────────────────────── */
    function toggleTheme() {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? 'light' : 'dark';
        document.getElementById('themeBtn').textContent = isDark ? '🌙' : '☀️';
    }


    /* ── public: sendMail ───────────────────────────────── */
    function sendMail(l) {
        const f = DATA.sections.contact.form;
        const get = (id) => document.getElementById(`f-${l}-${id}`);
        const btn = get('btn'), msg = get('msg');
        const n = get('name').value.trim(), e = get('email').value.trim(),
            s = get('subject').value.trim(), m = get('message').value.trim();

        msg.className = 'form-msg'; msg.textContent = '';
        if (!n || !e || !s || !m) { msg.className = 'form-msg error'; msg.textContent = t(f.errEmpty); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { msg.className = 'form-msg error'; msg.textContent = t(f.errEmail); return; }

        btn.disabled = true;
        btn.innerHTML = `<svg width="13" height="13"><use href="#ico-send"/></svg> ${t(f.sending)}`;
        btn.textContent = t(f.sending);

        const params = {
            user_name: n,
            user_email: e,
            user_message: m,
            subject: s
        };

        emailjs.send("service_ugra3g3", "template_892atrf", params)
            .then(() => {
                msg.className = 'form-msg success';
                msg.textContent = t(f.success);

                get('name').value = '';
                get('email').value = '';
                get('subject').value = '';
                get('message').value = '';
            })
            .catch((error) => {
                console.error(error);
                msg.className = 'form-msg error';
                msg.textContent = t(f.errSend);
            })
            .finally(() => {
                btn.disabled = false;
                btn.textContent = t(f.send);
            });
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = `<svg width="13" height="13"><use href="#ico-send"/></svg> ${t(f.send)}`;
            msg.className = 'form-msg success'; msg.textContent = t(f.success);
            ['name', 'email', 'subject', 'message'].forEach(id => { get(id).value = ''; });
        }, 1800);
    }

    /* ── init ───────────────────────────────────────────── */
    async function init() {
        try {
            const res = await fetch('data.json');
            DATA = await res.json();
        } catch (err) {
            console.error('Failed to load data.json:', err);
            document.getElementById('loading').innerHTML =
                '<p style="color:red;font-family:monospace">Error loading data.json</p>';
            return;
        }
        render();
        window.addEventListener('scroll', () =>
            document.getElementById('navbar').classList.toggle('scrolled', scrollY > 8));
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
        setTimeout(() => loading.remove(), 500);
    }

    return { init, setLang, toggleTheme, sendMail };
})();

App.init();
