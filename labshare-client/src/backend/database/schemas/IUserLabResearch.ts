import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
import { ITimestamp } from './ITimestamps';
export interface IUserLabResearch extends IUserCommon, ITimestamp {
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
}, {
    timestamps: true
});

UserLabResearchSchema.index({ location: '2dsphere' })
