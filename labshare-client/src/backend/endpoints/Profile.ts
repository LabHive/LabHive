import express from "express";
import { Validator as v } from "../../lib/validation";
import { getModelForRole, getUserById, getUserOrAdmin } from '../database/database';
import { IUserCommon } from '../database/schemas/IUserCommon';
import JsonSchema, { schemaForRole } from "../jsonSchemas/JsonSchema";
import utils from '../utils';

class Profile {
    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = utils.getUnverifiedDecodedJWT(req);
        
        let user = await getUserOrAdmin({_id: token.sub});
        if (!user) {
            return utils.badRequest(res);
        }

        let data = JSON.parse(JSON.stringify(user));
        delete data._id;
        delete data.__v;
        delete data.__t;
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
        
        delete body.password
        delete body._id
        delete body.__v
        delete body.__t
        delete body.verified
        delete body.disabled
        
        let model = getModelForRole(token.role)
        let schema = schemaForRole(token.role)
        if (!model || !schema) return utils.badRequest(res);

        delete schema.required

        let valResult = v.validProfileFields(body, token.role)
        if (!JsonSchema.validate(body, schema) || !valResult.valid) {
            if (!valResult.valid) return utils.handleError(res, valResult.err);
            return utils.badRequest(res)
        }

        let user = await getUserById(token.sub)
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
        let model = getModelForRole(token.role)
        if (!model) {
            return utils.badRequest(res)
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
