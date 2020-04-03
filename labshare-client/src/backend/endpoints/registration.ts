import argon2 from 'argon2';
import express from "express";
import HttpStatus from 'http-status-codes';
import { Validator as v } from '../../lib/validation';
import { getModelForRole, getUserForMail } from '../database/database';
import { IUserCommon } from '../database/schemas/IUserCommon';
import JsonSchema, { schemaForRole } from "../jsonSchemas/JsonSchema";
import utils from '../utils';
import { UserRoles } from '../../lib/userRoles';



export async function registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: IUserCommon = req.body
    let role = req.query.role
    if (!role || !v.validRole(role)) return utils.badRequest(res)

    let schema = schemaForRole(role)
    if (!schema) return utils.badRequest(res)
    if (!JsonSchema.validate(body, schema)) return utils.badRequest(res)

    let validationResult = v.validProfileFields(body, role)
    if (!validationResult.valid) {
        return utils.handleError(res, validationResult.err)
    }

    try {
        body.location = await utils.addressToCoordinates(body.address)
    } catch (error) {
        return utils.handleError(res, error)
    }

    // Hash password
    body.password = await argon2.hash(body.password)
    body.role = req.query.role

    if (body.role === UserRoles.VOLUNTEER) {
        delete body.address.street
    }

    let user = await getUserForMail(body.contact.email)
    if (user) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "existing_user")
    }

    let model = getModelForRole(role)
    if (!model) return utils.badRequest(res)
    let doc = new model(body)

    doc.save().then((doc) => {
        if (!doc) {
            return utils.internalError(res)
        }
        utils.successResponse(res)
    }).catch(err => {
        console.log(err)
        return utils.internalError(res)
    })
}
