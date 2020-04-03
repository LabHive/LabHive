import argon2 from "argon2";
import express from "express";
import { getUser, ResetToken } from '../database/database';
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import utils from '../utils';

interface IBody {
    newPassword?: string
}

export async function resetPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: IBody = req.body;
    if (!JsonSchema.validate(body, schemas.password_reset) || !req.query.token || !body.newPassword) {
        return utils.badRequest(res);
    }
    
    let token_doc = await ResetToken.findOneAndDelete({ token: req.query.token }).exec();
    if (!token_doc) {
        return utils.badRequest(res);
    }
    
    let password = await argon2.hash(body.newPassword);
    let user = await getUser({ _id: token_doc.objectId });
    if (!user) {
        return utils.internalError(res);
    }
    
    user.password = password;
    user.save(undefined).then((doc) => {
        if (!doc) {
            return utils.internalError(res);
        }
        utils.successResponse(res);
    }).catch(err => {
        console.log(err);
        return utils.internalError(res);
    });
}
