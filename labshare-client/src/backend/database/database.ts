import mongoose from "mongoose"
import { IUserHuman, UserHumanSchema } from './schemas/IUserHuman'
import { IUserLab, UserLabSchema } from './schemas/IUserLab'
import { IResetToken, ResetTokenSchema } from './schemas/IResetToken'
import { IUserCommon } from './schemas/IUserCommon'

if (!process.env.PRODUCTION) {
    mongoose.connect("mongodb://localhost:27017/labshare", { useNewUrlParser: true }, err => {
        console.log(err)
    })
} else {
    mongoose.connect("mongodb://mongodb:27017/labshare", { useNewUrlParser: true }, err => {
        console.log(err)
    })
}


export const UserHuman = mongoose.model<IUserHuman>('user_human', UserHumanSchema)
export const UserLab = mongoose.model<IUserLab>('user_lab', UserLabSchema)
export const ResetToken = mongoose.model<IResetToken>('reset_token', ResetTokenSchema)


export async function getUserForMail(email: string): Promise<Optional<IUserCommon>> {
    return getUser({ "contact.email": email })
}

export async function getUser(filter: any): Promise<Optional<IUserCommon>> {
    try {
        let human = await UserHuman.findOne(filter).exec()
        if (!human) {
            throw new Error("not found")
        }
        return human
    } catch { }

    try {
        let lab = await UserLab.findOne(filter).exec()
        if (!lab) {
            throw new Error("not found")
        }
        return lab
    } catch {
        return undefined
    }
}

