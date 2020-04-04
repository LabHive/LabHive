import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
export interface IUserLabResearch extends IUserCommon {
    name: string;
    offers: {
        advice: string[],
        equipment: string[]
    };
}

export const UserLabResearchSchema = new Schema({
    ...UserCommonSchema.obj,
    name: String,
    offers: {
        advice: [String],
        equipment: [String],
    }
});

UserLabResearchSchema.index({ location: '2dsphere' })
