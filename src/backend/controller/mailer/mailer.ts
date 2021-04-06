import Mail from 'nodemailer/lib/mailer'
import nodemailer from "nodemailer";
import { OPT, CONF } from '../config/options';
import { FailedMail } from 'backend/lib/database/models';

let TRANSPORTER: Mail

if (OPT.ENABLE_MAIL) {
  TRANSPORTER = nodemailer.createTransport(CONF.MAIL_CONFIG)
}

export function retryMails() {
  var d = new Date();
  d.setDate(d.getDate() - 1);

  // try to deliver failed emails again
  FailedMail.find({ createdAt: { $gte: d } }).exec().then(docs => {
      for (let i of docs) {
          sendMessage(i.toObject(), false).then(() => {
              i.remove()
          }).catch(() => {
              i.updateOne({ updatedAt: new Date() }).exec()
          })
      }
  }).catch((err) => {
      console.error(err)
  })
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