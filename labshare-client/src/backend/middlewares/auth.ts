import express from "express";
import HttpStatus from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";
import { getUser } from '../database/database';
import utils from '../utils';
import { HMAC_KEY } from '../main';


export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let token = utils.getJWTToken(req);
        jsonwebtoken.verify(token, HMAC_KEY, {
            algorithms: ["HS256"],
            clockTolerance: 300,
            issuer: "labshare"
        });

        let decoded_token = utils.getDecodedJWT(req);
        let user = await getUser({ _id: decoded_token.sub });
        if (!user)
            throw new Error("unauthorized");
    }
    catch {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "Nicht authorisiert!");
    }
    
    next();
}
