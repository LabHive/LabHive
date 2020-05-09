import express from "express";
import { Validator as v } from "../../lib/validation";
import { getModelForRole, getUserById, getUserOrAdmin, getFilterForPublicUsers, cleanUserObjForToken, sensibleUserProjection } from '../database/database';
import { UserCommon, UserVolunteer } from "../database/models";
import { IUserCommon } from '../database/schemas/IUserCommon';
import JsonSchema, { schemaForRole } from "../jsonSchemas/JsonSchema";
import utils from '../utils';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { UserRoles } from '../../lib/userRoles';
import { UnauthorizedError } from '../errors';
import { sendNotAvailableNotice } from '../mail/mailer';

class Profile {
    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = utils.getUnverifiedDecodedJWT(req);
        
        let user = await getUserOrAdmin({_id: token.sub}, true);
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


    public async notAvailableNotice(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.params.id) {
            next()
            return
        }

        let token = utils.getUnverifiedDecodedJWT(req)
        if (token.role === UserRoles.VOLUNTEER) {
            return next(new UnauthorizedError())
        }

        let slug = req.params.id
        let user = await UserVolunteer.findOne({ slug: slug }).exec()
        if (!user) {
            return utils.badRequest(res)
        }

        user.availabilityTimer = new Date();
        sendNotAvailableNotice(user.contact.email, utils.getBaseUrl(req), user._id.toString(), user.language)
        user.save()

        utils.successResponse(res)
    }


    public async updateAvailability(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.params.id) {
            next()
            return
        }

        let status = typeof req.query.status === 'string' ? req.query.status : null;
        if (!status) {
            return utils.badRequest(res)
        }

        let userId = req.params.id
        let user = await UserVolunteer.findOne({ _id: userId }).exec()
        if (!user) {
            return utils.badRequest(res)
        }

        user.availabilityTimer = null
        user.availability = status === '1'
        user.save().then(() => {
            utils.successResponse(res)
        }).catch(() => {
            utils.internalError(res)
        })
    }


    public async getForSlug(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.params.id) {
            next()
            return
        }

        let token = await utils.getVerifiedDecodedJWT(req)

        let projection = sensibleUserProjection()
        let filter: any = getFilterForPublicUsers({slug: req.params.id})

        let user = await UserCommon.findOne(filter).select(projection).lean().exec();
        if (!user) {
            return utils.errorResponse(res, NOT_FOUND, "not_found")
        }

        cleanUserObjForToken(token, <IUserCommon>user)

        res.send({
            success: true,
            data: user
        })
    }

    public async revoke(req: express.Request, res: express.Response, next: express.NextFunction) { 
        let detail = req.query.detail
        if (typeof detail !== 'string' || (detail !== 'mailUpdates' && detail !== 'publicSearch')) {
            return utils.badRequest(res)
        }

        let token = utils.getUnverifiedDecodedJWT(req)

        if (detail === "publicSearch" && token.role !== UserRoles.VOLUNTEER) {
            return utils.errorResponse(res, BAD_REQUEST, 'featureNotAvailableForRole')
        }
        
        let user = await getUserById(token.sub)
        if (!user) {
            return next(new UnauthorizedError())
        }

        if (detail === "mailUpdates") {
            user.consent.mailUpdates = false
        }
        else {
            user.consent.publicSearch = false
        }

        user.save().then(() => {
            utils.successResponse(res)
        }).catch(() => {
            utils.internalError(res)
        })
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
        delete body.language
        delete body.slug;
        
        let model = getModelForRole(token.role)
        let schema = schemaForRole(token.role)
        if (!model || !schema) return utils.badRequest(res);

        delete schema.required

        let valResult = v.validProfileFields(body, token.role)
        if (!JsonSchema.validate(body, schema) || !valResult.valid) {
            if (!valResult.valid) return utils.handleError(res, valResult.err);
            return utils.badRequest(res)
        }

        let regexpUrl = new RegExp(/^https?:\/\/[^\s"'\\]+$/);
        if (body.website && !regexpUrl.test(body.website)) {
            body.website = "http://" + body.website;
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
                    let location = await utils.addressToCoordinates(userObj.address)
                    body.location = location.coords
                    body.address.city = location.city
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
