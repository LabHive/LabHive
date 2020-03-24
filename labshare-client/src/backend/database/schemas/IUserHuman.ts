import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";

export interface IUserHuman extends IUserCommon {
    details: {
        rnaExtraction: number;
        rtPcr: number;
        hoursPerWeek: number;
    };
    available: boolean;
}

export const UserHumanSchema = new Schema({
    ...UserCommonSchema.obj,
    details: new Schema({
        rnaExtraction: Number,
        rtPcr: Number,
        hoursPerWeek: Number
    }),
    available: { type: Boolean, default: true },
});
