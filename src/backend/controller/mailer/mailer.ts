import Mail from 'nodemailer/lib/mailer'
import nodemailer from "nodemailer";
import { OPT, CONF } from '../config/options';
import { FailedMail } from 'backend/lib/database/models';

let TRANSPORTER: Mail

if (OPT.ENABLE_MAIL) {
  TRANSPORTER = nodemailer.createTransport(CONF.MAIL_CONFIG)
}

export async function sendMessage(message: Mail.Options, storeFailed: boolean = true): Promise<any> {
  if (OPT.ENABLE_MAIL) {
    return TRANSPORTER.sendMail(message).catch(async (err) => {
      //BotMsg.error(`Failed to send email ${err}`)
      if (storeFailed) {
        let doc = new FailedMail(message)
        doc.save()
      }
      throw err
    })
  }
  else {
    console.log("Would send an email now!")
    console.log(JSON.stringify(message, null, 4))
  }
}