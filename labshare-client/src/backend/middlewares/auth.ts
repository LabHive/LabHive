import express from "express";
import HttpStatus from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";
import { getUser } from '../database/database';
import utils from '../utils';
import { HMAC_KEY } from '../main';


export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

    if (!utils.isAuthenticated(req)) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "Nicht authorisiert!");
    }
    
    next();
}
