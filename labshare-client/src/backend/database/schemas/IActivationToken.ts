import { Schema, Document } from "mongoose";
import { IUserCommon } from './IUserCommon';
import { ITimestamp } from './ITimestamps';
export interface IActivationToken extends Document, ITimestamp {
    token: string;
    objectId: IUserCommon['_id'];
}

export const ActivationTokenSchema = new Schema({
    token: String,
    objectId: Schema.Types.ObjectId
}, {
    timestamps: true
});
