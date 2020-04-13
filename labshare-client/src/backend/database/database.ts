import mongoose, { Model, Document } from "mongoose"
import { IUserVolunteer, UserVolunteerSchema } from './schemas/IUserVolunteer'
import { IUserLabDiag, UserLabDiagSchema } from './schemas/IUserLabDiag'
import { IResetToken, ResetTokenSchema } from './schemas/IResetToken'
import { IUserCommon, UserCommonSchema } from './schemas/IUserCommon'
import { UserLabResearchSchema, IUserLabResearch } from './schemas/IUserLabResearch'
import { UserRoles } from '../../lib/userRoles'
import { FailedMailSchema, IFailedMail } from './schemas/IFailedMail'
import { ActivationTokenSchema, IActivationToken } from './schemas/IActivationToken'
import { UserAdminSchema, IUserAdmin } from './schemas/IUserAdmin'
import { CONF } from '../options'


const connectionBase = process.env.PRODUCTION ? 'mongodb' : 'localhost';

mongoose.connect(`mongodb://${connectionBase}:27017/labshare`, { useNewUrlParser: true }).then(async () => {
    if (CONF.ADMIN_USER) {
        let mail = CONF.ADMIN_USER.contact.email
        let user = await UserAdmin.findOne({ 'contact.email': mail }).exec()
        if (!user) {
            let admin = new UserAdmin(CONF.ADMIN_USER)
            return admin.save().then((doc) => {
                if (!doc)
                    throw new Error("nothing saved")
            })
        }
    }
    return
}).catch((err) => {
    console.error(err)
    process.exit(1)
})


export const UserAdmin = mongoose.model<IUserAdmin>('user_admin', UserAdminSchema)

export const UserCommon = mongoose.model<IUserCommon>('users', UserCommonSchema)
export const UserVolunteer = UserCommon.discriminator<IUserVolunteer>('volunteer', UserVolunteerSchema)
export const UserLabDiag = UserCommon.discriminator<IUserLabDiag>('labDiag', UserLabDiagSchema)
export const UserLabResearch = UserCommon.discriminator<IUserLabResearch>('labResearch', UserLabResearchSchema)

export const ResetToken = mongoose.model<IResetToken>('reset_token', ResetTokenSchema)
export const FailedMail = mongoose.model<IFailedMail>('failed_mail', FailedMailSchema)
export const ActivationToken = mongoose.model<IActivationToken>('activation_token', ActivationTokenSchema)


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
    return (await UserCommon.findOne(filter).exec()) ?? undefined
}

export async function getUserOrAdmin(filter: any): Promise<Optional<IUserCommon>> {
    let models: Model<any>[] = [UserCommon, UserAdmin]

    for (let i of models) {
        let tmp = await i.findOne(filter)
        if (tmp) {
            return tmp
        }
    }
    
    return undefined
}