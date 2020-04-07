import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
export interface IUserLabResearch extends IUserCommon {
    offers: {
        advice: string[],
        equipment: string[],
        equipmentDescription: string,
        adviceDescription: string,
    }
}

export const UserLabResearchSchema = new Schema({
    ...UserCommonSchema.obj,
    offers: {
        advice: [String],
        equipment: [String],
        equipmentDescription: String,
        adviceDescription: String,
    }
});

UserLabResearchSchema.index({ location: '2dsphere' })
