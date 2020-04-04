import mongoose, { Model } from "mongoose"
import { IUserVolunteer, UserVolunteerSchema } from './schemas/IUserVolunteer'
import { IUserLabDiag, UserLabDiagSchema } from './schemas/IUserLabDiag'
import { IResetToken, ResetTokenSchema } from './schemas/IResetToken'
import { IUserCommon } from './schemas/IUserCommon'
import { UserLabResearchSchema, IUserLabResearch } from './schemas/IUserLabResearch'
import { UserRoles } from '../../lib/userRoles'

if (!process.env.PRODUCTION) {
    mongoose.connect("mongodb://localhost:27017/labshare", { useNewUrlParser: true }, err => {
        console.log(err)
    })
} else {
    mongoose.connect("mongodb://mongodb:27017/labshare", { useNewUrlParser: true }, err => {
        console.log(err)
    })
}


export const UserVolunteer = mongoose.model<IUserVolunteer>('user_volunteer', UserVolunteerSchema)
export const UserLabDiag = mongoose.model<IUserLabDiag>('user_labDiag', UserLabDiagSchema)
export const UserLabResearch = mongoose.model<IUserLabResearch>('user_labResearch', UserLabResearchSchema)
export const ResetToken = mongoose.model<IResetToken>('reset_token', ResetTokenSchema)


export function getUserForMail(email: string): Promise<Optional<IUserCommon>> {
    return getUser({ "contact.email": email })
}

export function getUserById(id: string): Promise<Optional<IUserCommon>> {
    return getUser({_id: id})
}

export function getModelForRole(role: string): Optional<Model<IUserCommon>> {
    switch (role) {
        case UserRoles.LAB_DIAG:
            return UserLabDiag
        case UserRoles.LAB_RESEARCH:
            return UserLabResearch
        case UserRoles.VOLUNTEER:
            return UserVolunteer;
        default:
            console.log("Cannot get database model for role " + role)
            return undefined
    }
}

export async function getUser(filter: any): Promise<Optional<IUserCommon>> {
    let models: Model<any>[] = [UserLabResearch, UserLabDiag, UserVolunteer]
    let matches = []

    for (let i of models) {
        try {
            let match = await i.findOne(filter).exec()
            if (match) {
                matches.push(match)
            }
        } catch {
            return undefined
        }
    }

    if (matches.length > 1) {
        throw new Error("More than one result found.")
    } else if (matches.length == 0) {
        return undefined
    } else {
        return matches[0]
    }
}

