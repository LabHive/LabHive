import argon2 from "argon2";
import express from "express";
import HttpStatus from 'http-status-codes';
import { getUserOrAdmin } from '../../lib/database/database';
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import utils from '../utils';

interface IBody {
    oldPassword?: string,
    newPassword?: string
}


export async function changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: IBody = req.body;
    if (!JsonSchema.validate(body, schemas.password_reset) 
        || !body.oldPassword || !body.newPassword) {
        return utils.badRequest(res);
    }

    let token = utils.getUnverifiedDecodedJWT(req);
    let user = await getUserOrAdmin({_id: token.sub})
    if (!user) {
        return utils.badRequest(res);
    }


    let hash = user.password;
    let validPassword = await argon2.verify(hash, body.oldPassword);
    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "invalid_password");
    }

    let password = await argon2.hash(body.newPassword);
    user.password = password;
    
    user.save().then((doc) => {
        if (!doc)
            return utils.internalError(res);
        return utils.successResponse(res);
    }).catch(err => {
        console.log(err);
        return utils.internalError(res);
    });
}
