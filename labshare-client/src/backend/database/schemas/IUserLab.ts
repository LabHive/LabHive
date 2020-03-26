import { Schema } from "mongoose";
import { IUserCommon, UserCommonSchema } from "./IUserCommon";
export interface IUserLab extends IUserCommon {
    name: string;
    lookingFor: {
        humanRessources: boolean;
        devices: {
            rnaExtraction: boolean;
            testingKit: boolean;
        };
        advice: {
            rnaExtraction: boolean;
            testingKit: boolean;
            dataEvaluation: boolean;
        };
    };
}

export const UserLabSchema = new Schema({
    ...UserCommonSchema.obj,
    name: String,
    lookingFor: {
        humanRessources: Boolean,
        devices: {
            rnaExtraction: Boolean,
            testingKit: Boolean
        },
        advice: {
            rnaExtraction: Boolean,
            testingKit: Boolean,
            dataEvaluation: Boolean
        }
    }
});
