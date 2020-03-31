import express from "express";
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import { UserHuman, UserLab, getUserForMail } from '../database/database';
import utils from '../utils';
import argon2 from 'argon2';
import { Validator as v } from '../../lib/validation';
import { Document } from "mongoose";
import HttpStatus from 'http-status-codes';
import { IUserCommon } from '../database/schemas/IUserCommon';
import { ValidationError } from '../errors';



export async function registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: IUserCommon = req.body

    if (req.query.role && req.query.role === "human") {
        if (!JsonSchema.validate(body, schemas.registration_human)) {
            return utils.badRequest(res)
        }
    }
    else if (req.query.role && req.query.role === "lab") {
        if (!JsonSchema.validate(body, schemas.registration_lab)) {
            return utils.badRequest(res)
        }
    }
    else {
        return utils.badRequest(res)
    }

    let validationResult = v.validProfileFields(body, req.query.role)
    if (!validationResult.valid) {
        return utils.handleError(res, validationResult.err)
    }

    if (!body.consent.processing) {
        return utils.handleError(res, new ValidationError("false_consent"))
    }

    try {
        body.location = await utils.addressToCoordinates(body.address)
    } catch (error) {
        return utils.handleError(res, error)
    }

    // Hash password
    body.password = await argon2.hash(body.password)
    body.role = req.query.role

    let doc: Document
    if (req.query.role === "human") {
        doc = new UserHuman(body)
    }
    else {
        doc = new UserLab(body)
    }

    let user = await getUserForMail(body.contact.email)
    if (user) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "existing_user")
    }

    doc.save(undefined).then((doc) => {
        if (!doc) {
            return utils.internalError(res)
        }
        utils.successResponse(res)
    }).catch(err => {
        console.log(err)
        return utils.internalError(res)
    })
}
