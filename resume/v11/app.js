/**
 * ╔══════════════════════════════════════════════════════════════════╗
 *   LEBENSLAUF PRO – app.js
 *   Professional German CV Builder
 *   Modern MVC Architecture with PDF Export
 * ╚══════════════════════════════════════════════════════════════════╝
 */
'use strict';

/* ═══════════════════════════════════════════════════════════════════
   MODEL
   ═══════════════════════════════════════════════════════════════════ */
const Model = (() => {

  let _data = {
    personalData: {
      firstName:     'Anna',
      lastName:      'Bergmann',
      jobTitle:      'Kaufmännische Leiterin',
      street:        'Rosenthaler Straße 48',
      zip:           '10119',
      city:          'Berlin',
      phone:         '+49 30 8876 5432',
      email:         'anna.bergmann@beispiel.de',
      birthDate:     '12.07.1985',
      birthPlace:    'Hamburg',
      nationality:   'Deutsch',
      maritalStatus: 'verheiratet',
      photo:         '',
    },

    experience: [
      {
        id: 'ex1', dateFrom: '03/2018', dateTo: 'heute',
        position: 'Kaufmännische Leiterin',
        company: 'Berliner Handelsgruppe GmbH', location: 'Berlin',
        bullets: [
          'Verantwortung für Buchhaltung, Controlling und Personalwesen',
          'Führung eines Teams von 18 Mitarbeiterinnen und Mitarbeitern',
          'Reduzierung der Betriebskosten um 22 % durch Prozessoptimierung',
          'Steuerung des Jahresbudgets von 4,5 Mio. Euro',
        ],
      },
      {
        id: 'ex2', dateFrom: '06/2013', dateTo: '02/2018',
        position: 'Abteilungsleiterin Finanzen',
        company: 'Schmidt & Partner KG', location: 'Hamburg',
        bullets: [
          'Aufbau des Finanzreportings und Einführung eines modernen ERP-Systems',
          'Betreuung von Jahresabschlüssen nach HGB',
          'Enge Zusammenarbeit mit Wirtschaftsprüfern und Steuerberatern',
        ],
      },
      {
        id: 'ex3', dateFrom: '09/2009', dateTo: '05/2013',
        position: 'Sachbearbeiterin Rechnungswesen',
        company: 'Nord-West Logistik AG', location: 'Bremen',
        bullets: [
          'Kreditoren- und Debitorenbuchhaltung',
          'Reisekostenabrechnung und Unterstützung im Monatsabschluss',
        ],
      },
    ],

    studium: [
      {
        id: 'st1', dateFrom: '10/2005', dateTo: '09/2009',
        degree: 'Diplom-Betriebswirtin (FH)',
        institution: 'Hochschule Bremen', location: 'Bremen',
        bullets: ['Schwerpunkte: Controlling, Unternehmensfinanzierung, Personalmanagement'],
      },
    ],

    schule: [
      {
        id: 'sc1', dateFrom: '08/1995', dateTo: '06/2005',
        degree: 'Allgemeine Hochschulreife',
        institution: 'Gymnasium Alstertal', location: 'Hamburg',
        bullets: ['Leistungskurse: Mathematik, Wirtschaftslehre; Abiturnote: 1,8'],
      },
    ],

    weiterbildung: [
      {
        id: 'wb1', year: '2021',
        title: 'Zertifizierter Controller (IHK)',
        institution: 'IHK Berlin',
        bullets: [],
      },
      {
        id: 'wb2', year: '2019',
        title: 'Leadership Excellence Program',
        institution: 'Deutsche Management Akademie',
        bullets: ['Dreimonatiges Intensivprogramm für Führungskräfte'],
      },
      {
        id: 'wb3', year: '2017',
        title: 'SAP FI/CO Anwendertraining',
        institution: 'SAP SE',
        bullets: [],
      },
    ],

    languages: [
      { id: 'la1', name: 'Deutsch',  level: 'Muttersprache',          cefr: 'C2' },
      { id: 'la2', name: 'Englisch', level: 'Verhandlungssicher',     cefr: 'C1' },
      { id: 'la3', name: 'Spanisch', level: 'Grundkenntnisse',        cefr: 'A2' },
    ],

    skills: [
      { id: 'sk1', category: 'IT-Anwendungen',   items: 'MS Office (Word, Excel, PowerPoint), SAP FI/CO, DATEV' },
      { id: 'sk2', category: 'Methoden',          items: 'Projektmanagement, Lean Management, Prozessoptimierung' },
      { id: 'sk3', category: 'Führungskompetenzen', items: 'Teamführung, Budgetverantwortung, Mitarbeitergespräche' },
    ],

    additionalInfo: {
      drivingLicense: 'Klasse B',
      hobbies:        'Bergwandern, klassische Musik, Fotografie',
      volunteering:   'Vorstandsmitglied im Kulturverein Mitte e.V. (seit 2017)',
      other:          'Bereitschaft zu gelegentlichen Dienstreisen vorhanden',
    },
  };

  const _subscribers = [];

  function _notify() {
    _subscribers.forEach(fn => fn(_data));
  }

  return {
    getData() { return _data; },

    subscribe(fn) {
      _subscribers.push(fn);
      fn(_data);
    },

    setField(path, value) {
      const keys = path.split('.');
      let obj = _data;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      _notify();
    },

    setPhoto(url) { 
      _data.personalData.photo = url; 
      _notify();
    },

    addEntry(section) {
      const id = section.slice(0, 3) + Date.now();
      const defaults = {
        experience:    { id, dateFrom: '', dateTo: 'heute', position: 'Neue Position', company: '', location: '', bullets: [''] },
        studium:       { id, dateFrom: '', dateTo: '', degree: 'Abschluss', institution: '', location: '', bullets: [''] },
        schule:        { id, dateFrom: '', dateTo: '', degree: 'Abschluss', institution: '', location: '', bullets: [''] },
        weiterbildung: { id, year: '', title: 'Zertifikat', institution: '', bullets: [''] },
        languages:     { id, name: 'Sprache', level: 'Grundkenntnisse', cefr: 'A1' },
        skills:        { id, category: 'Kategorie', items: '' },
      };
      _data[section].push(defaults[section]);
      _notify();
    },

    removeEntry(section, id) {
      _data[section] = _data[section].filter(e => e.id !== id);
      _notify();
    },

    updateEntry(section, id, field, value) {
      const e = _data[section].find(x => x.id === id);
      if (e) {
        if (field === 'bullets') {
          e.bullets = value.split('\n').map(s => s.trim()).filter(Boolean);
        } else {
          e[field] = value;
        }
        _notify();
      }
    },
  };
})();

/* ═══════════════════════════════════════════════════════════════════
   VIEW
   ═══════════════════════════════════════════════════════════════════ */
const View = (() => {

  const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  function bulletsHTML(arr) {
    if (!arr || !arr.length) return '';
    return `<ul class="cv-bullets">${arr.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
  }

  /* ── PAGE HEADER ── */
  function pageHeaderHTML(d, showPhoto, isMobile = false) {
    const photoEl = showPhoto
      ? (d.photo
          ? `<img class="cv-photo" src="${d.photo}" alt="Bewerbungsfoto" />`
          : `<div class="cv-photo-empty">Foto</div>`)
      : '';

    const address = [d.street, (d.zip ? d.zip + ' ' : '') + (d.city || '')].filter(Boolean).join(', ');

    return `
      <div class="cv-page-header">
        <div class="cv-hdr-row">
          <div class="cv-hdr-left">
            <div class="cv-hdr-name">${esc(d.firstName)} ${esc(d.lastName)}</div>
            ${d.jobTitle ? `<div class="cv-hdr-title">${esc(d.jobTitle)}</div>` : ''}
            <div class="cv-hdr-contact">
              ${address ? esc(address) + '<br>' : ''}
              ${d.phone  ? 'Tel.: ' + esc(d.phone) + (d.email ? '&nbsp;&nbsp;|&nbsp;&nbsp;' : '<br>') : ''}
              ${d.email  ? 'E-Mail: ' + esc(d.email) : ''}
            </div>
          </div>
          <div class="cv-hdr-photo">${photoEl}</div>
        </div>
      </div>`;
  }

  const secTitle = t => `<div class="cv-section-title">${t}</div>`;

  function entryRow(dateStr, titleStr, subStr, bullets) {
    return `
      <div class="cv-row">
        <div class="cv-date">${esc(dateStr)}</div>
        <div class="cv-content">
          <div class="cv-content-title">${esc(titleStr)}</div>
          ${subStr ? `<div class="cv-content-sub">${esc(subStr)}</div>` : ''}
          ${bulletsHTML(bullets)}
        </div>
      </div>`;
  }

  /* ── RENDER FULL CV ── */
  function renderCV(data, targetId = 'cv-root') {
    const root = document.getElementById(targetId);
    if (!root) return;

    const d  = data.personalData;
    const ai = data.additionalInfo;

    /* ── PAGE 1 ── */
    const persData = {
      'Geburtsdatum / -ort': [d.birthDate, d.birthPlace].filter(Boolean).join(', '),
      'Nationalität':        d.nationality,
      'Familienstand':       d.maritalStatus,
    };
    const persRows = Object.entries(persData)
      .filter(([,v]) => v)
      .map(([l, v]) => `
        <div class="cv-personal-row">
          <span class="cv-pd-label">${esc(l)}</span>
          <span class="cv-pd-value">${esc(v)}</span>
        </div>`).join('');

    const weiterHTML = data.weiterbildung.map(w =>
      entryRow(esc(w.year), w.title, w.institution, w.bullets)
    ).join('');

    const expHTML = data.experience.map(e =>
      entryRow(
        `${esc(e.dateFrom)}${e.dateFrom||e.dateTo?' – ':''}${esc(e.dateTo)}`,
        e.position,
        `${e.company}${e.location ? ', ' + e.location : ''}`,
        e.bullets
      )
    ).join('');

    const page1Body = `
      ${persRows ? `<div class="cv-section">${secTitle('Persönliche Daten')}<div class="cv-personal-rows">${persRows}</div></div>` : ''}
      ${data.weiterbildung.length ? `<div class="cv-section">${secTitle('Weiterbildung & Zertifikate')}${weiterHTML}</div>` : ''}
      ${data.experience.length    ? `<div class="cv-section">${secTitle('Berufliche Erfahrung')}${expHTML}</div>` : ''}
    `;

    /* ── PAGE 2 ── */
    const studiumHTML = data.studium.map(e =>
      entryRow(
        `${esc(e.dateFrom)}${e.dateFrom||e.dateTo?' – ':''}${esc(e.dateTo)}`,
        e.degree, `${e.institution}${e.location?', '+e.location:''}`, e.bullets
      )
    ).join('');

    const schuleHTML = data.schule.map(e =>
      entryRow(
        `${esc(e.dateFrom)}${e.dateFrom||e.dateTo?' – ':''}${esc(e.dateTo)}`,
        e.degree, `${e.institution}${e.location?', '+e.location:''}`, e.bullets
      )
    ).join('');

    const langRows = data.languages.map(l => `
      <tr>
        <td>${esc(l.name)}</td>
        <td>${esc(l.level)}</td>
        <td>${esc(l.cefr)}</td>
      </tr>`).join('');
    const langTable = `
      <table class="cv-lang-table">
        <thead><tr><th>Sprache</th><th>Niveau</th><th>GER</th></tr></thead>
        <tbody>${langRows}</tbody>
      </table>`;

    const skillRows = data.skills.map(s => `
      <div class="cv-skill-row">
        <span class="cv-skill-cat">${esc(s.category)}</span>
        <span class="cv-skill-val">${esc(s.items)}</span>
      </div>`).join('');

    const addBullets = [
      ai.drivingLicense && `Führerschein: ${ai.drivingLicense}`,
      ai.hobbies        && `Hobbys: ${ai.hobbies}`,
      ai.volunteering   && `Ehrenamt: ${ai.volunteering}`,
      ai.other          && ai.other,
    ].filter(Boolean);

    const page2Body = `
      ${data.studium.length  ? `<div class="cv-section">${secTitle('Studium')}${studiumHTML}</div>` : ''}
      ${data.schule.length   ? `<div class="cv-section">${secTitle('Schulausbildung')}${schuleHTML}</div>` : ''}
      ${data.languages.length? `<div class="cv-section">${secTitle('Sprachen')}${langTable}</div>` : ''}
      ${data.skills.length   ? `<div class="cv-section">${secTitle('Kenntnisse')}<div class="cv-skills-rows">${skillRows}</div></div>` : ''}
      ${addBullets.length    ? `<div class="cv-section">${secTitle('Sonstiges')}${bulletsHTML(addBullets)}</div>` : ''}
    `;

    const html = `
      <div class="cv-page page-1">
        ${pageHeaderHTML(d, true)}
        <div class="cv-page-body">${page1Body}</div>
        <div class="cv-page-number">1 / 2</div>
        <div class="cv-branding">Erstellt mit LebenslaufPro</div>
      </div>
      <div class="cv-page page-2">
        ${pageHeaderHTML(d, false)}
        <div class="cv-page-body">${page2Body}</div>
        <div class="cv-page-number">2 / 2</div>
        <div class="cv-branding">Erstellt mit LebenslaufPro</div>
      </div>
    `;

    root.innerHTML = html;
  }

  /* ── FORM RENDERERS ── */
  function _removeBtn() {
    return `<button class="btn-remove-card" title="Entfernen" aria-label="Entfernen">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  }

  function renderExperienceList(list) {
    const c = document.getElementById('experience-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card';
      d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${esc(e.position || 'Position')} – ${esc(e.company || 'Unternehmen')}</span>
          ${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg"><label>Von</label><input type="text" data-ef="dateFrom" value="${esc(e.dateFrom)}" placeholder="MM/JJJJ" /></div>
            <div class="fg"><label>Bis</label><input type="text" data-ef="dateTo"   value="${esc(e.dateTo)}"   placeholder="heute" /></div>
            <div class="fg full"><label>Position / Berufsbezeichnung</label><input type="text" data-ef="position" value="${esc(e.position)}" /></div>
            <div class="fg full"><label>Unternehmen</label><input type="text" data-ef="company"  value="${esc(e.company)}" /></div>
            <div class="fg full"><label>Ort</label><input type="text" data-ef="location" value="${esc(e.location)}" /></div>
            <div class="fg full"><label>Aufgaben (eine pro Zeile)</label><textarea rows="4" data-ef="bullets" placeholder="Aufgabe 1\nAufgabe 2">${(e.bullets||[]).join('\n')}</textarea></div>
          </div>
        </div>`;
      c.appendChild(d);
    });
  }

  function _eduCard(e, fields) {
    return `
      <div class="list-card-header">
        <span class="card-label">${fields.title || 'Eintrag'}</span>
        ${_removeBtn()}
      </div>
      <div class="list-card-body">
        <div class="fgrid">
          ${fields.hasDate ? `
            <div class="fg"><label>Von</label><input type="text" data-ef="dateFrom" value="${esc(e.dateFrom)}" placeholder="MM/JJJJ" /></div>
            <div class="fg"><label>Bis</label><input type="text" data-ef="dateTo"   value="${esc(e.dateTo)}"   placeholder="MM/JJJJ" /></div>` : `
            <div class="fg full"><label>Jahr</label><input type="text" data-ef="year" value="${esc(e.year)}" placeholder="JJJJ" /></div>`}
          <div class="fg full"><label>${fields.degreeLabel}</label><input type="text" data-ef="${fields.degreeField}" value="${esc(e[fields.degreeField])}" /></div>
          <div class="fg full"><label>Institution</label><input type="text" data-ef="institution" value="${esc(e.institution)}" /></div>
          ${fields.hasLocation ? `<div class="fg full"><label>Ort</label><input type="text" data-ef="location" value="${esc(e.location)}" /></div>` : ''}
          <div class="fg full"><label>Details (eine pro Zeile)</label><textarea rows="3" data-ef="bullets" placeholder="Details...">${(e.bullets||[]).join('\n')}</textarea></div>
        </div>
      </div>`;
  }

  function renderStudiumList(list) {
    const c = document.getElementById('studium-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card';
      d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.degree || 'Abschluss', hasDate: true, degreeLabel: 'Abschluss / Titel', degreeField: 'degree', hasLocation: true });
      c.appendChild(d);
    });
  }

  function renderSchuleList(list) {
    const c = document.getElementById('schule-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card';
      d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.degree || 'Abschluss', hasDate: true, degreeLabel: 'Abschluss / Schulform', degreeField: 'degree', hasLocation: true });
      c.appendChild(d);
    });
  }

  function renderWeiterbildungList(list) {
    const c = document.getElementById('weiterbildung-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card';
      d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.title || 'Zertifikat', hasDate: false, degreeLabel: 'Bezeichnung', degreeField: 'title', hasLocation: false });
      c.appendChild(d);
    });
  }

  function renderLanguagesList(list) {
    const c = document.getElementById('languages-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card';
      d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${esc(e.name)}</span>${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg"><label>Sprache</label><input type="text" data-ef="name" value="${esc(e.name)}" /></div>
            <div class="fg"><label>GER-Niveau</label>
              <select data-ef="cefr" style="border:1.5px solid var(--gray-200);padding:8px 10px;font-size:13px;border-radius:8px;background:#fff;font-family:inherit;width:100%;">
                ${['A1','A2','B1','B2','C1','C2','Muttersprache'].map(v => `<option ${e.cefr===v?'selected':''}>${v}</option>`).join('')}
              </select>
            </div>
            <div class="fg full"><label>Beschreibung</label><input type="text" data-ef="level" value="${esc(e.level)}" placeholder="z.B. Verhandlungssicher" /></div>
          </div>
        </div>`;
      c.appendChild(d);
    });
  }

  function renderSkillsList(list) {
    const c = document.getElementById('skills-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card';
      d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${esc(e.category)}</span>${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg full"><label>Kategorie</label><input type="text" data-ef="category" value="${esc(e.category)}" /></div>
            <div class="fg full"><label>Einträge (kommagetrennt)</label><input type="text" data-ef="items" value="${esc(e.items)}" placeholder="Word, Excel, PowerPoint" /></div>
          </div>
        </div>`;
      c.appendChild(d);
    });
  }

  function fillPersonalForm(data) {
    document.querySelectorAll('[data-field]').forEach(el => {
      const keys = el.dataset.field.split('.');
      let val = data;
      keys.forEach(k => { val = val?.[k]; });
      if (el.value !== (val || '')) el.value = val || '';
    });
    const d = data.personalData;
    const prev = document.getElementById('photo-preview');
    const hint = document.getElementById('photo-placeholder');
    if (prev && hint) {
      if (d.photo) { 
        prev.src = d.photo; 
        prev.classList.remove('hidden'); 
        hint.style.display = 'none'; 
      }
      else { 
        prev.classList.add('hidden'); 
        prev.src = ''; 
        hint.style.display = ''; 
      }
    }
  }

  return {
    renderCV,
    renderAll(data) {
      renderCV(data);
      renderCV(data, 'cv-root-mobile');
      renderExperienceList(data.experience);
      renderStudiumList(data.studium);
      renderSchuleList(data.schule);
      renderWeiterbildungList(data.weiterbildung);
      renderLanguagesList(data.languages);
      renderSkillsList(data.skills);
      fillPersonalForm(data);
    },
    renderExperienceList,
    renderStudiumList,
    renderSchuleList,
    renderWeiterbildungList,
    renderLanguagesList,
    renderSkillsList,
    fillPersonalForm,
  };
})();

/* ═══════════════════════════════════════════════════════════════════
   CONTROLLER
   ═══════════════════════════════════════════════════════════════════ */
const Controller = (() => {

  let _currentZoom = 1;
  const _zoomStep = 0.1;
  const _minZoom = 0.4;
  const _maxZoom = 1.5;

  function applyZoom() {
    const wrap = document.getElementById('preview-scale-wrap');
    if (!wrap) return;
    wrap.style.transform = `scale(${_currentZoom})`;
    wrap.style.transformOrigin = 'top center';
    const level = document.getElementById('zoom-level');
    if (level) level.textContent = Math.round(_currentZoom * 100) + '%';
  }

  function initZoom() {
    document.getElementById('zoom-in')?.addEventListener('click', () => {
      if (_currentZoom < _maxZoom) {
        _currentZoom = Math.round((_currentZoom + _zoomStep) * 10) / 10;
        applyZoom();
      }
    });
    document.getElementById('zoom-out')?.addEventListener('click', () => {
      if (_currentZoom > _minZoom) {
        _currentZoom = Math.round((_currentZoom - _zoomStep) * 10) / 10;
        applyZoom();
      }
    });

    // Auto-fit on load
    const panel = document.querySelector('.preview-panel');
    const wrap = document.getElementById('preview-scale-wrap');
    if (panel && wrap && window.innerWidth > 768) {
      const avail = panel.clientWidth - 60;
      if (avail > 0 && avail < 794) {
        _currentZoom = Math.max(_minZoom, Math.min(1, avail / 794));
        applyZoom();
      }
    }
  }

  function initNav() {
    const nav = document.querySelector('.header-nav');
    if (!nav) return;
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;

      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');

      const section = document.getElementById('section-' + btn.dataset.section);
      if (section) section.classList.add('active');

      // Scroll to top of panel
      const panel = document.querySelector('.panel-scroll');
      if (panel) panel.scrollTop = 0;
    });
  }

  function initPersonalFields() {
    ['section-personal', 'section-additional'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', e => {
        if (!e.target.dataset.field) return;
        Model.setField(e.target.dataset.field, e.target.value);
      });
    });
  }

  function bindDynList(containerId, section, renderFn) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener('input', e => {
      const card = e.target.closest('.list-card');
      if (!card) return;
      const field = e.target.dataset.ef;
      if (!field) return;
      Model.updateEntry(section, card.dataset.id, field, e.target.value);

      const lbl = card.querySelector('.card-label');
      if (lbl) {
        const row = Model.getData()[section].find(x => x.id === card.dataset.id);
        if (row) {
          if (section === 'experience')    lbl.textContent = `${row.position||'Position'} – ${row.company||'Unternehmen'}`;
          if (section === 'studium')       lbl.textContent = row.degree   || 'Abschluss';
          if (section === 'schule')        lbl.textContent = row.degree   || 'Abschluss';
          if (section === 'weiterbildung') lbl.textContent = row.title    || 'Zertifikat';
          if (section === 'languages')     lbl.textContent = row.name     || 'Sprache';
          if (section === 'skills')        lbl.textContent = row.category || 'Kategorie';
        }
      }
    });

    container.addEventListener('change', e => {
      const card = e.target.closest('.list-card');
      if (!card || !e.target.dataset.ef) return;
      Model.updateEntry(section, card.dataset.id, e.target.dataset.ef, e.target.value);
    });

    container.addEventListener('click', e => {
      const btn = e.target.closest('.btn-remove-card');
      if (btn) {
        const card = btn.closest('.list-card');
        Model.removeEntry(section, card.dataset.id);
        renderFn(Model.getData()[section]);
        return;
      }

      // Toggle collapse on header click (but not on remove button)
      const header = e.target.closest('.list-card-header');
      if (header && !e.target.closest('.btn-remove-card')) {
        const card = header.closest('.list-card');
        card.classList.toggle('collapsed');
      }
    });
  }

  function initAddButtons() {
    const map = [
      ['btn-add-experience',    'experience',    View.renderExperienceList],
      ['btn-add-studium',       'studium',       View.renderStudiumList],
      ['btn-add-schule',        'schule',        View.renderSchuleList],
      ['btn-add-weiterbildung', 'weiterbildung', View.renderWeiterbildungList],
      ['btn-add-language',      'languages',     View.renderLanguagesList],
      ['btn-add-skill',         'skills',        View.renderSkillsList],
    ];
    map.forEach(([btnId, section, renderFn]) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', () => {
          Model.addEntry(section);
          renderFn(Model.getData()[section]);
          // Scroll to bottom of list
          const list = document.getElementById(btnId.replace('btn-add-', '') + '-list');
          if (list) {
            setTimeout(() => {
              list.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              list.lastElementChild?.classList.remove('collapsed');
            }, 50);
          }
        });
      }
    });
  }

  function initPhoto() {
    const input = document.getElementById('photo-input');
    const uploadBtn = document.getElementById('btn-upload-photo');
    const removeBtn = document.getElementById('btn-remove-photo');

    if (uploadBtn && input) {
      uploadBtn.addEventListener('click', () => input.click());
    }

    if (input) {
      input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          Model.setPhoto(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        Model.setPhoto('');
        if (input) input.value = '';
      });
    }
  }

  function initPdf() {
    async function generatePDF() {
      const btn = document.getElementById('btn-download');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Wird erstellt...`;
      }

      try {
        const root = document.getElementById('cv-root');
        if (!root) throw new Error('CV root not found');

        const opt = {
          margin:       0,
          filename:     `Lebenslauf_${Model.getData().personalData.lastName || 'Pro'}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, logging: false },
          jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak:    { mode: ['css-class'], cssClass: 'page-2' }
        };

        await html2pdf().set(opt).from(root).save();
      } catch (err) {
        console.error('PDF generation failed:', err);
        // Fallback to print
        window.print();
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> PDF herunterladen`;
        }
      }
    }

    document.getElementById('btn-download')?.addEventListener('click', generatePDF);
    document.getElementById('btn-print-mobile')?.addEventListener('click', generatePDF);
  }

  function initEduTabs() {
    const tabs = document.querySelector('.edu-tabs');
    if (tabs) {
      tabs.addEventListener('click', e => {
        const tab = e.target.closest('.edu-tab');
        if (!tab) return;
        document.querySelectorAll('.edu-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.edu-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.querySelector(`[data-edu-content="${tab.dataset.edu}"]`);
        if (content) content.classList.add('active');
      });
    }
  }

  function initSkillTabs() {
    const tabs = document.querySelector('.skill-tabs');
    if (tabs) {
      tabs.addEventListener('click', e => {
        const tab = e.target.closest('.skill-tab');
        if (!tab) return;
        document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.skill-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.querySelector(`[data-skill-content="${tab.dataset.skill}"]`);
        if (content) content.classList.add('active');
      });
    }
  }

  function initMobilePreview() {
    const fab = document.getElementById('btn-preview-fab');
    const overlay = document.getElementById('mobile-preview-overlay');
    const backBtn = document.getElementById('btn-preview-back');

    if (fab && overlay) {
      fab.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Render mobile CV
        View.renderCV(Model.getData(), 'cv-root-mobile');
      });
    }

    if (backBtn && overlay) {
      backBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  function initTemplate() {
    const select = document.getElementById('template-select');
    const root = document.getElementById('cv-root');
    if (!select || !root) return;

    const STORAGE_KEY = 'cv_template';
    let saved = 'modern';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'modern'; } catch(e) {}
    select.value = saved;
    applyTemplate(saved);

    select.addEventListener('change', () => {
      applyTemplate(select.value);
      try { localStorage.setItem(STORAGE_KEY, select.value); } catch(e) {}
    });
  }

  function applyTemplate(name) {
    const root = document.getElementById('cv-root');
    const mobileRoot = document.getElementById('cv-root-mobile');
    if (root) {
      if (name === 'default') root.removeAttribute('data-template');
      else root.setAttribute('data-template', name);
    }
    if (mobileRoot) {
      if (name === 'default') mobileRoot.removeAttribute('data-template');
      else mobileRoot.setAttribute('data-template', name);
    }
  }

  function initAutoScale() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
          const panel = document.querySelector('.preview-panel');
          const wrap = document.getElementById('preview-scale-wrap');
          if (panel && wrap) {
            const avail = panel.clientWidth - 60;
            if (avail > 0) {
              _currentZoom = Math.max(_minZoom, Math.min(1, avail / 794));
              applyZoom();
            }
          }
        }
      }, 150);
    });
    // Trigger once on load
    window.dispatchEvent(new Event('resize'));
  }

  return {
    init() {
      // Subscribe model to view updates
      Model.subscribe(data => {
        View.renderCV(data);
        View.renderCV(data, 'cv-root-mobile');
      });

      // Initial render
      View.renderAll(Model.getData());

      initNav();
      initPersonalFields();
      initAddButtons();
      initPhoto();
      initPdf();
      initEduTabs();
      initSkillTabs();
      initMobilePreview();
      initTemplate();
      initZoom();
      initAutoScale();

      bindDynList('experience-list',    'experience',    View.renderExperienceList);
      bindDynList('studium-list',       'studium',       View.renderStudiumList);
      bindDynList('schule-list',        'schule',        View.renderSchuleList);
      bindDynList('weiterbildung-list', 'weiterbildung', View.renderWeiterbildungList);
      bindDynList('languages-list',     'languages',     View.renderLanguagesList);
      bindDynList('skills-list',        'skills',        View.renderSkillsList);
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => Controller.init());
