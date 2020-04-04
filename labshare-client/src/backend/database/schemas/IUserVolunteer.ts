import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";

export interface IUserVolunteer extends IUserCommon {
    details: {
        skills: string[]
    };
    availability: boolean;
    organization: string;
}

export const UserVolunteerSchema = new Schema({
    ...UserCommonSchema.obj,
    details: {
        skills: [String]
    },
    availability: { type: Boolean, default: true },
    organization: String
});

UserVolunteerSchema.index({location: '2dsphere'})
