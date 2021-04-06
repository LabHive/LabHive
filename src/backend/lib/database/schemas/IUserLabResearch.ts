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
    offers: {
        advice: [String],
        equipment: [String],
        equipmentDescription: {
            type: String,
            default: ""
        },
        adviceDescription: {
            type: String,
            default: ""
        },
    }
}, {
    timestamps: true
});

UserLabResearchSchema.index({ location: '2dsphere' })

export const UserSupplierSchema = new Schema({
    offers: {
        advice: [String],
        equipment: [String],
        equipmentDescription: {
            type: String,
            default: ""
        },
        adviceDescription: {
            type: String,
            default: ""
        },
    }
}, {
    timestamps: true
});


UserSupplierSchema.index({ location: '2dsphere' })
