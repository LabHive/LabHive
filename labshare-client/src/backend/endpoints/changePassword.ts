import argon2 from "argon2";
import express from "express";
import HttpStatus from 'http-status-codes';
import { getUser } from '../database/database';
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import utils from '../utils';


export async function changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body = req.body;
    if (!JsonSchema.validate(body, schemas.password_reset) || !body.oldPassword) {
        return utils.badRequest(res);
    }

    let token = utils.getDecodedJWT(req);
    let user = await getUser({ _id: token.sub });
    if (!user) {
        return utils.badRequest(res);
    }


    let hash = user.password;
    let validPassword = await argon2.verify(hash, body.oldPassword);
    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "Ungültiges Passwort");
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
