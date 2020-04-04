import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
export interface IUserLabDiag extends IUserCommon {
    name: string;
    lookingFor: {
        volunteerSkills: string[],
        advice: string[],
        equipment: string[]
    };
}

export const UserLabDiagSchema = new Schema({
    ...UserCommonSchema.obj,
    name: String,
    lookingFor: {
        advice: [String],
        equipment: [String],
        volunteerSkills: [String]
    }
});

UserLabDiagSchema.index({ location: '2dsphere' })
