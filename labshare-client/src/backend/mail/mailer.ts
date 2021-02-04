import nodemailer from "nodemailer";
import Mail from 'nodemailer/lib/mailer';
import { FailedMail } from "../database/models";
import localization from './localization';
import { OPT, CONF } from '../options';
import { LANG, LANG_TYPE } from "../constants";
import { BotMsg } from '../discordBot/bot';

let TRANSPORTER: Mail

if (OPT.ENABLE_MAIL) {
    TRANSPORTER = nodemailer.createTransport(CONF.MAIL_CONFIG)
}

export function retryMails() {
    var d = new Date();
    d.setDate(d.getDate() - 1);

    // try to deliver failed emails again
    FailedMail.find({ updatedAt: { $gte: d } }).exec().then(docs => {
        for (let i of docs) {
            sendMessage(i.toObject(), false).then(() => {
                i.remove()
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
                BotMsg.error(`Failed to send email...`)
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

export async function sendNotAvailableNotice(to: string, baseUrl: string, userId: string, language: LANG_TYPE): Promise<any> {
    let url_notAvailable = baseUrl + "/#/updateAvailability?status=0&id=" + userId
    let url_stillAvailable = baseUrl + "/#/updateAvailability?status=1&id=" + userId
    
    let subject = localization[language].notAvailableNotice.subject.trim()
    let text = localization[language].notAvailableNotice.text(url_notAvailable, url_stillAvailable).trim()

    return sendMailTo(to, subject, text)
}

export async function sendNotAvailableFinal(to: string, baseUrl: string, userId: string, language: LANG_TYPE): Promise<any> {
    let url_stillAvailable = baseUrl + "/#/updateAvailability?status=1&id=" + userId
    
    let subject = localization[language].notAvailableFinal.subject.trim()
    let text = localization[language].notAvailableFinal.text(url_stillAvailable).trim()

    return sendMailTo(to, subject, text)
}
