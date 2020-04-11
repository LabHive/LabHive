import { Schema, Document } from "mongoose";
import { ITimestamp } from './ITimestamps';
export interface IUserAdmin extends Document, ITimestamp {
    password: string,
    disabled: boolean,
    contact: {
        email: string,
        firstname: string,
        lastname: string
    }
    role: string
}

export const UserAdminSchema = new Schema({
    password: String,
    disabled: {
        type: Boolean,
        default: false
    },
    contact: {
        email: String,
        firstname: String,
        lastname: String
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    timestamps: true
});
