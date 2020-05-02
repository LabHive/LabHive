import argon2 from 'argon2';
import express from 'express';
import HttpStatus from 'http-status-codes';
import { Validator as v } from '../../lib/validation';
import {
  getModelForRole,
  getUserForMail,
  ActivationToken,
} from '../database/database';
import { IUserCommon } from '../database/schemas/IUserCommon';
import JsonSchema, { schemaForRole } from '../jsonSchemas/JsonSchema';
import utils from '../utils';
import { UserRoles } from '../../lib/userRoles';
import { v4 as uuid } from 'uuid';
import { sendActivationMail } from '../mail/mailer';
import { getLangID } from './language';
import { OPT } from '../options';
import { Document } from 'mongoose';


export async function registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: IUserCommon = req.body
    
    delete body.verified
    delete body.__v
    delete body.__t
    delete body._id
    delete body.disabled
    delete body.language

    let role = typeof req.query.role === 'string' ? req.query.role : undefined
    if (!role || !v.validRole(role)) return utils.badRequest(res)

    let schema = schemaForRole(role)
    if (!schema) return utils.badRequest(res)
    if (!JsonSchema.validate(body, schema)) return utils.badRequest(res)

    let validationResult = v.validProfileFields(body, role)
    if (!validationResult.valid) {
        return utils.handleError(res, validationResult.err)
    }

    try {
        let location = await utils.addressToCoordinates(body.address)
        body.location = location.coords
        body.address.city = location.city
    } catch (error) {
        return utils.handleError(res, error)
    }

    // Hash password
    body.password = await argon2.hash(body.password)
    body.role = <UserRoles>role

    if (body.role === UserRoles.VOLUNTEER) {
        delete body.address.street
        body.verified = { 
            manually: true
        }
    }

    if (OPT.DISABLE_VERIFICATION) {
        body.verified = {
            mail: true,
            manually: true
        }
    }

    body.language = getLangID(req)
    body.slug = uuid();
    let regexpUrl = new RegExp(/^https?:\/\/[^\s"'\\]+$/);
    if (body.website && !regexpUrl.test(body.website)) {
        body.website = "http://" + body.website;
    }

    let euser = await getUserForMail(body.contact.email, true)
    if (euser) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "existing_user")
    }

    let model = getModelForRole(role)
    if (!model) return utils.badRequest(res)
    let user = new model(body)
    
    let token = uuid();
    let token_doc = new ActivationToken({ token: token, objectId: user._id });

    try {
        let doc: Document = await user.save()
        if (!doc)
            throw new Error("Saving document failed")
        doc = await token_doc.save()
        if (!doc)
            throw new Error("Saving document failed")
        
        let lang = getLangID(req)
        let link = utils.getBaseUrl(req) + "/#/activate?token=" + token
        sendActivationMail(user.contact.email, link, lang).catch((err) => {
            console.error("Failed to send activation mail", err)
        })
        utils.successResponse(res)
    }
    catch (err) {
        console.log(err)
        return utils.internalError(res)
    }
}
