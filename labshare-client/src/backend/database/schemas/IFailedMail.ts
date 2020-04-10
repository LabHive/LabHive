import { Schema, Document } from "mongoose";
import Mail from 'nodemailer/lib/mailer';
import { ITimestamp } from './ITimestamps';

export interface IFailedMail extends Document, ITimestamp {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

export const FailedMailSchema = new Schema({
    from: String,
    to: String,
    subject: String,
    text: String,
    html: String,
}, {
    timestamps: true
})
