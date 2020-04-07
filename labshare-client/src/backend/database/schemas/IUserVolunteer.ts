import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";

export interface IUserVolunteer extends IUserCommon {
    details: {
        skills: string[]
    },
    availability: boolean
}

export const UserVolunteerSchema = new Schema({
    ...UserCommonSchema.obj,
    details: {
        skills: [String]
    },
    availability: { type: Boolean, default: true },
});

UserVolunteerSchema.index({location: '2dsphere'})
