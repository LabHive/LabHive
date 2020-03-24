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
    lookingFor: new Schema({
        humanRessources: Boolean,
        devices: new Schema({
            rnaExtraction: Boolean,
            testingKit: Boolean
        }),
        advice: new Schema({
            rnaExtraction: Boolean,
            testingKit: Boolean,
            dataEvaluation: Boolean
        })
    })
});
