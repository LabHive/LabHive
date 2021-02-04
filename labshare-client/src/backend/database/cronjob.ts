import { retryMails, sendNotAvailableFinal } from '../mail/mailer'
import { UserVolunteer } from './models'
import { OPT } from '../options'


async function cronjob() {
    let nowMinus3 = new Date()
    nowMinus3.setDate(nowMinus3.getDate() - 3)
    UserVolunteer.find({ availabilityTimer: { $lte: nowMinus3} }).exec().then((users) => {
        for (let i of users) {
            i.availabilityTimer = null;
            i.availability = false;
            sendNotAvailableFinal(i.contact.email, OPT.BASE_URL, i.secretRandomId, i.language)
            i.save()
        }
    })
}


export function scheduleCronjob() {
    setInterval(cronjob, 1000 * 60 * 10)
    setInterval(retryMails, 1000 * 60 * 360)
    setTimeout(cronjob, 2000)
}