import { UserVolunteer, FailedMail } from 'backend/lib/database/models'
import { sendMessage } from '../mailer';


export function retryMails() {
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

async function cronjob() {
    retryMails()

    let nowMinus3 = new Date()
    nowMinus3.setDate(nowMinus3.getDate() - 3)
    UserVolunteer.find({ availabilityTimer: { $lte: nowMinus3} }).exec().then((users) => {
        for (let i of users) {
            i.availabilityTimer = null;
            i.availability = false;
            // FIXME: something is missing here
            //sendNotAvailableFinal(i.contact.email, OPT.BASE_URL, i.secretRandomId, i.language)
            i.save()
        }
    })
}


export function scheduleCronjob() {
    setInterval(cronjob, 1000 * 60 * 10)
    setInterval(retryMails, 1000 * 60 * 360)
    setTimeout(cronjob, 2000)
}