import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";

export interface IUserVolunteer extends IUserCommon {
    details: {
        skills: string[],
        qualification: string
    },
    availability: boolean
}

export const UserVolunteerSchema = new Schema({
    ...UserCommonSchema.obj,
    details: {
        skills: [String],
        qualification: String
    },
    availability: { type: Boolean },
});

UserVolunteerSchema.index({location: '2dsphere'})
