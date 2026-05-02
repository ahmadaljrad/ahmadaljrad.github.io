/**
 * ╔══════════════════════════════════════════════════════════════╗
 *   LEBENSLAUF BUILDER – app.js  (MVC)
 *   CV Layout: German Lebenslauf, A4, 2 pages, ATS-friendly
 *   © aljrad.com
 * ╚══════════════════════════════════════════════════════════════╝
 */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   MODEL
═══════════════════════════════════════════════════════════════ */
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

  return {
    getData() { return _data; },

    setField(path, value) {
      const keys = path.split('.');
      let obj = _data;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
    },

    setPhoto(url) { _data.personalData.photo = url; },

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
    },

    removeEntry(section, id) {
      _data[section] = _data[section].filter(e => e.id !== id);
    },

    updateEntry(section, id, field, value) {
      const e = _data[section].find(x => x.id === id);
      if (e) {
        if (field === 'bullets') {
          e.bullets = value.split('\n').map(s => s.trim()).filter(Boolean);
        } else {
          e[field] = value;
        }
      }
    },
  };
})();

/* ═══════════════════════════════════════════════════════════════
   VIEW
═══════════════════════════════════════════════════════════════ */
const View = (() => {

  /* ── Helpers ── */
  const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  function bulletsHTML(arr) {
    if (!arr || !arr.length) return '';
    return `<ul class="cv-bullets">${arr.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
  }

  /* ── PAGE HEADER (repeated on both pages) ── */
  function pageHeaderHTML(d, showPhoto) {
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

  /* ── SECTION TITLE ── */
  const secTitle = t => `<div class="cv-section-title">${t}</div>`;

  /* ── TWO-COL ENTRY (date | content) ── */
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

  /* ── RENDER FULL CV (2 pages) ── */
  function renderCV(data) {
    const d  = data.personalData;
    const ai = data.additionalInfo;

    /* ───── PAGE 1 ───── */
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

    /* ───── PAGE 2 ───── */
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

    /* Sonstiges bullets */
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

    /* ─ Compose ─ */
    const html = `
      <!-- PAGE 1 -->
      <div class="cv-page page-1">
        ${pageHeaderHTML(d, true)}
        <div class="cv-page-body">${page1Body}</div>
        <div class="cv-page-number">1 / 2</div>
        <div class="cv-branding">Erstellt mit aljrad.com</div>
      </div>

      <!-- PAGE 2 -->
      <div class="cv-page page-2">
        ${pageHeaderHTML(d, false)}
        <div class="cv-page-body">${page2Body}</div>
        <div class="cv-page-number">2 / 2</div>
        <div class="cv-branding">Erstellt mit aljrad.com</div>
      </div>
    `;

    document.getElementById('cv-root').innerHTML = html;
  }

  /* ──── FORM RENDERERS ──── */

  function _removeBtn() {
    return `<button class="btn-remove-card" title="Entfernen">&#x2715;</button>`;
  }

  function renderExperienceList(list) {
    const c = document.getElementById('experience-list');
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${e.position || 'Position'} – ${e.company || 'Unternehmen'}</span>
          ${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg"><label>Von</label><input type="text" data-ef="dateFrom" value="${esc(e.dateFrom)}" placeholder="MM/JJJJ" /></div>
            <div class="fg"><label>Bis</label><input type="text" data-ef="dateTo"   value="${esc(e.dateTo)}"   placeholder="heute" /></div>
            <div class="fg full"><label>Position / Berufsbezeichnung</label><input type="text" data-ef="position" value="${esc(e.position)}" /></div>
            <div class="fg full"><label>Unternehmen</label><input type="text" data-ef="company"  value="${esc(e.company)}" /></div>
            <div class="fg full"><label>Ort</label><input type="text" data-ef="location" value="${esc(e.location)}" /></div>
            <div class="fg full"><label>Aufgaben (eine pro Zeile)</label><textarea rows="4" data-ef="bullets" placeholder="Aufgabe 1&#10;Aufgabe 2">${(e.bullets||[]).join('\n')}</textarea></div>
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
    const c = document.getElementById('studium-list'); c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.degree || 'Abschluss', hasDate: true, degreeLabel: 'Abschluss / Titel', degreeField: 'degree', hasLocation: true });
      c.appendChild(d);
    });
  }

  function renderSchuleList(list) {
    const c = document.getElementById('schule-list'); c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.degree || 'Abschluss', hasDate: true, degreeLabel: 'Abschluss / Schulform', degreeField: 'degree', hasLocation: true });
      c.appendChild(d);
    });
  }

  function renderWeiterbildungList(list) {
    const c = document.getElementById('weiterbildung-list'); c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.title || 'Zertifikat', hasDate: false, degreeLabel: 'Bezeichnung', degreeField: 'title', hasLocation: false });
      c.appendChild(d);
    });
  }

  function renderLanguagesList(list) {
    const c = document.getElementById('languages-list'); c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${esc(e.name)}</span>${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg"><label>Sprache</label><input type="text" data-ef="name" value="${esc(e.name)}" /></div>
            <div class="fg"><label>GER-Niveau</label>
              <select data-ef="cefr" style="border:1px solid #ccc;padding:6px 8px;font-size:12px;border-radius:3px;background:#fff;font-family:Arial,sans-serif;">
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
    const c = document.getElementById('skills-list'); c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
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
      el.value = val || '';
    });
    const d = data.personalData;
    const prev = document.getElementById('photo-preview');
    const hint = document.getElementById('photo-placeholder');
    if (d.photo) { prev.src = d.photo; prev.classList.remove('hidden'); hint.style.display = 'none'; }
    else         { prev.classList.add('hidden'); prev.src = ''; hint.style.display = ''; }
  }

  return {
    renderCV,
    renderAll(data) {
      renderCV(data);
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

/* ═══════════════════════════════════════════════════════════════
   CONTROLLER
═══════════════════════════════════════════════════════════════ */
const Controller = (() => {

  const refresh = () => View.renderCV(Model.getData());

  function initTabs() {
    document.getElementById('form-tabs').addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('section-' + btn.dataset.section).classList.add('active');
    });
  }

  function initPersonalFields() {
    ['section-personal', 'section-additional'].forEach(id => {
      document.getElementById(id).addEventListener('input', e => {
        if (!e.target.dataset.field) return;
        Model.setField(e.target.dataset.field, e.target.value);
        refresh();
      });
    });
  }

  function bindDynList(containerId, section, renderFn) {
    const container = document.getElementById(containerId);

    container.addEventListener('input', e => {
      const card = e.target.closest('.list-card');
      if (!card) return;
      const field = e.target.dataset.ef;
      if (!field) return;
      Model.updateEntry(section, card.dataset.id, field, e.target.value);
      /* Live label update */
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
      refresh();
    });

    container.addEventListener('change', e => {
      const card = e.target.closest('.list-card');
      if (!card || !e.target.dataset.ef) return;
      Model.updateEntry(section, card.dataset.id, e.target.dataset.ef, e.target.value);
      refresh();
    });

    container.addEventListener('click', e => {
      const btn = e.target.closest('.btn-remove-card');
      if (!btn) return;
      const card = btn.closest('.list-card');
      Model.removeEntry(section, card.dataset.id);
      renderFn(Model.getData()[section]);
      refresh();
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
      document.getElementById(btnId).addEventListener('click', () => {
        Model.addEntry(section);
        renderFn(Model.getData()[section]);
        refresh();
      });
    });
  }

  function initPhoto() {
    const input = document.getElementById('photo-input');
    document.getElementById('btn-upload-photo').addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        Model.setPhoto(ev.target.result);
        View.fillPersonalForm(Model.getData());
        refresh();
      };
      reader.readAsDataURL(file);
    });
    document.getElementById('btn-remove-photo').addEventListener('click', () => {
      Model.setPhoto('');
      View.fillPersonalForm(Model.getData());
      input.value = '';
      refresh();
    });
  }

  function initPdf() {
    document.getElementById('btn-download').addEventListener('click', () => {
      // Clear any overflow lock before printing so all pages render
      const prev = document.body.style.overflow;
      document.body.style.overflow = '';
      window.print();
      if (prev) setTimeout(() => { document.body.style.overflow = prev; }, 500);
    });
  }

  function initScale() {
    function scale() {
      const wrap  = document.getElementById('preview-scale-wrap');
      const panel = document.querySelector('.preview-panel');
      if (!wrap || !panel) return;

      // Skip scaling on mobile — panel may be display:none (clientWidth=0)
      if (window.innerWidth <= 768) {
        wrap.style.transform  = '';
        wrap.style.marginBottom = '';
        return;
      }

      const avail = panel.clientWidth - 40;
      if (avail <= 0) return;                // guard against hidden panel
      const s = Math.min(1, avail / 794);
      wrap.style.transform       = `scale(${s})`;
      wrap.style.transformOrigin = 'top center';

      // Compensate height; clamp to 0 so it never collapses
      const naturalH = wrap.scrollHeight / s;
      const compensation = naturalH * (1 - s);
      wrap.style.marginBottom = compensation > 0 ? `-${compensation}px` : '';
    }
    scale();
    window.addEventListener('resize', scale);
  }

  return {
    init() {
      View.renderAll(Model.getData());
      initTabs();
      initPersonalFields();
      initAddButtons();
      initPhoto();
      initPdf();
      initScale();
      bindDynList('experience-list',    'experience',    View.renderExperienceList);
      bindDynList('studium-list',       'studium',       View.renderStudiumList);
      bindDynList('schule-list',        'schule',        View.renderSchuleList);
      bindDynList('weiterbildung-list', 'weiterbildung', View.renderWeiterbildungList);
      bindDynList('languages-list',     'languages',     View.renderLanguagesList);
      bindDynList('skills-list',        'skills',        View.renderSkillsList);
      TemplateController.init();
      MobilePreview.init();
    },
  };
})();


/* ═══════════════════════════════════════════════════════════════
   TEMPLATE CONTROLLER
   Applies a data-template attribute to #cv-root so all CSS
   template overrides are scoped and isolated. Zero DOM rebuild —
   the attribute change alone triggers the CSS cascade.
═══════════════════════════════════════════════════════════════ */
const TemplateController = (() => {

  const ROOT_ID  = 'cv-root';
  const SELECT_ID = 'template-select';
  const STORAGE_KEY = 'cv_template';

  /* Templates declared here keep JS and CSS in sync */
  const TEMPLATES = {
    default:   'Standard',
    classic:   'Klassisch',
    modern:    'Modern',
    compact:   'Kompakt',
    executive: 'Executive',
  };

  function apply(name) {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    if (name === 'default') {
      root.removeAttribute('data-template');
    } else {
      root.setAttribute('data-template', name);
    }
    try { localStorage.setItem(STORAGE_KEY, name); } catch(e) {}
  }

  function init() {
    const select = document.getElementById(SELECT_ID);
    if (!select) return;

    /* Restore last-used template; default is 'modern' per product requirement */
    let saved = 'modern';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'modern'; } catch(e) {}
    if (!TEMPLATES[saved]) saved = 'modern';
    select.value = saved;
    apply(saved);

    /* Live switching — no page rebuild needed */
    select.addEventListener('change', () => {
      apply(select.value);
    });
  }

  return { init, apply };
})();


/* ═══════════════════════════════════════════════════════════════
   MOBILE PREVIEW CONTROLLER
   Toggles fullscreen preview panel on mobile (<= 768px).
   On desktop this is a no-op — the preview is always visible.
═══════════════════════════════════════════════════════════════ */
const MobilePreview = (() => {

  const MOBILE_BP = 768;

  function isMobile() { return window.innerWidth <= MOBILE_BP; }

  function show() {
    const panel = document.getElementById('preview-panel');
    if (panel) {
      panel.classList.add('mobile-visible');
      panel.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      // Dispatch resize so initScale can recalculate if needed
      window.dispatchEvent(new Event('resize'));
    }
  }

  function hide() {
    const panel = document.getElementById('preview-panel');
    if (panel) {
      panel.classList.remove('mobile-visible');
      document.body.style.overflow = '';
    }
  }

  function init() {
    /* FAB — show preview */
    const fab = document.getElementById('btn-preview-fab');
    if (fab) fab.addEventListener('click', show);

    /* Back button inside preview bar */
    const back = document.getElementById('btn-preview-back');
    if (back) back.addEventListener('click', hide);

    /* PDF button in mobile bar — clear mobile overflow lock before printing */
    const printBtn = document.getElementById('btn-print-mobile');
    if (printBtn) printBtn.addEventListener('click', () => {
      const wasLocked = document.body.style.overflow === 'hidden';
      document.body.style.overflow = '';
      window.print();
      // Restore lock after print dialog closes (setTimeout ensures dialog has opened)
      if (wasLocked) setTimeout(() => { document.body.style.overflow = 'hidden'; }, 500);
    });

    /* On resize to desktop: remove mobile-visible class so layout resets */
    window.addEventListener('resize', () => {
      if (!isMobile()) hide();
    });
  }

  return { init, show, hide };
})();

document.addEventListener('DOMContentLoaded', () => Controller.init());
