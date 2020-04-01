import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
export interface IUserLab extends IUserCommon {
    name: string;
    lookingFor: {
        humanSkills: string[],
        advice: string[],
        equipment: string[]
    };
}

export const UserLabSchema = new Schema({
    ...UserCommonSchema.obj,
    name: String,
    lookingFor: {
        advice: [String],
        equipment: [String],
        humanSkills: [String]
    }
});

UserLabSchema.index({ location: '2dsphere' })
