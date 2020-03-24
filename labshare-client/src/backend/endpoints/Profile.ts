import express from "express";
import mongoose from 'mongoose';
import { Validator as v } from "../../lib/validation";
import { getUser, UserHuman, UserLab } from '../database/database';
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import utils from '../utils';
import { merge } from 'lodash';

class Profile {
    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = utils.getDecodedJWT(req);
        
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
        let body = req.body;
        let token = utils.getDecodedJWT(req);
        let schema: any;
        
        delete body.password
        if (token.role === "human") {
            // deep copy schema
            schema = JSON.parse(JSON.stringify(schemas.registration_human));
    
            // delete properties that should not be editable
            delete body.contact.firstname
            delete body.contact.lastname
        }
        else {
            // deep copy schema
            schema = JSON.parse(JSON.stringify(schemas.registration_lab));
            delete schema.properties.address.required
            delete schema.properties.contact.required
        }

        delete schema.required
        if (!JsonSchema.validate(body, schema) || v.validateProfileFields(body, token.role)) {
            return utils.badRequest(res);
        }

        let user = await getUser({ _id: token.sub })
        if (!user) {
            return utils.badRequest(res)
        }
        let userObj = user.toObject()
        merge(userObj, body)
        merge(user, userObj)

        user.save().then((doc) => {
            if (!doc)
                return utils.internalError(res);
            return utils.successResponse(res);
        }).catch(err => {
            return utils.internalError(res);
        });
    }



    async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = utils.getDecodedJWT(req);
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
