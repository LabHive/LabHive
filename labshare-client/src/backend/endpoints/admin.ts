import express from "express"
import utils from '../utils'
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } from 'http-status-codes'
import { UserAdmin, UserCommon, ActivationToken } from '../database/database'
import argon from 'argon2'
import JsonSchema, { schemas } from "../jsonSchemas/JsonSchema";
import { CONF } from '../options'
import jsonwebtoken from "jsonwebtoken"
import { registration_admin } from '../jsonSchemas/registration_admin'
import { Validator } from 'jsonschema'
import { authMiddleware } from '../middlewares/auth'
import { sendActivationMail, sendActivationNotice } from '../mail/mailer'
import { getLangID } from './language'
import { v4 } from 'uuid'
import { AdminUserRoles } from '../../lib/userRoles'


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
        this.router.get("/users", this.getProfiles)
        this.router.post('/user/activate/:id', this.activateUser)
        this.router.post('/user/disable/:id', this.disableUser)
        this.router.post('/user/enable/:id', this.enableUser)
        this.router.post('/user/delete/:id', this.deleteUser)
        this.router.post('/user/resendActivationMail/:id', this.resendActivationMail)

        this.router.use(this.blackhole)
    }

    async adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        authMiddleware(req, res, function() {
            let token = utils.getUnverifiedDecodedJWT(req)
            if (token.role !== AdminUserRoles.ADMIN && token.role !== AdminUserRoles.SUPER_ADMIN) {
                return utils.errorResponse(res, UNAUTHORIZED, 'unauthorized')
            }
            next()
        })
    }

    async blackhole(req: express.Request, res: express.Response) {
        return utils.errorResponse(res, NOT_FOUND, 'invalid_route')
    }

    async login(req: express.Request, res: express.Response) {
        let body = req.body
        if (!JsonSchema.validate(body, schemas.login) || !body.email || !body.password) {
            return utils.badRequest(res)
        }

        let mail = body.email
        let password = body.password

        let user = await UserAdmin.findOne({ "contact.email": mail }).lean().exec()
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
        if (token.role !== AdminUserRoles.SUPER_ADMIN)     
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
        if (token.role !== AdminUserRoles.SUPER_ADMIN)
            return utils.badRequest(res)

        if (!req.body.email || typeof req.body.email !== 'string')
            return utils.errorResponse(res, BAD_REQUEST, "Needs 'email' property in body")

        UserAdmin.deleteOne({ email: req.body.email }).exec().then(() => {
            utils.successResponse(res)
        }).catch((err) => {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err)
        })
    }


    async getProfiles(req: express.Request, res: express.Response) {
        let page_int = 1
        try {
            let page = typeof req.query.page === 'string' ? req.query.page : undefined
            if (!page) {
                page = '1'
            }
            page_int = parseInt(page)
        }
        catch {
            page_int = 1
        }
        
        page_int -= 1
        
        let count = await UserCommon.count({}).exec()
        if (page_int * 20 > count) {
            return utils.badRequest(res)
        }

        let docs = await UserCommon.find({})
            .sort({ "verified.manually": 1, disabled: 1, createdAt: -1 })
            .limit(20)
            .skip(page_int * 20)
            .select('-password -location -lookingFor -offers -__v -consent')
            .exec()

        let rDocs = docs.map((x) => { return x.toObject() })

        let reqUrl = utils.getBaseUrl(req) + req.originalUrl;
        let nextUrl = new URL(reqUrl)
        let nurl = null
        if (count - (page_int * 20 + 20) > 0) {
            nextUrl.searchParams.set('page', (page_int + 2).toString())
            nurl = nextUrl.toString()
        }

        let previousUrl: URL = new URL(reqUrl)
        let purl = null
        if (page_int > 0) {
            previousUrl.searchParams.set('page', (page_int).toString())
            purl = previousUrl.toString()
        }

        let links = {
            next: nurl,
            previous: purl
        }

        res.send({
            _embedded: rDocs,
            totalResults: count,
            _links: links,
            success: true
        })
    }


    async activateUser(req: express.Request, res: express.Response) {
        let userId = req.params.id

        try {
            let user = await UserCommon.findById(userId).exec()
            if (!user) {
                return utils.errorResponse(res, BAD_REQUEST, 'User not found')
            }

            if (user.verified.manually) {
                return utils.errorResponse(res, BAD_REQUEST, "User already activated")
            }

            user.verified.manually = true
            await user.save()
            
            await sendActivationNotice(user.contact.email, user.language)
            utils.successResponse(res)
        } catch(err) {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err.toString())
        }
    }

    async disableUser(req: express.Request, res: express.Response) {
        let userId = req.params.id

        try {
            let user = await UserCommon.findById(userId).exec()
            if (!user) {
                return utils.errorResponse(res, BAD_REQUEST, 'User not found')
            }

            user.disabled = true
            await user.save()
            utils.successResponse(res)
        }
        catch(err) {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err.toString())
        }
    }

    async enableUser(req: express.Request, res: express.Response) {
        let userId = req.params.id

        try {
            let user = await UserCommon.findById(userId).exec()
            if (!user) {
                return utils.errorResponse(res, BAD_REQUEST, 'User not found')
            }

            user.disabled = false
            user.save()
            utils.successResponse(res)
        }
        catch (err) {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err.toString())
        }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        let userId = req.params.id

        let token = utils.getUnverifiedDecodedJWT(req)
        if (token.role !== AdminUserRoles.SUPER_ADMIN)
            return utils.errorResponse(res, UNAUTHORIZED, "unauthorized")

        try {
            let doc = await UserCommon.findByIdAndDelete(userId)
            if (!doc)
                return utils.badRequest(res, "User not found")
                
            utils.successResponse(res)
        }
        catch (err) {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err.toString())
        }
    }

    async resendActivationMail(req: express.Request, res: express.Response) {
        let userId = req.params.id

        try {
            let user = await UserCommon.findById(userId)
            if (!user)
                return utils.badRequest(res, "User not found")

            let token_doc = await ActivationToken.findOne({ objectId: userId })
            let token = token_doc?.token
            if (!token_doc) {
                token = v4()
                token_doc = new ActivationToken({ token: token, objectId: userId })
                await token_doc.save()
            }

            let link = utils.getBaseUrl(req) + "/#/activate?token=" + token
            let language = getLangID(req)

            await sendActivationMail(user.contact.email, link, language)
        }
        catch (err) {
            utils.errorResponse(res, INTERNAL_SERVER_ERROR, err.toString())
        }
    } 

}



