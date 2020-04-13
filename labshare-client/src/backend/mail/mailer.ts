import nodemailer from "nodemailer";
import Mail from 'nodemailer/lib/mailer';
import { FailedMail } from '../database/database';
import localization from './localization';
import { OPT, CONF } from '../options';
import { LANG, LANG_TYPE } from "../constants";

let TRANSPORTER: Mail

if (OPT.ENABLE_MAIL) {
    TRANSPORTER = nodemailer.createTransport(CONF.MAIL_CONFIG)

    setInterval(retryMails, 1000 * 60 * 10)
    setTimeout(retryMails, 2000)
}

function retryMails() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    // try to deliver failed emails again
    FailedMail.find({ updatedAt: { $gte: d } }).exec().then(docs => {
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

async function sendMessage(message: Mail.Options, storeFailed: boolean = true): Promise<any> {    
    if (OPT.ENABLE_MAIL) {
        return TRANSPORTER.sendMail(message).catch(async (err) => {
            if (storeFailed) {
                let doc = new FailedMail(message)
                await doc.save()
            }
            throw err
        })
    }
    else {
        console.log("Would send an email now!")
        console.log(JSON.stringify(message, null, 4))
    }
}



async function sendMailTo(to: string, subject: string, text: string): Promise<any> {
    let msg: Mail.Options = {
        from: "LabHive <do-not-reply@labhive.de>",
        to: to,
        subject: subject,
        text: text,
    }
    return sendMessage(msg)
}



export async function sendActivationMail(to: string, link: string, language: LANG_TYPE): Promise<any> {
    let subject = localization[language].activationMail.subject.trim()
    let text = localization[language].activationMail.text(link).trim()

    return sendMailTo(to, subject, text)
}


export async function sendPasswordResetMail(to: string, link: string, language: LANG_TYPE): Promise<any> {
    let subject = localization[language].passwordResetMail.subject.trim()
    let text = localization[language].passwordResetMail.text(link).trim()

    return sendMailTo(to, subject, text)
}

export async function sendActivationNotice(to: string, language: LANG_TYPE): Promise<any> {
    let subject = localization[language].activationNotice.subject.trim()
    let text = localization[language].activationNotice.text.trim()

    return sendMailTo(to, subject, text)
}
