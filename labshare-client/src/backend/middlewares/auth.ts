import express from "express";
import HttpStatus from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";
import { getUser } from '../database/database';
import utils from '../utils';


export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

    let auth = await utils.isAuthenticated(req)
    if (!auth) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "not_authorized");
    }
    
    next();
}
