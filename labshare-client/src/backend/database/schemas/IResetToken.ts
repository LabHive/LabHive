import { Schema, Document } from "mongoose";
import { IUserCommon } from './IUserCommon';
export interface IResetToken extends Document {
    token: string;
    objectId: IUserCommon['_id'];
}

export const ResetTokenSchema = new Schema({
    token: String,
    objectId: Schema.Types.ObjectId
});
