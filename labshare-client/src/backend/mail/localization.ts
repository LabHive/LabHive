

export default {
  en: {
    activationMail: {
      subject: "LabHive - Account activation",
      text: (link: string) => {
        return `
Dear user, 
to activate your account on LabHive, please use the following link:
${link}

Best, LabHive Team
`
      }
    },
    passwordResetMail: {
      subject: "LabHive - Password Reset",
      text: (link: string) => {
        return `
Dear user, 
to reset your password, please use the following link:
${link}

Best, LabHive Team
`
      }
    },
    activationNotice: {
      subject: "LabHive - Account verifiziert",
      text: `
Dear user,
Your account has been successfully verified.

Best, LabHive Team
      `
    }
  },



  de: {
    activationMail: {
      subject: "LabHive - Account Aktivierung",
      text: (link: string) => {
        return `
Liebe/r Nutzer/in,
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
Liebe/r Nutzer/in,
um ihr Passwort zurückzusetzen, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team
`
      }
    },
    activationNotice: {
      subject: "LabHive - Account verifiziert",
      text: `
Liebe/r Nutzer/in,
Ihr Account wurde von uns erfolgreich verifiziert.

Ihr LabHive Team
      `
    }
  }
}
