

let locale = localStorage.getItem('locale')
if (!locale) {
  locale = 'de'
}

export let localization = {
  locale: locale,
  fallbackLocale: "de",
  messages: {
    en: {
      required: "Required"
    },
    de: {
      backend: {
        formValidation: {
          invalid_email: "Ungültige E-Mail",
          invalid_firstname: "Ungültiger Vorname (max. 200 Zeichen)",
          invalid_lastname: "Ungültiger Nachname (max. 200 Zeichen)",
          invalid_zipcode: "Ungültige PLZ",
          invalid_city: "Ungültige Stadt (max. 200 Zeichen)",
          invalid_street: "Ungültige Straße (max. 200 Zeichen)",
          invalid_phone: "Ungültige Telefonnummer bitte in der Form +49931123 oder 12344 eingeben ohne - oder /",
          invalid_description: "Ungültige Beschreibung (max. 2000 Zeichen)",
          invalid_name: "Ungültiger Laborname (max. 200 Zeichen)",
          invalid_number: "Ungültige Zahl",
          invalid_search: "Ungültiger Suchparameter",
          invalid_role: "Ungültiger Suchtyp",
          invalid_skills: "Ungültige Fähigkeiten",
          invalid_equipment: "Ungültiges Equipment",
          invalid_advice: "Ungültige Anfrage",
          invalid_consent: "Ungültige Einwilligung"
        },
        not_authorized: "Nicht authorisiert!",
        invalid_location: "Ungültige Adresse!",
        internal_error: "Es ist etwas schiefgelaufen...",
        bad_request: "Ungültige Anfrage!",
        invalid_password: "Ungültiges Passwort!",
        invalid_login: "Ungültige Login-Daten!",
        existing_user: "User existiert bereits!",
        false_consent: "Ohne Einwilligung dürfen wir die Daten nicht verarbeiten.",
        no_results: "No results could be found"
      },
      loginInfo: "Login Informationen",
      contactInfo: "Kontakt Informationen",
      register: "Registrieren",
      save: "Speichern",
      email: "E-Mail Adresse",
      password: "Passwort",
      repeatPassword: "Passwort wiederholen",
      firstName: "Vorname",
      lastName: "Nachname",
      phone: "Telefonnummer",
      city: "Ort",
      zipcode: "Postleitzahl",
      street: "Straße",
      organization: "Organisation",
      labName: "Laborname",
      consentProcessing:
        "Ich bin damit einverstanden, dass meine Daten von LabHive zum Zwecke der Zusammenarbeit mit Laboren und Instituten, im Rahmen der SARS-CoV-2 Pandemie, die auf der Plattform registriert sind, über die Suchfunktion einsehbar gemacht wird. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DSGVO sind von der Einwilligung unberührt.<br/>Weitere Hinweise finden Sie in unserer <a href=\"/#/dataProtection\">Datenschutzerklärung.</a>",
      required: "Erforderlich"
    }
  }
}