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
      required: "Required",
      consentMail: "I agree that LabHive sends me from time to time E-Mail-Updates about new features of the platform.",
      agree: "I agree.",
      not_agree: "I don't agree.",
      deleteProfile: "Delete Profile",
      delete: "Delete",
      cancel: "Cancel",
      deleteConfirmation: "Do you really want to delete your profile?",

      "bsl1": "Work under BSL2 regulations/safety standards",
      "bsl2": "Work under BSL2 regulations/safety standards",
      "bsl3": "ork under BSL3 regulations/safety standards",
      "bsl4": "Work under BSL4 regulations/safety standards",
      "qpcr": "qPCR",
      "rnaExperience_isolation": "RNA isolation (with kit)",
      "sample_processing": "(Pre)Processing of clinical samples",
      "elisa": "ELISA",
      "primerProduction": "Primerherstellung",
      "dataAnalysis": "Datenanalyse",

      "calibratedPipetteSet": "Calibrated Pipette Set",
      "rtThermocycler": "Thermocycler RT",
      "qpcrThermocycler": "Thermocycler qPCR",
      "reverseTransKit": "Reverse Transcriptase Kit",
      "pcrMasterMix": "PCR Master Mix",
      "rnaExtractionDevice": "RNA Extraction Device",
      "rnaExtractionKit": "RNA Extraction Kit",

      "virology": "Virologie",
      "qPCR": "Allgemein qPCR",
      "protocolProduction": "Protokollerstellung",

      "jobTraining": "Berufsausbildung",
      "mtla": "MTLA",
      "bta_cta": "BTA/CTA",
      "bachelor": "Bachelor",
      "master": "Master",
      "doctorate": "Promotion",
      "postdoc": "Postdoc",
      "groupLeader": "Gruppenleiter*in",
      "other": "Andere"
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
          invalid_consent: "Ungültige Einwilligung",
          invalid_url: "Ungültige URL, muss mit http:// oder https:// beginnen.",
          passwordMatch: "Passwörter stimmen nicht überein!"
        },
        not_authorized: "Nicht authorisiert!",
        invalid_location: "Ungültige Adresse!",
        internal_error: "Es ist etwas schiefgelaufen...",
        bad_request: "Ungültige Anfrage!",
        invalid_password: "Ungültiges Passwort!",
        invalid_login: "Ungültige Login-Daten!",
        existing_user: "User existiert bereits!",
        false_consent: "Ohne Einwilligung dürfen wir die Daten nicht verarbeiten.",
        no_results: "No results could be found",
        tokenTooOld: "Bitte setzen Sie das Passwort erneut zurück, der Link ist abgelaufen.",
        contact_support: "Ein Fehler ist aufgetreten, bitte wenden Sie sich an support@labhive.de. Bitte entschuldigen Sie die Umstände!",
        user_not_activated: "Der Benutzer ist noch nicht aktiviert. Zur Aktivierung Ihres Accounts müssen Sie die E-Mail Adresse bestätigen. Sollten Sie sich als Labor registriert haben, werden Sie von uns manuell verifiziert. Sobald dies geschehen ist, erhalten Sie von uns eine E-Mail. Sollte es länger als 2 Werktage dauern, kontaktieren Sie uns bitte unter support@labhive.de.",
        user_disabled: "Ihr Account wurde von uns deaktiviert. Bei Fragen wenden Sie sich bitte an support@labhive.de."
      },
      save: "Speichern",
      consentPublicSearch:
        "Ich bin damit einverstanden, dass meine Daten von LabHive zum Zwecke der Zusammenarbeit mit Laboren und Instituten, im Rahmen der SARS-CoV-2 Pandemie, die auf der Plattform registriert sind, über die Suchfunktion einsehbar gemacht werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DSGVO sind von der Einwilligung unberührt.<br/>Wenn Sie uns keine Einwilligung erteilen, ist die Verwendung unserer Plattform nur ehr eingeschränkt möglich, wodurch Sie als Helfende*r nicht über die Suche gefunden werden können. Momentan gibt es auch noch keine Möglichkeit Kontakt zu einem registrierten und verifizierten Labor aufzunehmen.<br/>Weitere Hinweise finden Sie in unserer <a href=\"/#/privacyPolicy\">Datenschutzerklärung.</a>",
      consentMail: "Hiermit willige ich ein, dass LabHive mir gelegentlich E-Mail-Benachrichtigungen über Updates und neue Funktionen der Website schickt.",
      required: "Erforderlich",
      agree: "Ich willige ein.",
      not_agree: "Ich willige nicht ein.",
      qualification: "Qualifikation",
      deleteProfile: "Profil löschen",
      delete: "Löschen",
      cancel: "Abbruch",
      deleteConfirmation: "Wollen Sie ihr Profil wirklich löschen?",


      "bsl1": "Arbeit unter BSL1 Bedingungen/Sicherheitsstandards",
      "bsl2": "Arbeit unter BSL2 Bedingungen/Sicherheitsstandards",
      "bsl3": "Arbeit unter BSL3 Bedingungen/Sicherheitsstandards",
      "bsl4": "Arbeit unter BSL4 Bedingungen/Sicherheitsstandards",
      "qpcr": "qPCR",
      "rnaExperience_isolation": "RNA-Isolation (mit Kit)",
      "sample_processing": "Vor/Aufbereitung klinischer Proben",
      "elisa": "ELISA",
      "primerProduction": "Primerherstellung",
      "dataAnalysis": "Datenanalyse",

      "calibratedPipetteSet": "Calibrated Pipette Set",
      "rtThermocycler": "Thermocycler RT",
      "qpcrThermocycler": "Thermocycler qPCR",
      "reverseTransKit": "Reverse Transcriptase Kit",
      "pcrMasterMix": "PCR Master Mix",
      "rnaExtractionDevice": "RNA Extraction Device",
      "rnaExtractionKit": "RNA Extraction Kit",

      "virology": "Virologie",
      "qPCR": "Allgemein qPCR",
      "protocolProduction": "Protokollerstellung",

      "jobTraining": "Berufsausbildung",
      "mtla": "MTLA",
      "bta_cta": "BTA/CTA",
      "bachelor": "Bachelor",
      "master": "Master",
      "doctorate": "Promotion",
      "postdoc": "Postdoc",
      "groupLeader": "Gruppenleiter*in",
      "other": "Andere"
    }
  }
}
