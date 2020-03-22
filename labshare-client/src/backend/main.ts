import express from "express"
import { Validator as v } from "../lib/validation"
import { validator, schemas } from "./jsonschemas"
import HttpStatus, { BAD_REQUEST } from 'http-status-codes'
import argon2 from "argon2";
import * as utils from './utils';
import { ValidationError, LocationNotFoundError } from './errors';

let app = express()
let router = express.Router()
app.use(express.json());
app.use('/api/v1', router)


router.post('/registration', async function (req, res, next) {
    let body = req.body
    
    if (req.query.role && req.query.role === "human") {
        if (!validator.validate(body, schemas.registration_human).valid) {
            return utils.badRequest(res)
        }
    }
    else if (req.query.role && req.query.role === "lab" ) {
        if (!validator.validate(body, schemas.registration_lab).valid) {
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

    // TODO: Insert into database

    utils.successResponse(res)
})



router.post('/forgot-password', function(req, res, next){
    let body = req.body
    
    try {
        v.validateEmail(body.email)
    } catch (error) {
        return utils.handleError(res, error)
    }

    // TODO: Generate token, and add it into the database, as well as send an email

    return utils.successResponse(res)
})


router.post("/reset-password", async function(req, res, next){
    let body = req.body
    if (!validator.validate(body, schemas.password_reset).valid) {
        return utils.badRequest(res)
    }
    
    if (!req.query.token) {
        return utils.badRequest(res)
    }
    
    let validToken: boolean
    // TODO: Lookup token in database
    if (!validToken) {
        return utils.badRequest(res)
    }

    let password = await argon2.hash(body.newPassword)
    // TODO: Update password hash of user in DB
})



router.post("/reset-password", async function (req, res, next) {
    let body = req.body
    if (!validator.validate(body, schemas.password_reset).valid) {
        return utils.badRequest(res)
    }

    if (!req.query.token) {
        return utils.badRequest(res)
    }

    let validToken: boolean
    // TODO: Lookup token in database
    if (!validToken) {
        return utils.badRequest(res)
    }

    let password = await argon2.hash(body.newPassword)
    // TODO: Update password hash of user in DB
})


router.post("/login", async function(req, res, next){
    let body = req.body
    if (!validator.validate(body, schemas.login).valid) {
        return utils.badRequest(res)
    }

    let mail = body.email
    // TODO: Get password hash from database
    let hash: string
    let password = body.password
    let validPassword = await argon2.verify(hash, password)

    if (!validPassword) {
        return utils.errorResponse(res, HttpStatus.UNAUTHORIZED, "Ungülige Login-Daten!")
    }

    // TODO: generate JWT and refresh token
})


// TODO: insert authentication middleware here





router.post("/change-password", async function(req, res, nex){
    let body = req.body
    if (!validator.validate(body, schemas.password_reset).valid || !body.oldPassword) {
        return utils.badRequest(res)
    }

    // TODO: Get hash from database
    let hash: string
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



