

export default {
  en: {
    activationMail: {
      subject: "LabHive - Account activation",
      text: (link: string) => {
        return `
Hallo, 
um Ihren Account auf LabHive zu aktivieren, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team
`
      }
    },
    passwordResetMail: {
      subject: "LabHive - Password Reset",
      text: (link: string) => {
        return `
Hallo, 
um ihr Passwort zurückzusetzen, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team
`
      }
    },
  },



  de: {
    activationMail: {
      subject: "LabHive - Account Aktivierung",
      text: (link: string) => {
        return `
Hallo, 
um Ihren Account auf LabHive zu aktivieren, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team
`
      }
    },
    passwordResetMail: {
      subject: "LabHive - Password Reset",
      text: (link: string) => {
        return `
Hallo, 
um ihr Passwort zurückzusetzen, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team
`
      }
    },
  }
}