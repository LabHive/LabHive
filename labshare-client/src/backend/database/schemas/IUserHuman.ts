import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";

export interface IUserHuman extends IUserCommon {
    details: {
        skills: string[]
    };
    availability: boolean;
    organization: string;
}

export const UserHumanSchema = new Schema({
    ...UserCommonSchema.obj,
    details: {
        skills: [String]
    },
    availability: { type: Boolean, default: true },
    organization: String
});
