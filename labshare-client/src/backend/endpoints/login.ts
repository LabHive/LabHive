import argon2 from "argon2";
import express from "express";
import HttpStatus from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";
import { getUserForMail } from '../database/database';
import { IUserCommon } from '../database/schemas/IUserCommon';
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import utils from '../utils';
import { CONF } from '../options';

interface IBody {
    email?: string,
    password?: string
}

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: IBody = req.body;
    if (!JsonSchema.validate(body, schemas.login)
        || !body.email || !body.password) {
        return utils.badRequest(res);
    }

    let mail = body.email;
    let user = await getUserForMail(mail);
    if (!user) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "invalid_login");
    }

    if (!user.verified.mail || !user.verified.manually) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "user_not_activated");
    }


    let hash: string = user.password;
    let password = body.password;
    let validPassword = await argon2.verify(hash, password);
    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "invalid_login");
    }


    let userID: string = user._id.toString(); // Database ID
    let payload = {
        role: user.role,
        email: (<IUserCommon>user).contact.email
    };
    let options = {
        issuer: "labhive",
        subject: userID,
        notBefore: 0,
        expiresIn: "2h",
    };
    let jwt = jsonwebtoken.sign(payload, CONF.HMAC_KEY, options);

    res.send({
        success: true,
        sessionToken: jwt
    });
}
