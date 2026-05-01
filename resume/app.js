/**
 * ╔══════════════════════════════════════════════════════════════╗
 *   LEBENSLAUF BUILDER – app.js
 *   Architecture: MVC (Model / View / Controller)
 *   © aljrad.com
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   ██████  MODEL
   ═══════════════════════════════════════════════════════════════ */
const Model = (() => {

  /* ── Default data (generic, non-IT) ── */
  let _data = {
    personalData: {
      firstName:     'Anna',
      lastName:      'Bergmann',
      jobTitle:      'Kaufmännische Leiterin',
      address:       'Rosenthaler Straße 48, 10119 Berlin',
      phone:         '+49 30 8876 5432',
      email:         'anna.bergmann@beispiel.de',
      birthDate:     '12.07.1985',
      birthPlace:    'Hamburg',
      nationality:   'Deutsch',
      maritalStatus: 'verheiratet',
      website:       'linkedin.com/in/anna-bergmann',
      summary:       'Erfahrene Führungskraft mit über 14 Jahren in kaufmännischer Leitung und strategischem Management. Nachgewiesene Kompetenz in Teamführung, Prozessoptimierung und nachhaltigem Unternehmenswachstum.',
      photo:         '',
    },

    experience: [
      {
        id:          'exp1',
        dateFrom:    '2018',
        dateTo:      'heute',
        position:    'Kaufmännische Leiterin',
        company:     'Berliner Handelsgruppe GmbH',
        location:    'Berlin',
        description: 'Verantwortung für Buchhaltung, Controlling und Personalwesen. Führung eines Teams von 18 Mitarbeitern. Reduzierung der Betriebskosten um 22 % durch Prozessoptimierung.',
      },
      {
        id:          'exp2',
        dateFrom:    '2013',
        dateTo:      '2018',
        position:    'Abteilungsleiterin Finanzen',
        company:     'Schmidt & Partner KG',
        location:    'Hamburg',
        description: 'Aufbau des Finanzreportings und Einführung eines modernen ERP-Systems. Betreuung von Jahresabschlüssen und enge Zusammenarbeit mit Wirtschaftsprüfern.',
      },
      {
        id:          'exp3',
        dateFrom:    '2009',
        dateTo:      '2013',
        position:    'Sachbearbeiterin Rechnungswesen',
        company:     'Nord-West Logistik AG',
        location:    'Bremen',
        description: 'Kreditoren- und Debitorenbuchhaltung, Reisekostenabrechnung sowie Unterstützung im Monatsabschluss.',
      },
    ],

    education: [
      {
        id:          'edu1',
        dateFrom:    '2005',
        dateTo:      '2009',
        degree:      'Diplom Betriebswirtschaft (FH)',
        institution: 'Hochschule Bremen',
        location:    'Bremen',
        description: 'Schwerpunkte: Controlling, Unternehmensfinanzierung, Personalmanagement',
      },
      {
        id:          'edu2',
        dateFrom:    '2001',
        dateTo:      '2005',
        degree:      'Allgemeine Hochschulreife',
        institution: 'Gymnasium Alstertal',
        location:    'Hamburg',
        description: 'Leistungskurse: Mathematik, Wirtschaftslehre',
      },
    ],

    skills: [
      { id: 'sk1', name: 'Unternehmensführung',   level: 5 },
      { id: 'sk2', name: 'Finanzcontrolling',      level: 5 },
      { id: 'sk3', name: 'SAP & ERP-Systeme',      level: 4 },
      { id: 'sk4', name: 'Projektmanagement',       level: 4 },
      { id: 'sk5', name: 'MS Office (Excel/Word)',  level: 5 },
      { id: 'sk6', name: 'Verhandlungsführung',     level: 4 },
    ],

    languages: [
      { id: 'la1', name: 'Deutsch',   level: 'Muttersprache' },
      { id: 'la2', name: 'Englisch',  level: 'Verhandlungssicher (C1)' },
      { id: 'la3', name: 'Spanisch',  level: 'Grundkenntnisse (A2)' },
    ],

    certifications: [
      {
        id:          'cert1',
        year:        '2021',
        title:       'Zertifizierter Controller (IHK)',
        institution: 'IHK Berlin',
        description: '',
      },
      {
        id:          'cert2',
        year:        '2019',
        title:       'Leadership Excellence Program',
        institution: 'Deutsche Management Akademie',
        description: 'Dreimonatiges Intensivprogramm für Führungskräfte',
      },
    ],

    additionalInfo: {
      drivingLicense: 'Klasse B',
      hobbies:        'Bergwandern, klassische Musik, ehrenamtliche Buchführung für lokale Vereine',
      volunteering:   'Vorstandsmitglied im Kulturverein Mitte e.V. (seit 2017)',
      other:          'Bereitschaft zu gelegentlichen Dienstreisen',
    },
  };

  /* ── Public API ── */
  return {
    getData() { return _data; },

    setField(path, value) {
      const keys = path.split('.');
      let obj = _data;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
    },

    setPhoto(dataUrl) { _data.personalData.photo = dataUrl; },

    addEntry(section) {
      const id = section.slice(0, 3) + Date.now();
      const map = {
        experience:    { id, dateFrom: '', dateTo: '', position: 'Neue Position', company: '', location: '', description: '' },
        education:     { id, dateFrom: '', dateTo: '', degree:   'Abschluss',     institution: '', location: '', description: '' },
        skills:        { id, name: 'Fähigkeit', level: 3 },
        languages:     { id, name: 'Sprache',   level: 'Grundkenntnisse' },
        certifications:{ id, year: '', title: 'Zertifikat', institution: '', description: '' },
      };
      _data[section].push(map[section]);
      return id;
    },

    removeEntry(section, id) {
      _data[section] = _data[section].filter(e => e.id !== id);
    },

    updateEntry(section, id, field, value) {
      const entry = _data[section].find(e => e.id === id);
      if (entry) entry[field] = (field === 'level' && section === 'skills') ? Number(value) : value;
    },
  };

})();

/* ═══════════════════════════════════════════════════════════════
   ██████  VIEW
   ═══════════════════════════════════════════════════════════════ */
const View = (() => {

  /* ── Icon helpers ── */
  const icons = {
    phone:    `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.17 3.37a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    email:    `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    web:      `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    cake:     `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>`,
  };

  function _levelLabel(n) {
    return ['', 'Grundkenntnisse', 'Gute Kenntnisse', 'Fortgeschritten', 'Sehr gut', 'Experte'][n] || '';
  }

  function _safe(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ──────────────── CV PREVIEW ──────────────── */
  function renderCV(data) {
    const d = data.personalData;
    const photo = d.photo
      ? `<img class="cv-photo-img" src="${d.photo}" alt="Bewerbungsfoto" />`
      : `<div class="cv-photo-placeholder">Kein Foto</div>`;

    const contactItems = [
      d.phone    && `<span class="cv-contact-item">${icons.phone}${_safe(d.phone)}</span>`,
      d.email    && `<span class="cv-contact-item">${icons.email}${_safe(d.email)}</span>`,
      d.address  && `<span class="cv-contact-item">${icons.location}${_safe(d.address)}</span>`,
      d.website  && `<span class="cv-contact-item">${icons.web}${_safe(d.website)}</span>`,
    ].filter(Boolean).join('');

    const summary = d.summary
      ? `<div class="cv-summary">${_safe(d.summary)}</div>` : '';

    /* Personal data table */
    const personalRows = [
      d.birthDate    && `<span class="cv-pt-label">Geburtsdatum</span><span class="cv-pt-value">${_safe(d.birthDate)}${d.birthPlace ? ', ' + _safe(d.birthPlace) : ''}</span>`,
      d.nationality  && `<span class="cv-pt-label">Nationalität</span><span class="cv-pt-value">${_safe(d.nationality)}</span>`,
      d.maritalStatus&& `<span class="cv-pt-label">Familienstand</span><span class="cv-pt-value">${_safe(d.maritalStatus)}</span>`,
    ].filter(Boolean).join('');

    /* Experience */
    const expHTML = data.experience.map(e => `
      <div class="cv-entry">
        <div class="cv-entry-date">${_safe(e.dateFrom)}${e.dateFrom||e.dateTo ? ' – ' : ''}${_safe(e.dateTo)}</div>
        <div class="cv-entry-content">
          <div class="cv-entry-title">${_safe(e.position)}</div>
          <div class="cv-entry-sub">${_safe(e.company)}${e.location ? ', ' + _safe(e.location) : ''}</div>
          ${e.description ? `<div class="cv-entry-desc">${_safe(e.description)}</div>` : ''}
        </div>
      </div>`).join('');

    /* Education */
    const eduHTML = data.education.map(e => `
      <div class="cv-entry">
        <div class="cv-entry-date">${_safe(e.dateFrom)}${e.dateFrom||e.dateTo ? ' – ' : ''}${_safe(e.dateTo)}</div>
        <div class="cv-entry-content">
          <div class="cv-entry-title">${_safe(e.degree)}</div>
          <div class="cv-entry-sub">${_safe(e.institution)}${e.location ? ', ' + _safe(e.location) : ''}</div>
          ${e.description ? `<div class="cv-entry-desc">${_safe(e.description)}</div>` : ''}
        </div>
      </div>`).join('');

    /* Skills */
    const skillsHTML = `<div class="cv-skills-grid">${
      data.skills.map(s => `
        <div class="cv-skill-item">
          <div class="cv-skill-label">
            <span class="cv-skill-name">${_safe(s.name)}</span>
            <span class="cv-skill-level">${_levelLabel(s.level)}</span>
          </div>
          <div class="cv-skill-bar"><div class="cv-skill-fill" style="width:${(s.level/5)*100}%"></div></div>
        </div>`).join('')
    }</div>`;

    /* Languages */
    const langHTML = `<div class="cv-lang-list">${
      data.languages.map(l => `
        <div class="cv-lang-chip">
          <span class="cv-lang-name">${_safe(l.name)}</span>
          <span class="cv-lang-level">· ${_safe(l.level)}</span>
        </div>`).join('')
    }</div>`;

    /* Certifications */
    const certHTML = data.certifications.map(c => `
      <div class="cv-entry">
        <div class="cv-entry-date">${_safe(c.year)}</div>
        <div class="cv-entry-content">
          <div class="cv-entry-title">${_safe(c.title)}</div>
          <div class="cv-entry-sub">${_safe(c.institution)}</div>
          ${c.description ? `<div class="cv-entry-desc">${_safe(c.description)}</div>` : ''}
        </div>
      </div>`).join('');

    /* Additional info */
    const ai = data.additionalInfo;
    const addRows = [
      ai.drivingLicense && `<div class="cv-add-item"><span class="cv-add-label">Führerschein</span><span class="cv-add-value">${_safe(ai.drivingLicense)}</span></div>`,
      ai.hobbies        && `<div class="cv-add-item"><span class="cv-add-label">Interessen</span><span class="cv-add-value">${_safe(ai.hobbies)}</span></div>`,
      ai.volunteering   && `<div class="cv-add-item"><span class="cv-add-label">Ehrenamt</span><span class="cv-add-value">${_safe(ai.volunteering)}</span></div>`,
      ai.other          && `<div class="cv-add-item"><span class="cv-add-label">Sonstiges</span><span class="cv-add-value">${_safe(ai.other)}</span></div>`,
    ].filter(Boolean).join('');

    /* Compose */
    const html = `
      <!-- HEADER -->
      <div class="cv-header-bar">
        <div class="cv-header-left">
          <div class="cv-header-name">${_safe(d.firstName)} ${_safe(d.lastName)}</div>
          ${d.jobTitle ? `<div class="cv-header-title">${_safe(d.jobTitle)}</div>` : ''}
          <div class="cv-header-contact">${contactItems}</div>
        </div>
        <div class="cv-header-photo">${photo}</div>
      </div>

      <!-- BODY -->
      <div class="cv-body">
        <div class="cv-gold-line"></div>
        ${summary}

        ${personalRows ? `
        <div class="cv-section">
          <div class="cv-section-heading">Persönliche Daten</div>
          <div class="cv-personal-table">${personalRows}</div>
        </div>` : ''}

        ${data.experience.length ? `
        <div class="cv-section">
          <div class="cv-section-heading">Berufserfahrung</div>
          ${expHTML}
        </div>` : ''}

        ${data.education.length ? `
        <div class="cv-section">
          <div class="cv-section-heading">Ausbildung</div>
          ${eduHTML}
        </div>` : ''}

        ${data.certifications.length ? `
        <div class="cv-section">
          <div class="cv-section-heading">Weiterbildung &amp; Zertifikate</div>
          ${certHTML}
        </div>` : ''}

        ${data.skills.length ? `
        <div class="cv-section">
          <div class="cv-section-heading">Fähigkeiten</div>
          ${skillsHTML}
        </div>` : ''}

        ${data.languages.length ? `
        <div class="cv-section">
          <div class="cv-section-heading">Sprachen</div>
          ${langHTML}
        </div>` : ''}

        ${addRows ? `
        <div class="cv-section">
          <div class="cv-section-heading">Sonstiges</div>
          <div class="cv-additional-list">${addRows}</div>
        </div>` : ''}
      </div>

      <!-- BRANDING -->
      <div class="cv-branding">Erstellt mit aljrad.com</div>
    `;

    document.getElementById('cv-preview').innerHTML = html;
  }

  /* ──────────────── FORM: DYNAMIC LISTS ──────────────── */

  function renderExperienceList(list) {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';
    list.forEach(e => {
      const el = document.createElement('div');
      el.className = 'list-item';
      el.dataset.id = e.id;
      el.innerHTML = `
        <div class="list-item-header">
          <span class="item-title-text">${e.position || 'Position'} – ${e.company || 'Unternehmen'}</span>
          <div class="item-controls">
            <button class="btn-icon btn-remove" title="Löschen">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
        <div class="item-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Von</label>
              <input type="text" data-entry-field="dateFrom" value="${e.dateFrom}" placeholder="2020" />
            </div>
            <div class="form-group">
              <label>Bis</label>
              <input type="text" data-entry-field="dateTo" value="${e.dateTo}" placeholder="heute" />
            </div>
            <div class="form-group full">
              <label>Position</label>
              <input type="text" data-entry-field="position" value="${e.position}" placeholder="Berufsbezeichnung" />
            </div>
            <div class="form-group full">
              <label>Unternehmen</label>
              <input type="text" data-entry-field="company" value="${e.company}" placeholder="Firma GmbH" />
            </div>
            <div class="form-group full">
              <label>Ort</label>
              <input type="text" data-entry-field="location" value="${e.location}" placeholder="Berlin" />
            </div>
            <div class="form-group full">
              <label>Beschreibung</label>
              <textarea rows="3" data-entry-field="description" placeholder="Aufgaben und Erfolge...">${e.description}</textarea>
            </div>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }

  function renderEducationList(list) {
    const container = document.getElementById('education-list');
    container.innerHTML = '';
    list.forEach(e => {
      const el = document.createElement('div');
      el.className = 'list-item';
      el.dataset.id = e.id;
      el.innerHTML = `
        <div class="list-item-header">
          <span class="item-title-text">${e.degree || 'Abschluss'} – ${e.institution || 'Institution'}</span>
          <div class="item-controls">
            <button class="btn-icon btn-remove" title="Löschen">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
        <div class="item-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Von</label>
              <input type="text" data-entry-field="dateFrom" value="${e.dateFrom}" placeholder="2015" />
            </div>
            <div class="form-group">
              <label>Bis</label>
              <input type="text" data-entry-field="dateTo" value="${e.dateTo}" placeholder="2019" />
            </div>
            <div class="form-group full">
              <label>Abschluss / Titel</label>
              <input type="text" data-entry-field="degree" value="${e.degree}" placeholder="Bachelor of Science" />
            </div>
            <div class="form-group full">
              <label>Institution</label>
              <input type="text" data-entry-field="institution" value="${e.institution}" placeholder="Universität München" />
            </div>
            <div class="form-group full">
              <label>Ort</label>
              <input type="text" data-entry-field="location" value="${e.location}" placeholder="München" />
            </div>
            <div class="form-group full">
              <label>Beschreibung</label>
              <textarea rows="2" data-entry-field="description" placeholder="Schwerpunkte, Auszeichnungen...">${e.description}</textarea>
            </div>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }

  function renderSkillsList(list) {
    const container = document.getElementById('skills-list');
    container.innerHTML = '';
    list.forEach(s => {
      const el = document.createElement('div');
      el.className = 'list-item';
      el.dataset.id = s.id;
      el.innerHTML = `
        <div class="list-item-header">
          <span class="item-title-text">${s.name || 'Fähigkeit'}</span>
          <div class="item-controls">
            <button class="btn-icon btn-remove" title="Löschen">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
        <div class="item-body">
          <div class="form-grid">
            <div class="form-group full">
              <label>Bezeichnung</label>
              <input type="text" data-entry-field="name" value="${s.name}" placeholder="z.B. Projektmanagement" />
            </div>
            <div class="form-group full">
              <label>Niveau (1–5)</label>
              <input type="range" data-entry-field="level" min="1" max="5" value="${s.level}" style="width:100%;accent-color:var(--clr-accent);" />
              <small style="color:var(--clr-muted);font-size:11px;">Aktuell: ${['','Grundkenntnisse','Gute Kenntnisse','Fortgeschritten','Sehr gut','Experte'][s.level]}</small>
            </div>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }

  function renderLanguagesList(list) {
    const container = document.getElementById('languages-list');
    container.innerHTML = '';
    list.forEach(l => {
      const el = document.createElement('div');
      el.className = 'list-item';
      el.dataset.id = l.id;
      el.innerHTML = `
        <div class="list-item-header">
          <span class="item-title-text">${l.name || 'Sprache'}</span>
          <div class="item-controls">
            <button class="btn-icon btn-remove" title="Löschen">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
        <div class="item-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Sprache</label>
              <input type="text" data-entry-field="name" value="${l.name}" placeholder="Englisch" />
            </div>
            <div class="form-group">
              <label>Niveau</label>
              <input type="text" data-entry-field="level" value="${l.level}" placeholder="Verhandlungssicher (C1)" />
            </div>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }

  function renderCertificationsList(list) {
    const container = document.getElementById('certifications-list');
    container.innerHTML = '';
    list.forEach(c => {
      const el = document.createElement('div');
      el.className = 'list-item';
      el.dataset.id = c.id;
      el.innerHTML = `
        <div class="list-item-header">
          <span class="item-title-text">${c.title || 'Zertifikat'}</span>
          <div class="item-controls">
            <button class="btn-icon btn-remove" title="Löschen">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
        <div class="item-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Jahr</label>
              <input type="text" data-entry-field="year" value="${c.year}" placeholder="2023" />
            </div>
            <div class="form-group">
              <label>Institution</label>
              <input type="text" data-entry-field="institution" value="${c.institution}" placeholder="IHK / Hochschule" />
            </div>
            <div class="form-group full">
              <label>Titel</label>
              <input type="text" data-entry-field="title" value="${c.title}" placeholder="Zertifikatsbezeichnung" />
            </div>
            <div class="form-group full">
              <label>Beschreibung</label>
              <textarea rows="2" data-entry-field="description" placeholder="Kurze Beschreibung...">${c.description}</textarea>
            </div>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }

  /* ──────────────── FILL PERSONAL FORM ──────────────── */
  function fillPersonalForm(data) {
    const d = data.personalData;
    document.querySelectorAll('[data-field]').forEach(el => {
      const path = el.dataset.field;
      const keys = path.split('.');
      let val = data;
      keys.forEach(k => { val = val ? val[k] : ''; });
      el.value = val || '';
    });

    /* Photo */
    const preview = document.getElementById('photo-preview');
    const placeholder = document.getElementById('photo-placeholder');
    if (d.photo) {
      preview.src = d.photo;
      preview.classList.remove('hidden');
      placeholder.style.display = 'none';
    } else {
      preview.classList.add('hidden');
      placeholder.style.display = '';
    }
  }

  /* ──────────────── PUBLIC ──────────────── */
  return {
    renderCV,
    renderAll(data) {
      renderCV(data);
      renderExperienceList(data.experience);
      renderEducationList(data.education);
      renderSkillsList(data.skills);
      renderLanguagesList(data.languages);
      renderCertificationsList(data.certifications);
      fillPersonalForm(data);
    },
    renderExperienceList,
    renderEducationList,
    renderSkillsList,
    renderLanguagesList,
    renderCertificationsList,
    fillPersonalForm,
  };

})();

/* ═══════════════════════════════════════════════════════════════
   ██████  CONTROLLER
   ═══════════════════════════════════════════════════════════════ */
const Controller = (() => {

  function _refresh() {
    View.renderCV(Model.getData());
  }

  /* ── Tab switching ── */
  function _initTabs() {
    document.getElementById('form-tabs').addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('section-' + btn.dataset.section).classList.add('active');
    });
  }

  /* ── Personal data: direct field binding ── */
  function _initPersonalFields() {
    document.getElementById('section-personal').addEventListener('input', e => {
      const el = e.target;
      if (!el.dataset.field) return;
      Model.setField(el.dataset.field, el.value);
      _refresh();
    });

    document.getElementById('section-additional').addEventListener('input', e => {
      const el = e.target;
      if (!el.dataset.field) return;
      Model.setField(el.dataset.field, el.value);
      _refresh();
    });
  }

  /* ── Dynamic list helper ── */
  function _bindDynamicList(containerId, section, renderFn) {
    document.getElementById(containerId).addEventListener('input', e => {
      const item = e.target.closest('.list-item');
      if (!item) return;
      const field = e.target.dataset.entryField;
      if (!field) return;
      Model.updateEntry(section, item.dataset.id, field, e.target.value);
      // Update label live
      const titleEl = item.querySelector('.item-title-text');
      if (titleEl) {
        const data = Model.getData()[section].find(x => x.id === item.dataset.id);
        if (data) {
          if (section === 'experience')     titleEl.textContent = `${data.position || 'Position'} – ${data.company || 'Unternehmen'}`;
          if (section === 'education')      titleEl.textContent = `${data.degree || 'Abschluss'} – ${data.institution || 'Institution'}`;
          if (section === 'skills')         { titleEl.textContent = data.name || 'Fähigkeit'; item.querySelector('small').textContent = 'Aktuell: ' + (['','Grundkenntnisse','Gute Kenntnisse','Fortgeschritten','Sehr gut','Experte'][data.level]||''); }
          if (section === 'languages')      titleEl.textContent = data.name || 'Sprache';
          if (section === 'certifications') titleEl.textContent = data.title || 'Zertifikat';
        }
      }
      _refresh();
    });

    document.getElementById(containerId).addEventListener('click', e => {
      const removeBtn = e.target.closest('.btn-remove');
      if (!removeBtn) return;
      const item = removeBtn.closest('.list-item');
      Model.removeEntry(section, item.dataset.id);
      renderFn(Model.getData()[section]);
      _refresh();
    });
  }

  /* ── Add buttons ── */
  function _initAddButtons() {
    document.getElementById('btn-add-experience').addEventListener('click', () => {
      Model.addEntry('experience');
      View.renderExperienceList(Model.getData().experience);
      _refresh();
    });
    document.getElementById('btn-add-education').addEventListener('click', () => {
      Model.addEntry('education');
      View.renderEducationList(Model.getData().education);
      _refresh();
    });
    document.getElementById('btn-add-skill').addEventListener('click', () => {
      Model.addEntry('skills');
      View.renderSkillsList(Model.getData().skills);
      _refresh();
    });
    document.getElementById('btn-add-language').addEventListener('click', () => {
      Model.addEntry('languages');
      View.renderLanguagesList(Model.getData().languages);
      _refresh();
    });
    document.getElementById('btn-add-certification').addEventListener('click', () => {
      Model.addEntry('certifications');
      View.renderCertificationsList(Model.getData().certifications);
      _refresh();
    });
  }

  /* ── Photo upload ── */
  function _initPhotoUpload() {
    const input     = document.getElementById('photo-input');
    const preview   = document.getElementById('photo-preview');
    const placeholder = document.getElementById('photo-placeholder');

    document.getElementById('btn-upload-photo').addEventListener('click', () => input.click());

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const url = ev.target.result;
        Model.setPhoto(url);
        preview.src = url;
        preview.classList.remove('hidden');
        placeholder.style.display = 'none';
        _refresh();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('btn-remove-photo').addEventListener('click', () => {
      Model.setPhoto('');
      preview.classList.add('hidden');
      preview.src = '';
      placeholder.style.display = '';
      input.value = '';
      _refresh();
    });
  }

  /* ── PDF Download ── */
  function _initPdfDownload() {
    document.getElementById('btn-download').addEventListener('click', () => {
      const el = document.getElementById('cv-preview');
      const d  = Model.getData().personalData;
      const name = `${d.firstName}_${d.lastName}_Lebenslauf`.replace(/\s+/g, '_');

      const opt = {
        margin:      0,
        filename:    `${name}.pdf`,
        image:       { type: 'jpeg', quality: 0.97 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      const btn = document.getElementById('btn-download');
      btn.textContent = 'Wird erstellt…';
      btn.disabled = true;

      html2pdf().set(opt).from(el).save().then(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Als PDF speichern`;
        btn.disabled = false;
      });
    });
  }

  /* ── INIT ── */
  function init() {
    /* Initial render */
    View.renderAll(Model.getData());

    _initTabs();
    _initPersonalFields();
    _initAddButtons();
    _initPhotoUpload();
    _initPdfDownload();

    /* Bind dynamic lists */
    _bindDynamicList('experience-list',     'experience',     View.renderExperienceList);
    _bindDynamicList('education-list',      'education',      View.renderEducationList);
    _bindDynamicList('skills-list',         'skills',         View.renderSkillsList);
    _bindDynamicList('languages-list',      'languages',      View.renderLanguagesList);
    _bindDynamicList('certifications-list', 'certifications', View.renderCertificationsList);

    /* Responsive CV scaling */
    function scaleCv() {
      const panel  = document.querySelector('.preview-panel');
      const wrap   = document.querySelector('.preview-scale-wrap');
      if (!panel || !wrap) return;
      const avail  = panel.clientWidth - 48;
      const cvW    = 794;
      const scale  = Math.min(1, avail / cvW);
      wrap.style.transform       = `scale(${scale})`;
      wrap.style.transformOrigin = 'top center';
      wrap.style.marginBottom    = `${-(cvW * (1 - scale) * 1.3)}px`;
    }
    scaleCv();
    window.addEventListener('resize', scaleCv);
  }

  return { init };

})();

/* ── BOOTSTRAP ── */
document.addEventListener('DOMContentLoaded', () => Controller.init());
