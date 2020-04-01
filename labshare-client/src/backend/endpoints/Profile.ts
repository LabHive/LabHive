import express from "express";
import mongoose, { Model } from 'mongoose';
import { Validator as v } from "../../lib/validation";
import { getUser, UserHuman, UserLab } from '../database/database';
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import utils from '../utils'; 
import { IUserCommon } from '../database/schemas/IUserCommon';

class Profile {
    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = utils.getUnverifiedDecodedJWT(req);
        
        let user = await getUser({ _id: token.sub });
        if (!user) {
            return utils.badRequest(res);
        }

        let data = JSON.parse(JSON.stringify(user));
        delete data._id;
        delete data.__v;
        delete data.password;

        let responseData = {
            success: true,
            data: data
        };

        res.send(responseData);
    }



    async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        let body: IUserCommon = req.body;
        let token = utils.getUnverifiedDecodedJWT(req);
        let schema: any;
        
        delete body.password
        delete body._id
        delete body.__v
        let model: Model<any>;
        if (token.role === "human") {
            // deep copy schema
            schema = JSON.parse(JSON.stringify(schemas.registration_human));
            model = UserHuman
        }
        else {
            // deep copy schema
            schema = JSON.parse(JSON.stringify(schemas.registration_lab));
            model = UserLab
        }
        delete schema.required

        if (!JsonSchema.validate(body, schema) || !v.validProfileFields(body, token.role).valid) {
            return utils.badRequest(res);
        }

        let user = await getUser({ _id: token.sub })
        if (!user) {
            return utils.badRequest(res)
        }
        let userObj: IUserCommon = user.toObject()

        if (body.address && 
            (userObj.address.zipcode != body.address.zipcode ||
            userObj.address.street != body.address.street ||
            userObj.address.city != body.address.city)) {
                try {
                    body.location = await utils.addressToCoordinates(userObj.address)
                } catch (error) {
                    return utils.handleError(res, error)
                }
            }

        model.updateOne({_id: token.sub}, body).exec().then(doc => {
            utils.successResponse(res)
        }).catch(err => {
            utils.internalError(res)
        })
    }



    async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = utils.getUnverifiedDecodedJWT(req);
        let model: mongoose.Model<any>;
        if (token.role === "human") {
            model = UserHuman;
        }
        else {
            model = UserLab;
        }

        model.deleteOne({ _id: token.sub }).exec().then((doc) => {
            if (!doc)
                return utils.internalError(res);
            return utils.successResponse(res);
        }).catch((err) => {
            return utils.internalError(res);
        });
    }
}

export default new Profile()
