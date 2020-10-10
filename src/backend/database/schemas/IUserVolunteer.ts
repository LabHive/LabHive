import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
import { ITimestamp } from './ITimestamps';

export interface IUserVolunteer extends IUserCommon, ITimestamp {
    details: {
        skills: string[],
        qualifications: string[]
    },
    availability: boolean
    availabilityTimer: Date | null
}

export const UserVolunteerSchema = new Schema({
    details: {
        skills: [String],
        qualifications: [String]
    },
    availability: { type: Boolean },
    availabilityTimer: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

UserVolunteerSchema.index({location: '2dsphere'})
