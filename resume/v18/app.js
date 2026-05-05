/**
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 *   LEBENSLAUF PRO – app.js  (Fixed: photo, i18n, dark mode, accent color, dob)
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */
'use strict';

/* ════════════════════════════════════════════════════════════════════════════════
   I18N – Translations
   ════════════════════════════════════════════════════════════════════════════════ */
const I18n = (() => {
  const translations = {
    de: {
      'nav.personal': 'Person',
      'nav.experience': 'Erfahrung',
      'nav.education': 'Bildung',
      'nav.skills': 'Kenntnisse',
      'nav.additional': 'Sonstiges',
      'section.personal': 'Persönliche Daten',
      'section.personal.desc': 'Geben Sie Ihre persönlichen Informationen ein',
      'section.experience': 'Berufliche Erfahrung',
      'section.experience.desc': 'Fügen Sie Ihre beruflichen Stationen hinzu',
      'section.education': 'Ausbildung & Weiterbildung',
      'section.education.desc': 'Studium, Schule und Zertifikate',
      'section.skills': 'Kenntnisse & Sprachen',
      'section.skills.desc': 'Sprachen, Fähigkeiten und Kompetenzen',
      'section.additional': 'Sonstiges',
      'section.additional.desc': 'Zusätzliche Informationen für Ihren Lebenslauf',
      'photo.add': 'Foto hinzufügen',
      'photo.upload': 'Hochladen',
      'photo.remove': 'Entfernen',
      'group.nameContact': 'Name & Kontakt',
      'group.address': 'Adresse',
      'group.contact': 'Kontakt',
      'group.personal': 'Persönliches',
      'field.firstName': 'Vorname',
      'field.lastName': 'Nachname',
      'field.jobTitle': 'Berufsbezeichnung',
      'field.street': 'Straße & Hausnummer',
      'field.zip': 'PLZ',
      'field.city': 'Stadt',
      'field.phone': 'Telefon',
      'field.email': 'E-Mail',
      'field.birthDate': 'Geburtsdatum',
      'field.birthPlace': 'Geburtsort',
      'field.nationality': 'Nationalität',
      'field.maritalStatus': 'Familienstand',
      'field.drivingLicense': 'Führerschein',
      'field.hobbies': 'Hobbys & Interessen',
      'field.volunteering': 'Ehrenamt',
      'field.other': 'Weitere Angaben',
      'btn.addExperience': 'Berufserfahrung hinzufügen',
      'btn.addStudium': 'Studium hinzufügen',
      'btn.addSchule': 'Schule hinzufügen',
      'btn.addWeiterbildung': 'Zertifikat hinzufügen',
      'btn.addSkill': 'Fähigkeitengruppe hinzufügen',
      'btn.addLanguage': 'Sprache hinzufügen',
      'edu.university': 'Studium',
      'edu.school': 'Schule',
      'edu.training': 'Weiterbildung',
      'skill.skills': 'Fähigkeiten',
      'skill.languages': 'Sprachen',
      'ui.template': 'Vorlage',
      'ui.color': 'Farbe',
      'ui.preview': 'Live-Vorschau',
      'ui.back': 'Zurück',
      'template.modern': 'Modern',
      'template.classic': 'Klassisch',
      'template.minimal': 'Minimal',
      'template.executive': 'Executive',
      'template.creative': 'Kreativ',
      // Card form labels
      'card.from': 'Von',
      'card.to': 'Bis',
      'card.position': 'Position / Berufsbezeichnung',
      'card.company': 'Unternehmen',
      'card.location': 'Ort',
      'card.tasks': 'Aufgaben (eine pro Zeile)',
      'card.year': 'Jahr',
      'card.degree': 'Abschluss / Titel',
      'card.degreeSchool': 'Abschluss / Schulform',
      'card.institution': 'Institution',
      'card.details': 'Details (eine pro Zeile)',
      'card.name': 'Bezeichnung',
      'card.langName': 'Sprache',
      'card.langLevel': 'GER-Niveau',
      'card.langDesc': 'Beschreibung',
      'card.category': 'Kategorie',
      'card.items': 'Einträge (kommagetrennt)',
      // CV section titles
      'cv.personal': 'Persönliche Daten',
      'cv.training': 'Weiterbildung & Zertifikate',
      'cv.experience': 'Berufliche Erfahrung',
      'cv.university': 'Studium',
      'cv.school': 'Schulausbildung',
      'cv.languages': 'Sprachen',
      'cv.skills': 'Kenntnisse',
      'cv.additional': 'Sonstiges',
      'cv.birth': 'Geburtsdatum / -ort',
      'cv.nationality': 'Nationalität',
      'cv.marital': 'Familienstand',
      'cv.langCol1': 'Sprache',
      'cv.langCol2': 'Niveau',
      'cv.langCol3': 'GER',
      'cv.today': 'heute',
      'date.hint': 'Format: MM/JJJJ (z.B. 03/2018)',
      'date.hintTo': 'Format: MM/JJJJ oder „heute"',
      'pdf.generating': 'Wird erstellt...',
    },
    en: {
      'nav.personal': 'Personal',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.additional': 'Other',
      'section.personal': 'Personal Information',
      'section.personal.desc': 'Enter your personal details',
      'section.experience': 'Work Experience',
      'section.experience.desc': 'Add your professional history',
      'section.education': 'Education & Training',
      'section.education.desc': 'University, school and certificates',
      'section.skills': 'Skills & Languages',
      'section.skills.desc': 'Languages, abilities and competencies',
      'section.additional': 'Additional Info',
      'section.additional.desc': 'Extra information for your CV',
      'photo.add': 'Add Photo',
      'photo.upload': 'Upload',
      'photo.remove': 'Remove',
      'group.nameContact': 'Name & Contact',
      'group.address': 'Address',
      'group.contact': 'Contact',
      'group.personal': 'Personal Details',
      'field.firstName': 'First Name',
      'field.lastName': 'Last Name',
      'field.jobTitle': 'Job Title',
      'field.street': 'Street & Number',
      'field.zip': 'ZIP Code',
      'field.city': 'City',
      'field.phone': 'Phone',
      'field.email': 'Email',
      'field.birthDate': 'Date of Birth',
      'field.birthPlace': 'Place of Birth',
      'field.nationality': 'Nationality',
      'field.maritalStatus': 'Marital Status',
      'field.drivingLicense': 'Driving License',
      'field.hobbies': 'Hobbies & Interests',
      'field.volunteering': 'Volunteering',
      'field.other': 'Additional Notes',
      'btn.addExperience': 'Add Work Experience',
      'btn.addStudium': 'Add University',
      'btn.addSchule': 'Add School',
      'btn.addWeiterbildung': 'Add Certificate',
      'btn.addSkill': 'Add Skill Group',
      'btn.addLanguage': 'Add Language',
      'edu.university': 'University',
      'edu.school': 'School',
      'edu.training': 'Training',
      'skill.skills': 'Skills',
      'skill.languages': 'Languages',
      'ui.template': 'Template',
      'ui.color': 'Color',
      'ui.preview': 'Live Preview',
      'ui.back': 'Back',
      'template.modern': 'Modern',
      'template.classic': 'Classic',
      'template.minimal': 'Minimal',
      'template.executive': 'Executive',
      'template.creative': 'Creative',
      'card.from': 'From',
      'card.to': 'To',
      'card.position': 'Position / Job Title',
      'card.company': 'Company',
      'card.location': 'Location',
      'card.tasks': 'Tasks (one per line)',
      'card.year': 'Year',
      'card.degree': 'Degree / Title',
      'card.degreeSchool': 'Degree / School Type',
      'card.institution': 'Institution',
      'card.details': 'Details (one per line)',
      'card.name': 'Name',
      'card.langName': 'Language',
      'card.langLevel': 'CEFR Level',
      'card.langDesc': 'Description',
      'card.category': 'Category',
      'card.items': 'Items (comma-separated)',
      'cv.personal': 'Personal Information',
      'cv.training': 'Training & Certificates',
      'cv.experience': 'Work Experience',
      'cv.university': 'Education',
      'cv.school': 'School',
      'cv.languages': 'Languages',
      'cv.skills': 'Skills',
      'cv.additional': 'Additional',
      'cv.birth': 'Date / Place of Birth',
      'cv.nationality': 'Nationality',
      'cv.marital': 'Marital Status',
      'cv.langCol1': 'Language',
      'cv.langCol2': 'Level',
      'cv.langCol3': 'CEFR',
      'cv.today': 'present',
      'date.hint': 'Format: MM/YYYY (e.g. 03/2018)',
      'date.hintTo': 'Format: MM/YYYY or "present"',
      'pdf.generating': 'Generating...',
    },
    ar: {
      'nav.personal': 'شخصي',
      'nav.experience': 'خبرة',
      'nav.education': 'تعليم',
      'nav.skills': 'مهارات',
      'nav.additional': 'أخرى',
      'section.personal': 'المعلومات الشخصية',
      'section.personal.desc': 'أدخل بياناتك الشخصية',
      'section.experience': 'الخبرة المهنية',
      'section.experience.desc': 'أضف تاريخك المهني',
      'section.education': 'التعليم والتدريب',
      'section.education.desc': 'الجامعة والمدرسة والشهادات',
      'section.skills': 'المهارات واللغات',
      'section.skills.desc': 'اللغات والقدرات والكفاءات',
      'section.additional': 'معلومات إضافية',
      'section.additional.desc': 'معلومات إضافية لسيرتك الذاتية',
      'photo.add': 'إضافة صورة',
      'photo.upload': 'رفع',
      'photo.remove': 'حذف',
      'group.nameContact': 'الاسم وبيانات الاتصال',
      'group.address': 'العنوان',
      'group.contact': 'التواصل',
      'group.personal': 'البيانات الشخصية',
      'field.firstName': 'الاسم الأول',
      'field.lastName': 'اسم العائلة',
      'field.jobTitle': 'المسمى الوظيفي',
      'field.street': 'الشارع والرقم',
      'field.zip': 'الرمز البريدي',
      'field.city': 'المدينة',
      'field.phone': 'الهاتف',
      'field.email': 'البريد الإلكتروني',
      'field.birthDate': 'تاريخ الميلاد',
      'field.birthPlace': 'مكان الميلاد',
      'field.nationality': 'الجنسية',
      'field.maritalStatus': 'الحالة الاجتماعية',
      'field.drivingLicense': 'رخصة القيادة',
      'field.hobbies': 'الهوايات والاهتمامات',
      'field.volunteering': 'العمل التطوعي',
      'field.other': 'ملاحظات إضافية',
      'btn.addExperience': 'إضافة خبرة عمل',
      'btn.addStudium': 'إضافة جامعة',
      'btn.addSchule': 'إضافة مدرسة',
      'btn.addWeiterbildung': 'إضافة شهادة',
      'btn.addSkill': 'إضافة مجموعة مهارات',
      'btn.addLanguage': 'إضافة لغة',
      'edu.university': 'جامعة',
      'edu.school': 'مدرسة',
      'edu.training': 'تدريب',
      'skill.skills': 'مهارات',
      'skill.languages': 'لغات',
      'ui.template': 'قالب',
      'ui.color': 'لون',
      'ui.preview': 'معاينة',
      'ui.back': 'رجوع',
      'template.modern': 'عصري',
      'template.classic': 'كلاسيكي',
      'template.minimal': 'بسيط',
      'template.executive': 'تنفيذي',
      'template.creative': 'إبداعي',
      'card.from': 'من',
      'card.to': 'إلى',
      'card.position': 'المنصب / المسمى الوظيفي',
      'card.company': 'الشركة',
      'card.location': 'الموقع',
      'card.tasks': 'المهام (سطر لكل مهمة)',
      'card.year': 'السنة',
      'card.degree': 'الدرجة العلمية / العنوان',
      'card.degreeSchool': 'الدرجة العلمية / نوع المدرسة',
      'card.institution': 'المؤسسة',
      'card.details': 'تفاصيل (سطر لكل تفصيل)',
      'card.name': 'الاسم',
      'card.langName': 'اللغة',
      'card.langLevel': 'مستوى CEFR',
      'card.langDesc': 'وصف',
      'card.category': 'الفئة',
      'card.items': 'عناصر (مفصولة بفاصلة)',
      'cv.personal': 'البيانات الشخصية',
      'cv.training': 'التدريب والشهادات',
      'cv.experience': 'الخبرة المهنية',
      'cv.university': 'التعليم الجامعي',
      'cv.school': 'التعليم المدرسي',
      'cv.languages': 'اللغات',
      'cv.skills': 'المهارات',
      'cv.additional': 'معلومات إضافية',
      'cv.birth': 'تاريخ / مكان الميلاد',
      'cv.nationality': 'الجنسية',
      'cv.marital': 'الحالة الاجتماعية',
      'cv.langCol1': 'اللغة',
      'cv.langCol2': 'المستوى',
      'cv.langCol3': 'CEFR',
      'cv.today': 'الحاضر',
      'date.hint': 'الصيغة: شش/سسسس',
      'date.hintTo': 'الصيغة: شش/سسسس أو "الحاضر"',
      'pdf.generating': 'جارٍ الإنشاء...',
    }
  };

  let _lang = 'de';

  function t(key) {
    return (translations[_lang] && translations[_lang][key]) ||
           (translations['de'] && translations['de'][key]) ||
           key;
  }

  function setLang(lang) {
    _lang = lang;
    // RTL for Arabic
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // Save
    try { localStorage.setItem('cv_lang', lang); } catch(e) {}
  }

  function init() {
    let saved = 'de';
    try { saved = localStorage.getItem('cv_lang') || 'de'; } catch(e) {}
    _lang = saved;
    setLang(saved);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
        // Re-render CV with new language labels
        View.renderCV(Model.getData());
        View.renderCV(Model.getData(), 'cv-root-mobile');
        // Re-render dynamic lists so card labels update
        View.renderAll(Model.getData());
      });
    });
  }

  return { t, setLang, init, getLang: () => _lang };
})();

/* ════════════════════════════════════════════════════════════════════════════════
   THEME COLOR – curated palettes + free custom picker
   Each palette sets a full set of CV-only CSS variables:
     --cv-accent        main accent (section borders, date text, bullets, buttons)
     --cv-accent-dark   darkened accent (hover states inside CV)
     --cv-accent-light  very light tint  (sidebar bg, tag bg)
     --cv-bg            header / hero background (solid or via gradient JS)
     --cv-bg2           secondary bg for gradients (darker tone)
     --cv-on-dark       text colour on dark bg  (#fff or near-white)
     --cv-border        subtle divider / border colour inside body
     --cv-heading       section title text colour (body area)
   ════════════════════════════════════════════════════════════════════════════════ */
const ThemeColor = (() => {

  /* ── Palette catalogue ─────────────────────────────────────────────────────── */
  const PALETTES = [
    { id: 'navy',     label: 'Navy',     accent: '#2563EB', bg: '#0F172A', bg2: '#1E3A5F', light: '#EFF6FF', border: '#DBEAFE', heading: '#1E3A5F', onDark: '#ffffff' },
    { id: 'slate',    label: 'Slate',    accent: '#475569', bg: '#1E293B', bg2: '#334155', light: '#F1F5F9', border: '#CBD5E1', heading: '#1E293B', onDark: '#f8fafc' },
    { id: 'emerald',  label: 'Emerald',  accent: '#059669', bg: '#064E3B', bg2: '#065F46', light: '#ECFDF5', border: '#A7F3D0', heading: '#064E3B', onDark: '#ffffff' },
    { id: 'rose',     label: 'Rose',     accent: '#E11D48', bg: '#881337', bg2: '#9F1239', light: '#FFF1F2', border: '#FECDD3', heading: '#881337', onDark: '#ffffff' },
    { id: 'amber',    label: 'Amber',    accent: '#D97706', bg: '#78350F', bg2: '#92400E', light: '#FFFBEB', border: '#FDE68A', heading: '#78350F', onDark: '#ffffff' },
    { id: 'violet',   label: 'Violet',   accent: '#7C3AED', bg: '#2E1065', bg2: '#3B0764', light: '#F5F3FF', border: '#DDD6FE', heading: '#2E1065', onDark: '#ffffff' },
    { id: 'teal',     label: 'Teal',     accent: '#0D9488', bg: '#134E4A', bg2: '#115E59', light: '#F0FDFA', border: '#99F6E4', heading: '#134E4A', onDark: '#ffffff' },
    { id: 'graphite', label: 'Graphite', accent: '#374151', bg: '#111827', bg2: '#1F2937', light: '#F9FAFB', border: '#E5E7EB', heading: '#111827', onDark: '#f9fafb' },
    { id: 'custom',   label: '＋',       accent: '#2563EB', bg: '#0F172A', bg2: '#1E3A5F', light: '#EFF6FF', border: '#DBEAFE', heading: '#1E3A5F', onDark: '#ffffff' },
  ];

  let _active = 'navy';

  /* ── Colour math helpers ───────────────────────────────────────────────────── */
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    return { r: parseInt(hex.slice(0,2),16), g: parseInt(hex.slice(2,4),16), b: parseInt(hex.slice(4,6),16) };
  }
  function toHex({r,g,b}) { return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
  function darken(hex, f)  { const {r,g,b} = hexToRgb(hex); return toHex({r:r*(1-f), g:g*(1-f), b:b*(1-f)}); }
  function lighten(hex, f) { const {r,g,b} = hexToRgb(hex); return toHex({r:r+(255-r)*f, g:g+(255-g)*f, b:b+(255-b)*f}); }
  function luminance({r,g,b}) { const c = v => { v/=255; return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4; }; return 0.2126*c(r)+0.7152*c(g)+0.0722*c(b); }
  function contrastOnDark(hex) { return luminance(hexToRgb(hex)) > 0.18 ? '#111827' : '#ffffff'; }

  /* ── Apply a palette to :root CV variables only ────────────────────────────── */
  function applyPalette(p) {
    const r = document.documentElement;
    r.style.setProperty('--cv-accent',       p.accent);
    r.style.setProperty('--cv-accent-dark',  darken(p.accent, 0.2));
    r.style.setProperty('--cv-accent-light', p.light);
    r.style.setProperty('--cv-bg',           p.bg);
    r.style.setProperty('--cv-bg2',          p.bg2);
    r.style.setProperty('--cv-on-dark',      p.onDark || contrastOnDark(p.bg));
    r.style.setProperty('--cv-border',       p.border);
    r.style.setProperty('--cv-heading',      p.heading);
  }

  /* ── Derive a full palette from a single free-picked accent hex ────────────── */
  function paletteFromHex(hex) {
    const bg    = darken(hex, 0.6);
    const bg2   = darken(hex, 0.45);
    const light = lighten(hex, 0.88);
    const border= lighten(hex, 0.68);
    return { id:'custom', label:'＋', accent: hex, bg, bg2, light, border, heading: bg, onDark: contrastOnDark(bg) };
  }

  /* ── Build swatch UI ───────────────────────────────────────────────────────── */
  function buildUI() {
    const container = document.getElementById('color-swatches');
    if (!container) return;
    container.innerHTML = '';
    PALETTES.forEach(p => {
      if (p.id === 'custom') {
        // Custom picker swatch — rendered separately
        return;
      }
      const btn = document.createElement('button');
      btn.className = 'color-swatch' + (_active === p.id ? ' active' : '');
      btn.dataset.palette = p.id;
      btn.title = p.label;
      btn.style.cssText = `background:${p.accent};`;
      btn.setAttribute('aria-label', p.label);
      container.appendChild(btn);
    });

    // Custom swatch (wraps the color input)
    const customWrap = document.createElement('label');
    customWrap.className = 'color-swatch color-swatch-custom' + (_active === 'custom' ? ' active' : '');
    customWrap.title = 'Custom colour';
    customWrap.setAttribute('for', 'accent-color-input');
    customWrap.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`;
    container.appendChild(customWrap);
  }

  /* ── Activate a palette by id ──────────────────────────────────────────────── */
  function activate(id) {
    _active = id;
    const p = id === 'custom'
      ? paletteFromHex(document.getElementById('accent-color-input')?.value || '#2563EB')
      : PALETTES.find(x => x.id === id);
    if (!p) return;
    applyPalette(p);
    // Update swatch active states
    document.querySelectorAll('.color-swatch').forEach(el => {
      el.classList.toggle('active', el.dataset.palette === id || (id === 'custom' && el.classList.contains('color-swatch-custom')));
    });
    // Re-render CV
    View.renderCV(Model.getData());
    View.renderCV(Model.getData(), 'cv-root-mobile');
    try { localStorage.setItem('cv_palette', id); } catch(e) {}
  }

  /* ── Init ──────────────────────────────────────────────────────────────────── */
  function init() {
    let savedPalette = 'navy';
    let savedCustom  = '#2563EB';
    try { savedPalette = localStorage.getItem('cv_palette') || 'navy'; } catch(e) {}
    try { savedCustom  = localStorage.getItem('cv_custom')  || '#2563EB'; } catch(e) {}

    buildUI();

    // Palette swatch clicks
    document.getElementById('color-swatches')?.addEventListener('click', e => {
      const btn = e.target.closest('.color-swatch[data-palette]');
      if (btn) activate(btn.dataset.palette);
    });

    // Custom color input
    const input = document.getElementById('accent-color-input');
    if (input) {
      input.value = savedCustom;
      input.addEventListener('input', e => {
        try { localStorage.setItem('cv_custom', e.target.value); } catch(err) {}
        // Update custom palette entry in array
        const cp = PALETTES.find(x => x.id === 'custom');
        if (cp) {
          const derived = paletteFromHex(e.target.value);
          Object.assign(cp, derived);
        }
        activate('custom');
      });
    }

    // Restore saved state
    _active = savedPalette;
    if (savedPalette === 'custom' && input) {
      activate('custom');
    } else {
      const p = PALETTES.find(x => x.id === savedPalette) || PALETTES[0];
      applyPalette(p);
    }
    buildUI(); // rebuild with correct active state
  }

  return { init };
})();

// Keep legacy name alias so Controller.init() call order doesn't break
const AccentColor = ThemeColor;

/* ════════════════════════════════════════════════════════════════════════════════
   DARK MODE
   ════════════════════════════════════════════════════════════════════════════════ */
const DarkMode = (() => {
  function apply(dark) {
    document.body.classList.toggle('dark', dark);
    const moon = document.querySelector('.icon-moon');
    const sun  = document.querySelector('.icon-sun');
    if (moon) moon.style.display = dark ? 'none' : '';
    if (sun)  sun.style.display  = dark ? '' : 'none';
    try { localStorage.setItem('cv_dark', dark ? '1' : '0'); } catch(e) {}
  }

  function init() {
    let saved = false;
    try { saved = localStorage.getItem('cv_dark') === '1'; } catch(e) {}
    apply(saved);
    document.getElementById('btn-dark-mode')?.addEventListener('click', () => {
      apply(!document.body.classList.contains('dark'));
    });
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════════════════════════════
   MODEL
   ════════════════════════════════════════════════════════════════════════════════ */
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
      { id: 'ex1', dateFrom: '03/2018', dateTo: 'heute', position: 'Kaufmännische Leiterin', company: 'Berliner Handelsgruppe GmbH', location: 'Berlin',
        bullets: ['Verantwortung für Buchhaltung, Controlling und Personalwesen','Führung eines Teams von 18 Mitarbeiterinnen und Mitarbeitern','Reduzierung der Betriebskosten um 22 % durch Prozessoptimierung','Steuerung des Jahresbudgets von 4,5 Mio. Euro'] },
      { id: 'ex2', dateFrom: '06/2013', dateTo: '02/2018', position: 'Abteilungsleiterin Finanzen', company: 'Schmidt & Partner KG', location: 'Hamburg',
        bullets: ['Aufbau des Finanzreportings und Einführung eines modernen ERP-Systems','Betreuung von Jahresabschlüssen nach HGB','Enge Zusammenarbeit mit Wirtschaftsprüfern und Steuerberatern'] },
      { id: 'ex3', dateFrom: '09/2009', dateTo: '05/2013', position: 'Sachbearbeiterin Rechnungswesen', company: 'Nord-West Logistik AG', location: 'Bremen',
        bullets: ['Kreditoren- und Debitorenbuchhaltung','Reisekostenabrechnung und Unterstützung im Monatsabschluss'] },
    ],

    studium: [
      { id: 'st1', dateFrom: '10/2005', dateTo: '09/2009', degree: 'Diplom-Betriebswirtin (FH)', institution: 'Hochschule Bremen', location: 'Bremen',
        bullets: ['Schwerpunkte: Controlling, Unternehmensfinanzierung, Personalmanagement'] },
    ],

    schule: [
      { id: 'sc1', dateFrom: '08/1995', dateTo: '06/2005', degree: 'Allgemeine Hochschulreife', institution: 'Gymnasium Alstertal', location: 'Hamburg',
        bullets: ['Leistungskurse: Mathematik, Wirtschaftslehre; Abiturnote: 1,8'] },
    ],

    weiterbildung: [
      { id: 'wb1', year: '2021', title: 'Zertifizierter Controller (IHK)', institution: 'IHK Berlin', bullets: [] },
      { id: 'wb2', year: '2019', title: 'Leadership Excellence Program', institution: 'Deutsche Management Akademie', bullets: ['Dreimonatiges Intensivprogramm für Führungskräfte'] },
      { id: 'wb3', year: '2017', title: 'SAP FI/CO Anwendertraining', institution: 'SAP SE', bullets: [] },
    ],

    languages: [
      { id: 'la1', name: 'Deutsch',  level: 'Muttersprache',      cefr: 'C2' },
      { id: 'la2', name: 'Englisch', level: 'Verhandlungssicher', cefr: 'C1' },
      { id: 'la3', name: 'Spanisch', level: 'Grundkenntnisse',    cefr: 'A2' },
    ],

    skills: [
      { id: 'sk1', category: 'IT-Anwendungen',      items: 'MS Office (Word, Excel, PowerPoint), SAP FI/CO, DATEV' },
      { id: 'sk2', category: 'Methoden',             items: 'Projektmanagement, Lean Management, Prozessoptimierung' },
      { id: 'sk3', category: 'Führungskompetenzen',  items: 'Teamführung, Budgetverantwortung, Mitarbeitergespräche' },
    ],

    additionalInfo: {
      drivingLicense: 'Klasse B',
      hobbies:        'Bergwandern, klassische Musik, Fotografie',
      volunteering:   'Vorstandsmitglied im Kulturverein Mitte e.V. (seit 2017)',
      other:          'Bereitschaft zu gelegentlichen Dienstreisen vorhanden',
    },
  };

  const _subscribers = [];

  function _notify() { _subscribers.forEach(fn => fn(_data)); }

  return {
    getData() { return _data; },
    subscribe(fn) { _subscribers.push(fn); fn(_data); },
    setField(path, value) {
      const keys = path.split('.');
      let obj = _data;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      _notify();
    },
    setPhoto(url) { _data.personalData.photo = url; _notify(); },
    addEntry(section) {
      const id = section.slice(0,3) + Date.now();
      const today = I18n.t('cv.today');
      const defaults = {
        experience:    { id, dateFrom: '', dateTo: today, position: 'Neue Position', company: '', location: '', bullets: [''] },
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

/* ════════════════════════════════════════════════════════════════════════════════
   VIEW
   ════════════════════════════════════════════════════════════════════════════════ */
const View = (() => {

  const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  /* ── AUTO RESIZE TEXTAREA ── */
  function autoResizeInit(ta) {
    function resize() { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
    ta.addEventListener('input', resize);
    resize();
  }

  /* ── DATE VALIDATION ──
     Accepts:
       - MM/YYYY  (experience / education)
       - DD.MM.YYYY or DD/MM/YYYY or YYYY  (birth date, free text fields)
       - "heute" / "present" / "الحاضر" (to-field only)
  */
  function validateDate(value, isToField) {
    if (!value || value.trim() === '') return 'empty';
    const v = value.trim().toLowerCase();
    const todayWords = ['heute', 'present', 'الحاضر'];
    if (isToField && todayWords.includes(v)) return 'valid';
    // MM/YYYY
    if (/^\d{2}\/\d{4}$/.test(value.trim())) {
      const mm = parseInt(value.slice(0,2), 10);
      return (mm >= 1 && mm <= 12) ? 'valid' : 'invalid';
    }
    // DD.MM.YYYY or DD/MM/YYYY (birth date)
    if (/^\d{2}[./]\d{2}[./]\d{4}$/.test(value.trim())) return 'valid';
    // YYYY only (weiterbildung year)
    if (/^\d{4}$/.test(value.trim())) return 'valid';
    return 'invalid';
  }

  function initDateValidation(input) {
    const isTo = input.dataset.dateField === 'to';
    const hint = input.parentElement.querySelector('.date-hint');

    function check() {
      const val = input.value.trim();
      if (!val) {
        input.classList.remove('date-valid','date-invalid');
        if (hint) hint.classList.remove('visible');
        return;
      }
      const result = validateDate(val, isTo);
      input.classList.toggle('date-valid', result === 'valid');
      input.classList.toggle('date-invalid', result === 'invalid');
      if (hint) hint.classList.toggle('visible', result === 'invalid');
    }

    // Auto-format: insert "/" after 2 digits for MM/YYYY style fields
    input.addEventListener('input', e => {
      const todayWords = ['heute','present','الحاضر'];
      const lv = input.value.trim().toLowerCase();
      if (isTo && todayWords.some(w => w.startsWith(lv) && lv.length > 0 && isNaN(lv[0]))) {
        // let them type freely
      } else if (!input.value.includes('.')) {
        // Only auto-slash for pure numeric inputs (MM/YYYY)
        const digits = input.value.replace(/\D/g,'');
        if (digits.length >= 2 && !input.value.includes('/')) {
          input.value = digits.slice(0,2) + '/' + digits.slice(2,6);
        }
      }
      check();
    });

    input.addEventListener('blur', check);
    if (input.value) check();
  }

  /* ── CV RENDER HELPERS ── */
  function bulletsHTML(arr) {
    if (!arr || !arr.length) return '';
    return `<ul class="cv-bullets">${arr.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
  }

  function getAccentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--cv-accent').trim() || '#2563EB';
  }

  function pageHeaderHTML(d, showPhoto, template) {
    // Use embedded data URI — works in preview, html2canvas, and print
    const photoEl = showPhoto
      ? (d.photo
          ? `<img class="cv-photo" src="${d.photo}" alt="Photo" />`
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

  function renderCV(data, targetId = 'cv-root') {
    const root = document.getElementById(targetId);
    if (!root) return;

    const d  = data.personalData;
    const ai = data.additionalInfo;
    const t  = key => I18n.t(key);

    /* PAGE 1 */
    const persData = {
      [t('cv.birth')]:       [d.birthDate, d.birthPlace].filter(Boolean).join(', '),
      [t('cv.nationality')]: d.nationality,
      [t('cv.marital')]:     d.maritalStatus,
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
      ${persRows ? `<div class="cv-section">${secTitle(t('cv.personal'))}<div class="cv-personal-rows">${persRows}</div></div>` : ''}
      ${data.weiterbildung.length ? `<div class="cv-section">${secTitle(t('cv.training'))}${weiterHTML}</div>` : ''}
      ${data.experience.length    ? `<div class="cv-section">${secTitle(t('cv.experience'))}${expHTML}</div>` : ''}
    `;

    /* PAGE 2 */
    const studiumHTML = data.studium.map(e =>
      entryRow(`${esc(e.dateFrom)}${e.dateFrom||e.dateTo?' – ':''}${esc(e.dateTo)}`,
        e.degree, `${e.institution}${e.location?', '+e.location:''}`, e.bullets)
    ).join('');

    const schuleHTML = data.schule.map(e =>
      entryRow(`${esc(e.dateFrom)}${e.dateFrom||e.dateTo?' – ':''}${esc(e.dateTo)}`,
        e.degree, `${e.institution}${e.location?', '+e.location:''}`, e.bullets)
    ).join('');

    const langRows = data.languages.map(l => `
      <tr>
        <td>${esc(l.name)}</td>
        <td>${esc(l.level)}</td>
        <td>${esc(l.cefr)}</td>
      </tr>`).join('');

    const langTable = `
      <table class="cv-lang-table">
        <thead><tr><th>${t('cv.langCol1')}</th><th>${t('cv.langCol2')}</th><th>${t('cv.langCol3')}</th></tr></thead>
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
      ${data.studium.length   ? `<div class="cv-section">${secTitle(t('cv.university'))}${studiumHTML}</div>` : ''}
      ${data.schule.length    ? `<div class="cv-section">${secTitle(t('cv.school'))}${schuleHTML}</div>` : ''}
      ${data.languages.length ? `<div class="cv-section">${secTitle(t('cv.languages'))}${langTable}</div>` : ''}
      ${data.skills.length    ? `<div class="cv-section">${secTitle(t('cv.skills'))}<div class="cv-skills-rows">${skillRows}</div></div>` : ''}
      ${addBullets.length     ? `<div class="cv-section">${secTitle(t('cv.additional'))}${bulletsHTML(addBullets)}</div>` : ''}
    `;

    const currentTemplate = root.getAttribute('data-template') || 'modern';
    const html = `
      <div class="cv-page page-1">
        ${pageHeaderHTML(d, true, currentTemplate)}
        <div class="cv-page-body">${page1Body}</div>
        <div class="cv-page-number">1 / 2</div>
        <div class="cv-branding">Erstellt mit LebenslaufPro</div>
      </div>
      <div class="cv-page page-2">
        ${pageHeaderHTML(d, false, currentTemplate)}
        <div class="cv-page-body">${page2Body}</div>
        <div class="cv-page-number">2 / 2</div>
        <div class="cv-branding">Erstellt mit LebenslaufPro</div>
      </div>
    `;

    root.innerHTML = html;
  }

  /* ── FORM CARD HELPERS ── */
  function _removeBtn() {
    return `<button class="btn-remove-card" title="Remove" aria-label="Remove">
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
            <div class="fg fg-date-wrap">
              <label>${I18n.t('card.from')}</label>
              <input type="text" data-ef="dateFrom" data-date-field="from" value="${esc(e.dateFrom)}" placeholder="MM/JJJJ" maxlength="7" />
              <span class="date-hint">${I18n.t('date.hint')}</span>
            </div>
            <div class="fg fg-date-wrap">
              <label>${I18n.t('card.to')}</label>
              <input type="text" data-ef="dateTo" data-date-field="to" value="${esc(e.dateTo)}" placeholder="MM/JJJJ" maxlength="10" />
              <span class="date-hint">${I18n.t('date.hintTo')}</span>
            </div>
            <div class="fg full"><label>${I18n.t('card.position')}</label><input type="text" data-ef="position" value="${esc(e.position)}" /></div>
            <div class="fg full"><label>${I18n.t('card.company')}</label><input type="text" data-ef="company"   value="${esc(e.company)}" /></div>
            <div class="fg full"><label>${I18n.t('card.location')}</label><input type="text" data-ef="location" value="${esc(e.location)}" /></div>
            <div class="fg full"><label>${I18n.t('card.tasks')}</label><textarea data-ef="bullets" placeholder="Aufgabe 1&#10;Aufgabe 2">${(e.bullets||[]).join('\n')}</textarea></div>
          </div>
        </div>`;
      c.appendChild(d);
    });
    c.querySelectorAll('textarea').forEach(autoResizeInit);
    c.querySelectorAll('input[data-date-field]').forEach(initDateValidation);
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
            <div class="fg fg-date-wrap">
              <label>${I18n.t('card.from')}</label>
              <input type="text" data-ef="dateFrom" data-date-field="from" value="${esc(e.dateFrom)}" placeholder="MM/JJJJ" maxlength="7" />
              <span class="date-hint">${I18n.t('date.hint')}</span>
            </div>
            <div class="fg fg-date-wrap">
              <label>${I18n.t('card.to')}</label>
              <input type="text" data-ef="dateTo" data-date-field="to" value="${esc(e.dateTo)}" placeholder="MM/JJJJ" maxlength="7" />
              <span class="date-hint">${I18n.t('date.hint')}</span>
            </div>` : `
            <div class="fg full"><label>${I18n.t('card.year')}</label><input type="text" data-ef="year" value="${esc(e.year)}" placeholder="JJJJ" /></div>`}
          <div class="fg full"><label>${fields.degreeLabel}</label><input type="text" data-ef="${fields.degreeField}" value="${esc(e[fields.degreeField])}" /></div>
          <div class="fg full"><label>${I18n.t('card.institution')}</label><input type="text" data-ef="institution" value="${esc(e.institution)}" /></div>
          ${fields.hasLocation ? `<div class="fg full"><label>${I18n.t('card.location')}</label><input type="text" data-ef="location" value="${esc(e.location)}" /></div>` : ''}
          <div class="fg full"><label>${I18n.t('card.details')}</label><textarea data-ef="bullets" placeholder="Details...">${(e.bullets||[]).join('\n')}</textarea></div>
        </div>
      </div>`;
  }

  function renderStudiumList(list) {
    const c = document.getElementById('studium-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.degree || 'Abschluss', hasDate: true, degreeLabel: I18n.t('card.degree'), degreeField: 'degree', hasLocation: true });
      c.appendChild(d);
    });
    c.querySelectorAll('textarea').forEach(autoResizeInit);
    c.querySelectorAll('input[data-date-field]').forEach(initDateValidation);
  }

  function renderSchuleList(list) {
    const c = document.getElementById('schule-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.degree || 'Abschluss', hasDate: true, degreeLabel: I18n.t('card.degreeSchool'), degreeField: 'degree', hasLocation: true });
      c.appendChild(d);
    });
    c.querySelectorAll('textarea').forEach(autoResizeInit);
    c.querySelectorAll('input[data-date-field]').forEach(initDateValidation);
  }

  function renderWeiterbildungList(list) {
    const c = document.getElementById('weiterbildung-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = _eduCard(e, { title: e.title || 'Zertifikat', hasDate: false, degreeLabel: I18n.t('card.name'), degreeField: 'title', hasLocation: false });
      c.appendChild(d);
    });
    c.querySelectorAll('textarea').forEach(autoResizeInit);
  }

  function renderLanguagesList(list) {
    const c = document.getElementById('languages-list');
    if (!c) return;
    c.innerHTML = '';
    list.forEach(e => {
      const d = document.createElement('div');
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${esc(e.name)}</span>${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg"><label>${I18n.t('card.langName')}</label><input type="text" data-ef="name" value="${esc(e.name)}" /></div>
            <div class="fg"><label>${I18n.t('card.langLevel')}</label>
              <select data-ef="cefr">
                ${['A1','A2','B1','B2','C1','C2','Muttersprache'].map(v => `<option ${e.cefr===v?'selected':''}>${v}</option>`).join('')}
              </select>
            </div>
            <div class="fg full"><label>${I18n.t('card.langDesc')}</label><input type="text" data-ef="level" value="${esc(e.level)}" placeholder="z.B. Verhandlungssicher" /></div>
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
      d.className = 'list-card'; d.dataset.id = e.id;
      d.innerHTML = `
        <div class="list-card-header">
          <span class="card-label">${esc(e.category)}</span>${_removeBtn()}
        </div>
        <div class="list-card-body">
          <div class="fgrid">
            <div class="fg full"><label>${I18n.t('card.category')}</label><input type="text" data-ef="category" value="${esc(e.category)}" /></div>
            <div class="fg full"><label>${I18n.t('card.items')}</label><input type="text" data-ef="items" value="${esc(e.items)}" placeholder="Word, Excel, PowerPoint" /></div>
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
      } else {
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
    autoResizeInit,
    initDateValidation,
  };
})();

/* ════════════════════════════════════════════════════════════════════════════════
   CONTROLLER
   ════════════════════════════════════════════════════════════════════════════════ */
const Controller = (() => {

  let _currentZoom = 1;
  const _zoomStep  = 0.1;
  const _minZoom   = 0.4;
  const _maxZoom   = 1.5;

  /* ── ZOOM ── */
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
      if (_currentZoom < _maxZoom) { _currentZoom = Math.round((_currentZoom + _zoomStep)*10)/10; applyZoom(); }
    });
    document.getElementById('zoom-out')?.addEventListener('click', () => {
      if (_currentZoom > _minZoom) { _currentZoom = Math.round((_currentZoom - _zoomStep)*10)/10; applyZoom(); }
    });
  }

  /* ── PANEL RESIZER ── */
  function initPanelResizer() {
    const resizer = document.getElementById('panel-resizer');
    const panel   = document.getElementById('form-panel');
    if (!resizer || !panel) return;
    let isResizing = false, startX = 0, startWidth = 0;
    resizer.addEventListener('mousedown', e => {
      isResizing = true; startX = e.clientX; startWidth = panel.offsetWidth;
      resizer.classList.add('resizing');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!isResizing) return;
      const dx = e.clientX - startX;
      let newWidth = Math.max(260, Math.min(520, startWidth + dx));
      panel.style.width = newWidth + 'px';
      if (window.innerWidth > 768) {
        const previewPanel = document.querySelector('.preview-panel');
        if (previewPanel) {
          const avail = previewPanel.clientWidth - 60;
          if (avail > 0) { _currentZoom = Math.max(_minZoom, Math.min(1, avail/794)); applyZoom(); }
        }
      }
    });
    document.addEventListener('mouseup', () => {
      if (isResizing) { isResizing = false; resizer.classList.remove('resizing'); document.body.style.cursor = ''; document.body.style.userSelect = ''; }
    });
  }

  /* ── NAVIGATION ── */
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
      const panel = document.querySelector('.panel-scroll');
      if (panel) panel.scrollTop = 0;
    });
  }

  /* ── PERSONAL FIELDS ── */
  function initPersonalFields() {
    ['section-personal', 'section-additional'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', e => {
        if (!e.target.dataset.field) return;
        Model.setField(e.target.dataset.field, e.target.value);
      });
    });
    document.querySelectorAll('textarea[data-field]').forEach(View.autoResizeInit);
  }

  /* ── PHOTO ── */
  function initPhoto() {
    const input     = document.getElementById('photo-input');
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
          const dataUrl = ev.target.result;
          // Update preview in form immediately
          const prev = document.getElementById('photo-preview');
          const placeholder = document.getElementById('photo-placeholder');
          if (prev) { prev.src = dataUrl; prev.classList.remove('hidden'); }
          if (placeholder) placeholder.style.display = 'none';
          // Store in model → triggers CV re-render with embedded data URI
          Model.setPhoto(dataUrl);
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

  /* ── PDF ── */
  function initPdf() {
    async function generatePDF() {
      const btn = document.getElementById('btn-download');
      const origHTML = btn?.innerHTML;
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> <span class="btn-text">${I18n.t('pdf.generating')}</span>`;
      }
      try {
        const root = document.getElementById('cv-root');
        if (!root) throw new Error('CV root not found');
        const opt = {
          margin:      0,
          filename:    `Lebenslauf_${Model.getData().personalData.lastName || 'Pro'}.pdf`,
          image:       { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
          jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak:   { mode: ['css-class'], cssClass: 'page-2' }
        };
        await html2pdf().set(opt).from(root).save();
      } catch (err) {
        console.error('PDF generation failed:', err);
        window.print();
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = origHTML; }
      }
    }
    document.getElementById('btn-download')?.addEventListener('click', generatePDF);
    document.getElementById('btn-print-mobile')?.addEventListener('click', generatePDF);
  }

  /* ── EDU TABS ── */
  function initEduTabs() {
    const tabs = document.querySelector('.edu-tabs');
    if (!tabs) return;
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

  /* ── SKILL TABS ── */
  function initSkillTabs() {
    const tabs = document.querySelector('.skill-tabs');
    if (!tabs) return;
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

  /* ── MOBILE PREVIEW ── */
  function initMobilePreview() {
    const fab     = document.getElementById('btn-preview-fab');
    const overlay = document.getElementById('mobile-preview-overlay');
    const backBtn = document.getElementById('btn-preview-back');

    function updateMobileScale() {
      const scaler = document.getElementById('mobile-cv-scaler');
      if (!scaler) return;
      const vw = window.innerWidth;
      const scale = Math.min(1, (vw - 32) / 794);
      document.documentElement.style.setProperty('--mobile-scale', scale);
      const scaledHeight = (1123 * 2 + 40) * scale;
      scaler.style.height = scaledHeight + 'px';
    }

    if (fab && overlay) {
      fab.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        View.renderCV(Model.getData(), 'cv-root-mobile');
        updateMobileScale();
      });
    }
    if (backBtn && overlay) {
      backBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    window.addEventListener('resize', updateMobileScale);
    window.addEventListener('orientationchange', () => setTimeout(updateMobileScale, 300));
  }

  /* ── TEMPLATE ── */
  function initTemplate() {
    const select = document.getElementById('template-select');
    if (!select) return;
    let saved = 'modern';
    try { saved = localStorage.getItem('cv_template') || 'modern'; } catch(e) {}
    select.value = saved;
    applyTemplate(saved);
    select.addEventListener('change', () => {
      applyTemplate(select.value);
      try { localStorage.setItem('cv_template', select.value); } catch(e) {}
    });
  }

  function applyTemplate(name) {
    ['cv-root', 'cv-root-mobile'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('data-template', name || 'modern');
    });
  }

  /* ── AUTO SCALE ── */
  function initAutoScale() {
    let timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth > 768) {
          const previewPanel = document.querySelector('.preview-panel');
          if (previewPanel) {
            const avail = previewPanel.clientWidth - 60;
            if (avail > 0) { _currentZoom = Math.max(_minZoom, Math.min(1, avail/794)); applyZoom(); }
          }
        }
      }, 150);
    });
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  }

  /* ── DYNAMIC LISTS ── */
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
      const removeBtn = e.target.closest('.btn-remove-card');
      if (removeBtn) {
        const card = removeBtn.closest('.list-card');
        Model.removeEntry(section, card.dataset.id);
        renderFn(Model.getData()[section]);
        return;
      }
      const header = e.target.closest('.list-card-header');
      if (header && !e.target.closest('.btn-remove-card')) {
        header.closest('.list-card').classList.toggle('collapsed');
      }
    });
  }

  /* ── ADD BUTTONS ── */
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
          const listId = btnId.replace('btn-add-', '') + '-list';
          const list = document.getElementById(listId);
          if (list) {
            setTimeout(() => {
              const last = list.lastElementChild;
              if (last) { last.scrollIntoView({ behavior: 'smooth', block: 'center' }); last.classList.remove('collapsed'); }
            }, 50);
          }
        });
      }
    });
  }

  return {
    init() {
      // Init i18n first (sets lang + translates DOM)
      I18n.init();
      // Init dark mode
      DarkMode.init();
      // Init accent color
      AccentColor.init();

      Model.subscribe(data => {
        View.renderCV(data);
        View.renderCV(data, 'cv-root-mobile');
      });

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
      initPanelResizer();

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
