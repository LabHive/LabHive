import express from "express"
import { Validator as v } from "../lib/validation"
import { validateSchema, schemas } from "./jsonschemas"
import HttpStatus, { BAD_REQUEST } from 'http-status-codes'
import argon2 from "argon2"
import * as utils from './utils'
import { ValidationError, LocationNotFoundError } from './errors'
import jsonwebtoken from "jsonwebtoken"
import { readFileSync } from 'fs'
import { User_Human, User_Lab, getUserForMail, Reset_Token, getUser } from './database'
import { Schema, Mongoose, Document } from 'mongoose'
import { v4 as uuid } from 'uuid'
import cors from 'cors'

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
    else if (req.query.role && req.query.role === "lab" ) {
        if (!validateSchema(body, schemas.registration_lab)) {
            return utils.badRequest(res)
        }
    }
    else {
        return utils.badRequest(res)
    }

    try {
        v.validateProfileFields(body, req.query.role)
    } catch(error) {
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



router.post('/forgot-password', async function(req, res, next){
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
    let token_doc = new Reset_Token({token: token, objectId: user._id})

    token_doc.save().then(() => {
        // TODO: Send mail
        return utils.successResponse(res)    
    }).catch(() => {
        return utils.errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Es ist etwas schiefgelaufen.")
    })
})


router.post("/reset-password", async function(req, res, next){
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
    let user = await getUser({_id: token_doc.objectId})
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


router.post("/login", async function(req, res, next){
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


// TODO: insert authentication middleware here




router.post("/change-password", async function(req, res, nex){
    let body = req.body
    if (!validateSchema(body, schemas.password_reset) || !body.oldPassword) {
        return utils.badRequest(res)
    }

    // TODO: Get hash from database
    let hash: string = ""
    let validPassword = await argon2.verify(hash, body.oldPassword)
    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.BAD_REQUEST, "Ungültiges Passwort")
    }

    let password = await argon2.hash(body.newPassword)
    // TODO: Update password hash of user in DB
})


router.get("/profile", function(req, res, next){

}).post("/profile", function(req, res, next) {

}).delete("/profile", function(req, res, next) {

})

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});



