import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
import { ITimestamp } from './ITimestamps';
export interface IUserLabDiag extends IUserCommon, ITimestamp {
    lookingFor: {
        advice: string[],
        equipment: string[],
        equipmentDescription: string,
        adviceDescription: string
    },
    offers: {
        advice: string[],
        equipment: string[],
        equipmentDescription: string,
        adviceDescription: string,
    };
}

export const UserLabDiagSchema = new Schema({
    lookingFor: {
        advice: [String],
        equipment: [String],
        equipmentDescription: String,
        adviceDescription: String,
    },
    offers: {
        advice: [String],
        equipment: [String],
        equipmentDescription: String,
        adviceDescription: String,
    }
}, {
    timestamps: true
});

UserLabDiagSchema.index({ location: '2dsphere' })
