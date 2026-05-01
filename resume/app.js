// ====================== MODEL ======================
const Model = {
    data: {
        personalData: {
            firstName: "Anna",
            lastName: "Schmidt",
            title: "Dipl.-Betriebswirtin (FH)",
            birthDate: "15.03.1992",
            address: "Musterstraße 12",
            location: "80331 München",
            phone: "+49 176 12345678",
            email: "anna.schmidt@email.de",
            nationality: "Deutsch"
        },
        experience: [
            {
                id: 1,
                position: "Vertriebsleiterin",
                company: "Muster GmbH",
                location: "München",
                startDate: "01.2023",
                endDate: "heute",
                description: "Leitung des VertriebsTeams (12 Mitarbeiter). Umsatzsteigerung um 28% im Geschäftsjahr 2024."
            },
            {
                id: 2,
                position: "Key Account Managerin",
                company: "TechSolutions AG",
                location: "Stuttgart",
                startDate: "06.2019",
                endDate: "12.2022",
                description: "Betreuung strategischer Großkunden. Erfolgreiche Vertragsverlängerungen im Wert von über 2,4 Mio. €."
            }
        ],
        education: [
            {
                id: 1,
                degree: "Bachelor of Arts - Betriebswirtschaftslehre",
                institution: "Hochschule München",
                location: "München",
                startDate: "10.2014",
                endDate: "02.2018",
                description: "Schwerpunkt: Marketing & Vertrieb"
            }
        ],
        certifications: [
            {
                id: 1,
                title: "Projektmanagement nach IPMA Level D",
                institution: "GPM Deutsche Gesellschaft für Projektmanagement",
                date: "03.2024"
            }
        ],
        skills: "Projektmanagement • Vertriebssteuerung • CRM-Systeme (Salesforce) • Verhandlungsführung • MS Office (Excel fortgeschritten) • Präsentationstechniken",
        languages: [
            { id: 1, language: "Deutsch", level: "Muttersprache" },
            { id: 2, language: "Englisch", level: "Fließend (C1)" },
            { id: 3, language: "Französisch", level: "Grundkenntnisse (A2)" }
        ],
        additionalInfo: "Führerschein Klasse B • Bereitschaft zu Dienstreisen"
    },

    updatePersonal(field, value) {
        this.data.personalData[field] = value;
        this.notify();
    },

    addExperience(exp) {
        this.data.experience.unshift(exp);
        this.notify();
    },

    removeExperience(id) {
        this.data.experience = this.data.experience.filter(e => e.id !== id);
        this.notify();
    },

    updateExperience(id, field, value) {
        const exp = this.data.experience.find(e => e.id === id);
        if (exp) exp[field] = value;
        this.notify();
    },

    // Similar methods for other arrays...
    addEducation(edu) { this.data.education.unshift(edu); this.notify(); },
    removeEducation(id) { this.data.education = this.data.education.filter(e => e.id !== id); this.notify(); },

    addCertification(cert) { this.data.certifications.unshift(cert); this.notify(); },
    removeCertification(id) { this.data.certifications = this.data.certifications.filter(c => c.id !== id); this.notify(); },

    updateSkills(value) {
        this.data.skills = value;
        this.notify();
    },

    addLanguage(lang) { this.data.languages.push(lang); this.notify(); },
    removeLanguage(id) { this.data.languages = this.data.languages.filter(l => l.id !== id); this.notify(); },

    updateAdditionalInfo(value) {
        this.data.additionalInfo = value;
        this.notify();
    },

    notify() {
        if (this.onChange) this.onChange(this.data);
    },

    setOnChange(callback) {
        this.onChange = callback;
    }
};

// ====================== VIEW ======================
const View = {
    renderCV(data) {
        const cv = document.getElementById('cvPreview');
        
        let html = `
            <div class="cv-header">
                <div class="cv-personal">
                    <div class="cv-name">${data.personalData.firstName} ${data.personalData.lastName}</div>
                    <div class="cv-title">${data.personalData.title}</div>
                    <div class="cv-contact">
                        ${data.personalData.address} • ${data.personalData.location}<br>
                        ${data.personalData.phone} • ${data.personalData.email}<br>
                        Geboren am ${data.personalData.birthDate} • ${data.personalData.nationality}
                    </div>
                </div>
                <div class="cv-photo" id="cvPhoto"></div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">Berufserfahrung</div>
        `;

        data.experience.forEach(exp => {
            html += `
                <div class="experience-item">
                    <div class="date-column">${exp.startDate} – ${exp.endDate}</div>
                    <div class="content-column">
                        <h4>${exp.position}</h4>
                        <p><strong>${exp.company}</strong> ${exp.location ? `• ${exp.location}` : ''}</p>
                        <p>${exp.description}</p>
                    </div>
                </div>
            `;
        });

        html += `</div><div class="cv-section">
                <div class="cv-section-title">Ausbildung</div>`;

        data.education.forEach(edu => {
            html += `
                <div class="education-item">
                    <div class="date-column">${edu.startDate} – ${edu.endDate}</div>
                    <div class="content-column">
                        <h4>${edu.degree}</h4>
                        <p>${edu.institution} ${edu.location ? `• ${edu.location}` : ''}</p>
                        \( {edu.description ? `<p> \){edu.description}</p>` : ''}
                    </div>
                </div>
            `;
        });

        html += `</div><div class="cv-section">
                <div class="cv-section-title">Weiterbildung</div>`;

        data.certifications.forEach(cert => {
            html += `
                <div class="cert-item">
                    <div class="date-column">${cert.date}</div>
                    <div class="content-column">
                        <h4>${cert.title}</h4>
                        <p>${cert.institution}</p>
                    </div>
                </div>
            `;
        });

        html += `</div><div class="cv-section">
                <div class="cv-section-title">Fähigkeiten</div>
                <div class="skills-list">
                    \( {data.skills.split('•').map(skill => `<div> \){skill.trim()}</div>`).join('')}
                </div>
            </div>`;

        // Languages
        html += `<div class="cv-section">
                <div class="cv-section-title">Sprachen</div>
                <div class="languages-list">`;

        data.languages.forEach(lang => {
            html += `<div class="language-item"><span>\( {lang.language}</span><span> \){lang.level}</span></div>`;
        });

        html += `</div></div>`;

        if (data.additionalInfo) {
            html += `
                <div class="cv-section">
                    <div class="cv-section-title">Sonstiges</div>
                    <p>${data.additionalInfo}</p>
                </div>
            `;
        }

        html += `<div class="branding">Erstellt mit aljrad.com</div>`;

        cv.innerHTML = html;

        // Update photo
        const photoEl = document.getElementById('cvPhoto');
        if (data.photoUrl) {
            photoEl.style.backgroundImage = `url('${data.photoUrl}')`;
        }
    },

    renderExperienceList(experiences) {
        const container = document.getElementById('experienceList');
        container.innerHTML = '';
        
        experiences.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'entry';
            div.innerHTML = `
                <div class="entry-buttons">
                    <button onclick="Controller.removeExperience(${exp.id})">×</button>
                </div>
                <input type="text" value="${exp.position}" placeholder="Position" 
                       onchange="Controller.updateExperience(${exp.id}, 'position', this.value)">
                <input type="text" value="${exp.company}" placeholder="Unternehmen" 
                       onchange="Controller.updateExperience(${exp.id}, 'company', this.value)">
                <input type="text" value="${exp.location}" placeholder="Ort" 
                       onchange="Controller.updateExperience(${exp.id}, 'location', this.value)">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;">
                    <input type="text" value="${exp.startDate}" placeholder="Von (MM.JJJJ)" 
                           onchange="Controller.updateExperience(${exp.id}, 'startDate', this.value)">
                    <input type="text" value="${exp.endDate}" placeholder="Bis (MM.JJJJ oder heute)" 
                           onchange="Controller.updateExperience(${exp.id}, 'endDate', this.value)">
                </div>
                <textarea rows="3" style="margin-top:8px;width:100%" 
                          onchange="Controller.updateExperience(\( {exp.id}, 'description', this.value)"> \){exp.description}</textarea>
            `;
            container.appendChild(div);
        });
    },

    // Similar render functions for education, certifications, languages...
    renderEducationList(educations) {
        // Simplified - would be expanded in full version
        const container = document.getElementById('educationList');
        container.innerHTML = educations.map(edu => `
            <div class="entry">
                <button onclick="Controller.removeEducation(${edu.id})" style="position:absolute;top:10px;right:10px">×</button>
                <input type="text" value="\( {edu.degree}" onchange="Controller.updateEducation( \){edu.id}, 'degree', this.value)">
                <input type="text" value="\( {edu.institution}" onchange="Controller.updateEducation( \){edu.id}, 'institution', this.value)">
            </div>
        `).join('');
    },

    renderLanguages(languages) {
        // Placeholder
    }
};

// ====================== CONTROLLER ======================
const Controller = {
    init() {
        Model.setOnChange((data) => {
            View.renderCV(data);
            View.renderExperienceList(data.experience);
            View.renderEducationList(data.education);
        });

        this.bindEvents();
        this.loadInitialData();
    },

    bindEvents() {
        // Personal data inputs
        document.querySelectorAll('#form input[data-model], #skills, #additionalInfo').forEach(input => {
            input.addEventListener('input', (e) => {
                const field = e.target.id;
                if (field === 'skills') {
                    Model.updateSkills(e.target.value);
                } else if (field === 'additionalInfo') {
                    Model.updateAdditionalInfo(e.target.value);
                } else {
                    const personalField = field.replace(/^(firstName|lastName|title|birthDate|address|location|phone|email|nationality)$/, '$1');
                    Model.updatePersonal(personalField, e.target.value);
                }
            });
        });

        // Photo upload
        document.getElementById('photoUpload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    Model.data.photoUrl = ev.target.result;
                    Model.notify();
                };
                reader.readAsDataURL(file);
            }
        });

        // Add buttons
        document.getElementById('addExperience').addEventListener('click', () => {
            const newExp = {
                id: Date.now(),
                position: "Neue Position",
                company: "Unternehmen",
                location: "Ort",
                startDate: "01.2025",
                endDate: "heute",
                description: ""
            };
            Model.addExperience(newExp);
        });

        document.getElementById('addEducation').addEventListener('click', () => {
            const newEdu = {
                id: Date.now(),
                degree: "Neuer Abschluss",
                institution: "Institution",
                location: "Ort",
                startDate: "10.2020",
                endDate: "09.2024",
                description: ""
            };
            Model.addEducation(newEdu);
        });

        document.getElementById('addCertification').addEventListener('click', () => {
            const newCert = {
                id: Date.now(),
                title: "Neue Weiterbildung",
                institution: "Anbieter",
                date: "01.2025"
            };
            Model.addCertification(newCert);
        });

        // PDF Download
        document.getElementById('downloadPDF').addEventListener('click', () => {
            window.print();
        });
    },

    loadInitialData() {
        // Populate form with dummy data
        const pd = Model.data.personalData;
        document.getElementById('firstName').value = pd.firstName;
        document.getElementById('lastName').value = pd.lastName;
        document.getElementById('title').value = pd.title;
        document.getElementById('birthDate').value = pd.birthDate;
        document.getElementById('address').value = pd.address;
        document.getElementById('location').value = pd.location;
        document.getElementById('phone').value = pd.phone;
        document.getElementById('email').value = pd.email;
        document.getElementById('nationality').value = pd.nationality;

        document.getElementById('skills').value = Model.data.skills;
        document.getElementById('additionalInfo').value = Model.data.additionalInfo;

        // Initial render
        Model.notify();
    },

    removeExperience(id) {
        Model.removeExperience(id);
    },

    updateExperience(id, field, value) {
        Model.updateExperience(id, field, value);
    },

    removeEducation(id) {
        Model.removeEducation(id);
    },

    updateEducation(id, field, value) {
        // Would be implemented in full Model
        Model.notify();
    }
};

// Initialize the app
window.onload = () => {
    Controller.init();
};