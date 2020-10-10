

export default {
  en: {
    activationMail: {
      subject: "Account activation",
      text: (link: string) => {
        return `
Dear user,
To activate your account on LabHive, please use the following link:
${link}

Best regards
LabHive`
      }
    },
    passwordResetMail: {
      subject: "Password Reset",
      text: (link: string) => {
        return `
Dear user,
to reset your password, please use the following link:
${link}

Best regards
LabHive`
      }
    },
    activationNotice: {
      subject: "Account verified",
      text: `
Dear user,
Your account has been successfully verified.

Best regards
LabHive`
    },
    notAvailableNotice: {
      subject: "No time to help out anymore?",
      text: (notAvailable: string, stillAvailable: string) => `
Dear user,
a verified diagnostic centre or research laboratory has informed us that you no longer have time to help out.
If you do NOT agree to this, please click on the following link:
${stillAvailable}

If you really have no time left, please use this link:
${notAvailable}

If you forget to click on one of the links, your profile will automatically be marked as "no longer available" in 3 days. However, this could mean that you will receive further requests from diagnostic centres or research laboratories during this time.

Your account on LabHive will not be deleted, you can change the information in your profile settings at any time!

Best regards
LabHive`
    },
    notAvailableFinal: {
      subject: "Availability status updated",
      text: (stillAvailable: string) => `
Dear user,
because you have not reacted to our email within 3 days, your availability status has been updated to "no longer available".
If you do have time to help out in a diagnostic centre again, please click on the following link:
${stillAvailable}

Your account on LabHive has not been deleted, you can change the information in your profile settings at any time!

Best regards
LabHive`
    }
  },


  de: {
    activationMail: {
      subject: "Account Aktivierung",
      text: (link: string) => {
        return `
Liebe/r Nutzer/in,
um Ihren Account auf LabHive zu aktivieren, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team`
      }
    },
    passwordResetMail: {
      subject: "Password Reset",
      text: (link: string) => {
        return `
Liebe/r Nutzer/in,
um ihr Passwort zurückzusetzen, verwenden Sie bitte folgenden Link:
${link}

Ihr LabHive Team`
      }
    },
    activationNotice: {
      subject: "Account verifiziert",
      text: `
Liebe/r Nutzer/in,
Ihr Account wurde von uns erfolgreich verifiziert.

Ihr LabHive Team`
    },
    notAvailableNotice: {
      subject: "Keine Zeit mehr auszuhelfen?",
      text: (notAvailable: string, stillAvailable: string) => `
Liebe/r Nutzer/in,
ein verifiziertes Diagnostikzentrum oder Forschungslabor hat uns mitgeteilt, dass Sie keine Zeit mehr zum Aushelfen haben.
Sollte dies NICHT zustimmen, klicken Sie bitte auf folgenden Link:
${stillAvailable}

Wenn Sie wirklich keine Zeit mehr haben, verwenden Sie bitte diesen Link:
${notAvailable}

Sollten Sie vergessen auf einen Link zu klicken, wird ihr Profil in 3 Tagen automatisch als "nicht mehr verfügbar" markiert. Dies könnte aber dazu führen, dass Sie in dieser Zeit weitere Anfragen von Diagnostikzentren oder Forschungslaboren erhalten.

Ihr Account auf LabHive wird nicht gelöscht, in den Profileinstellungen können Sie die Angaben jederzeit ändern!

Ihr LabHive Team`
    },
    notAvailableFinal: {
      subject: "Verfügbarkeitsstatus aktualisiert",
      text: (stillAvailable: string) => `
Liebe/r Nutzer/in,
da Sie 3 Tage lang nicht auf unsere E-Mail reagiert haben, wurde ihren Verfügbarkeitsstatus auf "nicht mehr verfügbar" aktualisiert.
Sollten Sie doch wieder Zeit haben, um in einem Diagnostikzentrum auszuhelfen, klicken sie bitte auf folgenden Link:
${stillAvailable}

Ihr Account auf LabHive wurde nicht gelöscht, in den Profileinstellungen können Sie die Angaben jederzeit ändern!

Ihr LabHive Team`
    }
  }
}
