import express from "express"
import { authMiddleware } from '../middlewares/auth'
import utils from '../utils'
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes'
import { UserAdmin } from '../database/database'
import argon from 'argon2'
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import { CONF } from '../options'
import jsonwebtoken from "jsonwebtoken"
import { registration_admin } from '../jsonSchemas/registration_admin'
import { Validator } from 'jsonschema'


export class AdminEndpoint {
    router: express.IRouter

    constructor(router: express.IRouter) {
        this.router = router
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post('/login', this.login)
        
        this.router.use(this.adminAuthMiddleware)
        this.router.post('/create', this.createAdmin)
        this.router.delete('/delete', this.deleteAdmin)
        this.router.get("/getProfiles", this.getProfiles)
    }

    adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        authMiddleware(req, res, function() {
            let token = utils.getUnverifiedDecodedJWT(req)
            if (token.role !== 'admin' && token.role !== 'superAdmin') {
                return utils.errorResponse(res, UNAUTHORIZED, 'unauthorized')
            }
            next()
        })
    }

    async login(req: express.Request, res: express.Response) {
        let body = req.body
        if (!JsonSchema.validate(body, schemas.login) || !body.email || !body.password) {
            return utils.badRequest(res)
        }

        let mail = body.email
        let password = body.password

        let user = await UserAdmin.findOne({ "contact.email": mail })
        if (!user) {
            return utils.badRequest(res)
        }

        let pw = user.password
        let valid = await argon.verify(pw, password)
        if (!valid) return utils.badRequest(res)

        let payload = {
            role: user.role,
            email: user.contact.email
        };
        let options = {
            issuer: "labhive",
            subject: user._id.toString(),
            notBefore: 0,
            expiresIn: "2h",
        };
        let jwt = jsonwebtoken.sign(payload, CONF.HMAC_KEY, options);

        res.send({
            success: true,
            sessionToken: jwt
        })
    }

    async createAdmin(req: express.Request, res: express.Response) {
        let token = utils.getUnverifiedDecodedJWT(req)
        let body = req.body
        if (token.role !== 'superAdmin')     
            return utils.badRequest(res)

        delete body.role
        let validator = new Validator()
        let valRes = validator.validate(body, registration_admin)
        if (!valRes.valid) {
            return utils.errorResponse(res, BAD_REQUEST, valRes.toString())
        }
        
        let exUser = await UserAdmin.findOne({ "contact.email": body.contact.email })
        if (exUser) {
            return utils.errorResponse(res, BAD_REQUEST, "user_exists")
        }

        body.password = await argon.hash(body.password)
        
        UserAdmin.create(body).then(() => {
            utils.successResponse(res)
        }).catch((err) => {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err)
        })
    }

    deleteAdmin(req: express.Request, res: express.Response) {
        let token = utils.getUnverifiedDecodedJWT(req)
        if (token.role !== 'superAdmin')
            return utils.badRequest(res)

        if (!req.body.email || typeof req.body.email !== 'string')
            return utils.errorResponse(res, BAD_REQUEST, "Needs 'email' property in body")

        UserAdmin.deleteOne({ email: req.body.email }).exec().then(() => {
            utils.successResponse(res)
        }).catch((err) => {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err)
        })
    }


    getProfiles(req: express.Request, res: express.Response) {
        res.send("not yet implemented")
    }

}



