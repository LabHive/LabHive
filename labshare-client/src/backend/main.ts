import argon2 from "argon2"
import cors from 'cors'
import express from "express"
import { readFileSync } from 'fs'
import HttpStatus from 'http-status-codes'
import jsonwebtoken from "jsonwebtoken"
import mongoose, { Document } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Validator as v } from "../lib/validation"
import { getUser, getUserForMail, IUserHuman, IUserLab, Reset_Token, User_Human, User_Lab } from './database'
import { schemas, validateSchema } from "./schemas/jsonschemas"
import * as utils from './utils'

let app = express()
let router = express.Router()

let HMAC_KEY: string
if (process.env.PRODUCTION) {
    app.use(express.static('dist'));
    HMAC_KEY = readFileSync('./secret/jsonwebtoken_hmacKey.txt', { encoding: 'utf8' })
}
else {
    app.use(cors())
    HMAC_KEY = "randomHmacKey"
}

app.use(express.json());
app.use('/api/v1', router)


router.post('/registration', async function (req, res, next) {
    let body = req.body

    if (req.query.role && req.query.role === "human") {
        if (!validateSchema(body, schemas.registration_human)) {
            return utils.badRequest(res)
        }
    }
    else if (req.query.role && req.query.role === "lab") {
        if (!validateSchema(body, schemas.registration_lab)) {
            return utils.badRequest(res)
        }
    }
    else {
        return utils.badRequest(res)
    }

    try {
        v.validateProfileFields(body, req.query.role)
    } catch (error) {
        return utils.handleError(res, error)
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
        doc = new User_Human(body)
    }
    else {
        doc = new User_Lab(body)
    }

    let user = await getUserForMail(body.contact?.email ?? body.labContact.email)
    if (user) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "User existiert bereits.")
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
})



router.post('/forgot-password', async function (req, res, next) {
    let body = req.body

    try {
        v.validateEmail(body.email)
    } catch (error) {
        return utils.handleError(res, error)
    }

    let user = await getUserForMail(body.email)
    if (!user) {
        return utils.badRequest(res)
    }

    Reset_Token.deleteMany({ objectId: user._id }).exec()

    let token = uuid()
    let token_doc = new Reset_Token({ token: token, objectId: user._id })

    token_doc.save().then(() => {
        // TODO: Send mail
        return utils.successResponse(res)
    }).catch(() => {
        return utils.errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Es ist etwas schiefgelaufen.")
    })
})


router.post("/reset-password", async function (req, res, next) {
    let body = req.body
    if (!validateSchema(body, schemas.password_reset)) {
        return utils.badRequest(res)
    }

    if (!req.query.token) {
        return utils.badRequest(res)
    }

    let token_doc = await Reset_Token.findOneAndDelete({ token: req.query.token }).exec()
    if (!token_doc) {
        return utils.badRequest(res)
    }

    let password = await argon2.hash(body.newPassword)
    let user = await getUser({ _id: token_doc.objectId })
    if (!user) {
        return utils.internalError(res)
    }

    user.password = password
    user.save(undefined).then((doc) => {
        if (!doc) {
            return utils.internalError(res)
        }
        utils.successResponse(res)
    }).catch(err => {
        console.log(err)
        return utils.internalError(res)
    })
})


router.post("/login", async function (req, res, next) {
    let body = req.body
    if (!validateSchema(body, schemas.login)) {
        return utils.badRequest(res)
    }

    let mail = body.email
    let user = await getUserForMail(mail)
    if (!user) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "Ungülige Login-Daten!")
    }

    let hash: string = user.password
    let password = body.password
    let validPassword = await argon2.verify(hash, password)

    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "Ungülige Login-Daten!")
    }


    let userID: string = user._id.toString() // Database ID
    let payload = {
        role: user.role,
        email: user.role === "human" ? (<IUserHuman>user).contact.email : (<IUserLab>user).labContact.email
    }
    let options = {
        issuer: "labshare",
        subject: userID,
        notBefore: 0,
        expiresIn: "2h",
    }
    let jwt = jsonwebtoken.sign(payload, HMAC_KEY, options)

    res.send({
        success: true,
        sessionToken: jwt
    })
})


router.use('*', async function (req, res, next) {
    try {
        let token = utils.getJWTToken(req)
        jsonwebtoken.verify(token, HMAC_KEY, {
            algorithms: ["HS256"],
            clockTolerance: 300,
            issuer: "labshare"
        })
        let decoded_token = utils.getDecodedJWT(req)
        let user = await getUser({_id: decoded_token.sub})
        if (!user)
            throw new Error("unauthorized")
    }
    catch {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "Nicht authorisiert!")
    }

    next()
});




router.post("/change-password", async function (req, res, next) {
    let body = req.body
    if (!validateSchema(body, schemas.password_reset) || !body.oldPassword) {
        return utils.badRequest(res)
    }

    let token = utils.getDecodedJWT(req)
    let user = await getUser({ _id: token.sub })
    if (!user) {
        return utils.badRequest(res)
    }

    let hash = user.password
    let validPassword = await argon2.verify(hash, body.oldPassword)
    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "Ungültiges Passwort")
    }

    let password = await argon2.hash(body.newPassword)
    user.password = password
    user.save().then((doc) => {
        if (!doc)
            return utils.internalError(res)
        return utils.successResponse(res)
    }).catch(err => {
        console.log(err)
        return utils.internalError(res)
    })
})


router.get("/profile", async function (req, res, next) {
    let token = utils.getDecodedJWT(req)
    let user = await getUser({ _id: token.sub })
    if (!user) {
        return utils.badRequest(res)
    }

    let data = JSON.parse(JSON.stringify(user))
    delete data._id
    delete data.__v
    delete data.password

    let responseData = {
        success: true,
        data: data
    }
    res.send(responseData)

}).post("/profile", async function (req, res, next) {
    let body = req.body

    let token = utils.getDecodedJWT(req)
    let schema: any
    if (token.role === "human") {
        // deep copy schema
        schema = JSON.parse(JSON.stringify(schemas.registration_human))
        delete schema.required
        delete schema.properties.firstname
        delete schema.properties.lastname
        delete schema.properties.password
        delete schema.properties.details.required
    }
    else {
        // deep copy schema
        schema = JSON.parse(JSON.stringify(schemas.registration_lab))
        delete schema.required
        delete schema.properties.password
    }

    if (!validateSchema(body, schema) || v.validateProfileFields(body, token.role)) {
        return utils.badRequest(res)
    }

    let model: mongoose.Model<any>
    if (token.role === "human") {
        model = User_Human
    }
    else {
        model = User_Lab
    }

    model.updateOne({ _id: token.sub }, body).exec().then((doc) => {
        if (!doc)
            return utils.internalError(res)
        return utils.successResponse(res)
    }).catch(err => {
        return utils.internalError(res)
    })

}).delete("/profile", function (req, res, next) {
    let token = utils.getDecodedJWT(req)

    let model: mongoose.Model<any>
    if (token.role === "human") {
        model = User_Human
    }
    else {
        model = User_Lab
    }

    model.deleteOne({ _id: token.sub }).exec().then((doc) => {
        if (!doc)
            return utils.internalError(res)
        return utils.successResponse(res)
    }).catch((err) => {
        return utils.internalError(res)
    })
})

// router.get("/search", async function(req, res, next){
// 	try {
// 		v.validateRole(req.query.role)
// 	} catch(error) {
// 		return utils.handleError(res, error)
// 	}

// 	if(req.query.role === "human")
// 	{
//         let users = await getUsers("test")

//         res.send(users);
// 	}
// 	else
// 	{

// 		try {
// 			v.validateSearchType(req.query.searchtype)
// 		} catch(error) {
// 			return utils.handleError(res, error)
// 		}

// 	}
// })


app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});



