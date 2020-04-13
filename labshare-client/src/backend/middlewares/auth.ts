import express from "express";
import HttpStatus from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";
import { getUserOrAdmin } from '../database/database';
import utils from '../utils';


export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

    let auth = await utils.isValidJWT(req)
    if (!auth) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "not_authorized");
    }

    let decoded_token = utils.getUnverifiedDecodedJWT(req);
    let user = await getUserOrAdmin({ _id: decoded_token.sub });
    if (!user) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "not_authorized");
    }
    
    next();
}
