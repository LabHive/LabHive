

let locale = localStorage.getItem('locale')
if (!locale) {
    locale = 'en'
}

export let localization = {
    locale: locale,
    fallbackLocale: "en",
    messages: {
      en: {
          
      },
      de: {
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
        postCode: "Postleitzahl",
        consentProcessing:
          "Ich bin damit einverstanden, dass meine Daten von labHive Testshare zum Zweck der Weiterleitung an Labore oder Institute für die Möglichkeit einer Zusammenarbeit im Rahmen der SARS-CoV-2 Pandemie erhoben, verarbeitet und gespeichert werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DS-GVO sind von der Einwilligung unberührt. Weitere Hinweise finden Sie in unserer Datenschutzerklärung.",
        consentContact:
          "Ich bin damit einverstanden, dass meine Kontaktdaten für registrierte Labore oder Institute der Platform über die Suchfunktion einsehbar sind."
      }
    }
  }