let locale = localStorage.getItem('locale')
if (!locale) {
  locale = 'de'
}

export let localization = {
  locale: locale,
  fallbackLocale: "de",
  silentFallbackWarn: true,
  messages: {
    en: {
      "Textqualif-vol": "Scientific staff or technical assistants with training and experience in the use of laboratory equipment, sample preparation or data analysis",
      "Textres-lab": "Academic or industrial research institutes with access to reagents, devices, or suitable laboratory space (BSL-2/3)",
      "Textdiag-cent": "Active diagnostic centers that currently offer SARS-CoV-2 tests including sample processing and analysis",
      signUp: "Sign up",
      login: "Log In",
      
      backend: {
        formValidation: {
          // english should go below here
          invalid_email: "Invalid e-mail address",
          invalid_firstname: "Invalid first name (max. 200 characters)",
          invalid_lastname: "Invalid last name (max. 200 characters)",
          invalid_zipcode: "Invalid zip code (should be 5 digits)",
          invalid_city: "Invalid city (max. 200 characters)",
          invalid_street: "Invalid street (max. 200 characters)",
          invalid_phone: "Invalid phone number. Please use the format +49931123 or 12344 without - or /",
          invalid_description: "Invalid description (max. 2000 characters)",
          invalid_name: "Invalid laboratory name (max. 200 characters)",
          invalid_number: "Invalid number",
          invalid_search: "Invalid search parameter",
          invalid_role: "Invalid search type",
          invalid_skills: "Invalid skills",
          invalid_equipment: "Invalid equipment",
          invalid_advice: "Invalid request",
          invalid_consent: "Invalid consent",
          invalid_url: "Invalid URL. URLs must start with http:// or https:// ",
          passwordMatch: "Passwords don't match!"
        },
        not_authorized: "Not authorized!",
        invalid_location: "Invalid address!",
        internal_error: "Something went wrong...",
        bad_request: "Invalid request!",
        invalid_password: "Invalid password!",
        invalid_login: "Invalid login details!",
        existing_user: "User already exists!",
        false_consent: "Whithout consent, we're not allowed to process your data.",
        no_results: "No results were found...",
        tokenTooOld: "Please reset your password again, the reset link expired.",
        contact_support: "An error has occurred. Please contact support@labhive.de. We apologize for the inconvenience!",
        user_not_activated: "The user hasn't been activated yet. Please validate the e-mail address. If you registered as laboratory, you will be manually verified by us. When that has been done, you will receive an e-mail from us. If this takes longer than two working days, please contact us at support@labhive.de.",
        user_disabled: "Your account was deactivated. In case of questions, please contact support@labhive.de.",
        featureNotAvailableForRole: "This feature is not available for your user role."
      },
      save: "Save",
      consentPublicSearch:
        "I agree that LabHive may make my data accessible via the search function for the purpose of cooperation with laboratories and institutes, in the context of the SARS-CoV-2 pandemic, which are registered on the platform. The right to revoke this agreement and my rights in accordance with Art. 15 DSGVO are not affected by this consent.<br/>If you do not give us your consent, the use of our platform is only possible to a limited extent, which means that you cannot be found as a helper via the search function. Currently there is no possibility for helpers to contact a registered and verified laboratory.<br/><br/>You will find further information in our <a href=\"/#/privacyPolicy\">privacy policy</a>.",
      consentMail: "I hereby authorize LabHive to send me occasional e-mail notifications about updates and new features of the website.",
      required: "Required",
      agree: "I give consent.",
      not_agree: "I don't give consent.",
      qualification: "Qualification",
      deleteProfile: "Delete Profile",
      delete: "Delete",
      cancel: "Cancel",
      deleteConfirmation: "Do you really want to delete your profile?",

      bsl1: "Work under BSL1 safety standards",
      bsl2: "Work under BSL2 safety standards",
      bsl3: "Work under BSL3 safety standards",
      bsl4: "Work under BSL4 safety standards",
      qpcr: "qPCR",
      rnaExperience_isolation: "Work with RNA (esp. isolation with kit)",
      sample_processing: "(Pre-)Processing of clinical samples",
      elisa: "ELISA",
      primerProduction: "Primer production",
      dataAnalysis: "Data analysis",

      calibratedPipetteSet: "Calibrated pipette set",
      rtThermocycler: "Thermocycler RT",
      qpcrThermocycler: "Thermocycler qPCR",
      reverseTransKit: "Reverse transcriptase kit",
      pcrMasterMix: "PCR master mix",
      rnaExtractionDevice: "RNA extraction device",
      rnaExtractionKit: "RNA extraction kit",

      virology: "Virology",
      protocolProduction: "Writing of protocols",

      jobTraining: "Job training",
      mtla: "MTLA",
      bta_cta: "BTA/CTA",
      bachelor: "Bachelor (completed)",
      master: "Master (completed)",
      doctorate: "PhD Student",
      postdoc: "Postdoc",
      groupLeader: "Group Leader",
      other: "Andere"
    },
    de: {
      "Textqualif-vol": "Wissenschaftliche Mitarbeiter oder Technische Assistenten mit Ausbildung und Erfahrung in der Anwendung von Laborgeräten, Probenvorbereitung oder Datenanalyse",
      "Textres-lab": "Akademische oder industrielle Forschungseinrichtungen mit Zugang zu Reagenzien, Geräte oder geeigneten Laboren (BSL-2/3)",
      "Textdiag-cent": "Aktive Diagnostikzentren, die derzeit SARS-CoV-2 Tests anbieten, d.h. Proben verarbeiten und Analysen durchführen",

      signUp: "Registrieren",
      login: "Login",

      backend: {
        formValidation: {
          // german translation, no action needed here.
          invalid_email: "Ungültige E-Mail-Adresse",
          invalid_firstname: "Ungültiger Vorname (max. 200 Zeichen)",
          invalid_lastname: "Ungültiger Nachname (max. 200 Zeichen)",
          invalid_zipcode: "Ungültige PLZ (5 Ziffern bitte)",
          invalid_city: "Ungültige Stadt (max. 200 Zeichen)",
          invalid_street: "Ungültige Straße (max. 200 Zeichen)",
          invalid_phone: "Ungültige Telefonnummer. Bitte in der Form +49931123 oder 12344 eingeben ohne - oder /",
          invalid_description: "Ungültige Beschreibung (max. 2000 Zeichen)",
          invalid_name: "Ungültiger Laborname (max. 200 Zeichen)",
          invalid_number: "Ungültige Zahl",
          invalid_search: "Ungültiger Suchparameter",
          invalid_role: "Ungültiger Suchtyp",
          invalid_skills: "Ungültige Fähigkeiten",
          invalid_equipment: "Ungültiges Equipment",
          invalid_advice: "Ungültige Anfrage",
          invalid_consent: "Ungültige Einwilligung",
          invalid_url: "Ungültige URL, muss mit http:// oder https:// beginnen.",
          passwordMatch: "Passwörter stimmen nicht überein!"
        },
        not_authorized: "Nicht authorisiert!",
        invalid_location: "Ungültige Adresse!",
        internal_error: "Es ist etwas schiefgelaufen...",
        bad_request: "Ungültige Anfrage!",
        invalid_password: "Ungültiges Passwort!",
        invalid_login: "Ungültige Zugangsdaten!",
        existing_user: "User existiert bereits!",
        false_consent: "Ohne Einwilligung dürfen wir die Daten nicht verarbeiten.",
        no_results: "Nichts gefunden...",
        tokenTooOld: "Bitte setzen Sie das Passwort erneut zurück, der Link ist abgelaufen.",
        contact_support: "Ein Fehler ist aufgetreten, bitte wenden Sie sich an support@labhive.de. Bitte entschuldigen Sie die Umstände!",
        user_not_activated: "Der Benutzer ist noch nicht aktiviert. Zur Aktivierung Ihres Accounts müssen Sie die E-Mail Adresse bestätigen. Sollten Sie sich als Labor registriert haben, werden Sie von uns manuell verifiziert. Sobald dies geschehen ist, erhalten Sie von uns eine E-Mail. Sollte es länger als 2 Werktage dauern, kontaktieren Sie uns bitte unter support@labhive.de.",
        user_disabled: "Ihr Account wurde von uns deaktiviert. Bei Fragen wenden Sie sich bitte an support@labhive.de.",
        featureNotAvailableForRole: "Die Funktion ist für Ihre Nutzerrolle nicht verfügbar."
      },
      save: "Speichern",
      consentPublicSearch:
        "Ich bin damit einverstanden, dass meine Daten von LabHive zum Zwecke der Zusammenarbeit mit Laboren und Instituten, im Rahmen der SARS-CoV-2 Pandemie, die auf der Plattform registriert sind, über die Suchfunktion einsehbar gemacht werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DSGVO sind von der Einwilligung unberührt.<br/>Wenn Sie uns keine Einwilligung erteilen, ist die Verwendung unserer Plattform nur ehr eingeschränkt möglich, wodurch Sie als Helfende*r nicht über die Suche gefunden werden können. Momentan gibt es als Helfer noch keine Möglichkeit Kontakt zu einem registrierten und verifizierten Labor aufzunehmen.<br/>Weitere Hinweise finden Sie in unserer <a href=\"/#/privacyPolicy\">Datenschutzerklärung</a>.",
      consentMail: "Hiermit willige ich ein, dass LabHive mir gelegentlich E-Mail-Benachrichtigungen über Updates und neue Funktionen der Website schickt.",
      required: "Erforderlich",
      agree: "Ich willige ein.",
      not_agree: "Ich willige nicht ein.",
      qualification: "Qualifikation",
      deleteProfile: "Profil löschen",
      delete: "Löschen",
      cancel: "Abbruch",
      deleteConfirmation: "Wollen Sie ihr Profil wirklich löschen?",


      bsl1: "Arbeit unter BSL1 Sicherheitsstandards",
      bsl2: "Arbeit unter BSL2 Sicherheitsstandards",
      bsl3: "Arbeit unter BSL3 Sicherheitsstandards",
      bsl4: "Arbeit unter BSL4 Sicherheitsstandards",
      qpcr: "qPCR",
      rnaExperience_isolation: "Arbeit mit RNA (insbes. Isolation mit Kit)",
      sample_processing: "Vor/Aufbereitung klinischer Proben",
      elisa: "ELISA",
      primerProduction: "Primerherstellung",
      dataAnalysis: "Datenanalyse",

      calibratedPipetteSet: "Calibrated Pipette Set",
      rtThermocycler: "Thermocycler RT",
      qpcrThermocycler: "Thermocycler qPCR",
      reverseTransKit: "Reverse Transkriptase-Kit",
      pcrMasterMix: "PCR Master Mix",
      rnaExtractionDevice: "RNA-Extraktionsgerät",
      rnaExtractionKit: "RNA-Extraktionskit",

      virology: "Virologie",
      protocolProduction: "Protokollerstellung",

      jobTraining: "Berufsausbildung",
      mtla: "MTLA",
      bta_cta: "BTA/CTA",
      bachelor: "Bachelor (abgeschlossen)",
      master: "Master (abgeschlossen)",
      doctorate: "Promotionsstudent*in",
      postdoc: "Postdoc",
      groupLeader: "Gruppenleiter*in",
      other: "Andere"
    }
  }
}
