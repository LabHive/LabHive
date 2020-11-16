import mongoose from "mongoose";
import { IUserVolunteer, UserVolunteerSchema } from './schemas/IUserVolunteer';
import { IUserLabDiag, UserLabDiagSchema } from './schemas/IUserLabDiag';
import { IResetToken, ResetTokenSchema } from './schemas/IResetToken';
import { IUserCommon, UserCommonSchema } from './schemas/IUserCommon';
import { UserLabResearchSchema, IUserLabResearch } from './schemas/IUserLabResearch';
import { UserRoles } from '../../lib/userRoles';
import { FailedMailSchema, IFailedMail } from './schemas/IFailedMail';
import { ActivationTokenSchema, IActivationToken } from './schemas/IActivationToken';
import { UserAdminSchema, IUserAdmin } from './schemas/IUserAdmin';
import { ZipcodeSchema, IZipcode } from './schemas/IZipcodes';
import { ITestCapacity, TestCapacitySchema } from './schemas/ITestCapacity';


export const UserAdmin = mongoose.model<IUserAdmin>('user_admin', UserAdminSchema);
export const ZipCode = mongoose.model<IZipcode>('zipcodes', ZipcodeSchema);
export const UserCommon = mongoose.model<IUserCommon>('users', UserCommonSchema);
export const UserVolunteer = UserCommon.discriminator<IUserVolunteer>(UserRoles.VOLUNTEER, UserVolunteerSchema);
export const UserLabDiag = UserCommon.discriminator<IUserLabDiag>(UserRoles.LAB_DIAG, UserLabDiagSchema);
export const UserLabResearch = UserCommon.discriminator<IUserLabResearch>(UserRoles.LAB_RESEARCH, UserLabResearchSchema);
export const ResetToken = mongoose.model<IResetToken>('reset_token', ResetTokenSchema);
export const FailedMail = mongoose.model<IFailedMail>('failed_mail', FailedMailSchema);
export const ActivationToken = mongoose.model<IActivationToken>('activation_token', ActivationTokenSchema);
export const TestCapacity = mongoose.model<ITestCapacity>('testCapacity', TestCapacitySchema);
