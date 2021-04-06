import mongoose from "mongoose";
import { UserRoles } from '../../../lib/userRoles';
import { ActivationTokenSchema, FailedMailSchema, IActivationToken, IFailedMail, IResetToken, ITestCapacity, IUserAdmin, IUserCommon, IUserLabDiag, IUserLabResearch, IUserVolunteer, IZipcode, ResetTokenSchema, TestCapacitySchema, UserAdminSchema, UserCommonSchema, UserLabDiagSchema, UserLabResearchSchema, UserSupplierSchema, UserVolunteerSchema, ZipcodeSchema } from './schemas';


export const UserAdmin = mongoose.model<IUserAdmin>('user_admin', UserAdminSchema);
export const ZipCode = mongoose.model<IZipcode>('zipcodes', ZipcodeSchema);
export const UserCommon = mongoose.model<IUserCommon>('users', UserCommonSchema);
export const UserVolunteer = UserCommon.discriminator<IUserVolunteer>(UserRoles.VOLUNTEER, UserVolunteerSchema);
export const UserLabDiag = UserCommon.discriminator<IUserLabDiag>(UserRoles.LAB_DIAG, UserLabDiagSchema);
export const UserLabResearch = UserCommon.discriminator<IUserLabResearch>(UserRoles.LAB_RESEARCH, UserLabResearchSchema);
export const UserSupplier = UserCommon.discriminator<IUserLabResearch>(UserRoles.SUPPLIER, UserSupplierSchema);
export const ResetToken = mongoose.model<IResetToken>('reset_token', ResetTokenSchema);
export const FailedMail = mongoose.model<IFailedMail>('failed_mail', FailedMailSchema);
export const ActivationToken = mongoose.model<IActivationToken>('activation_token', ActivationTokenSchema);
export const TestCapacity = mongoose.model<ITestCapacity>('testCapacity', TestCapacitySchema);
