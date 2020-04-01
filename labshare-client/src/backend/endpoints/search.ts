import express from "express";
import { Mongoose, Model } from 'mongoose';
import { UserLab, UserHuman, getUser } from '../database/database';
import utils, { Token } from '../utils';
import { Validator } from '../../lib/validation';
import { ValidationError } from '../errors';

function buildFilter(req: express.Request, res: express.Response, token?: Token): Optional<any> {
    let searchRole = req.query.role
    let filter: any = {}

    if (searchRole === 'human') {
        filter.availability = true

        let skills: string[] = req.query.humanSkills
        if (skills) {
            let result = Validator.validSkills(skills)
            if (!result.valid) {
                utils.handleError(res, result.err)
                return undefined
            }

            filter['details.skills'] = {
                '$in': skills
            }
        }
    }
    else {
        let equipment: string[] = req.query.equipment
        if (equipment) {
            let result = Validator.validEquipment(equipment)
            if (!result.valid) {
                utils.handleError(res, result.err)
                return undefined
            }

            filter['lookingFor.equipment'] = {
                '$in': equipment
            }
        }

        let advices: string[] = req.query.advice
        if (advices) {
            let result = Validator.validAdvice(advices)
            if (!result.valid) {
                utils.handleError(res, result.err)
                return undefined
            }

            filter['lookingFor.advice'] = {
                '$in': advices
            }
        }
    }

    filter['consent.processing'] = true
    return filter
}


function validSearchFilter(req: express.Request, res: express.Response, token?: Token): boolean {
    if (!req.query.role || (req.query.role !== "lab" && req.query.role !== "human")) {
        console.log("invalid role parameter")
        utils.badRequest(res)
        return false
    }

    if (req.query.role === 'human') {
        if (req.query.equipment || req.query.advice) {
            console.log("humans can not search for equipment or advice")
            utils.badRequest(res)
            return false
        }
    }

    if (!token && !req.query.zipcode) {
        console.log('Zipcode is required when unauthenticated')
        utils.badRequest(res)
        return false
    }

    if (req.query.zipcode) {
        let result = Validator.validZipcode(req.query.zipcode)
        if (!result.valid) {
            console.log("Invalid zipcode")
            utils.badRequest(res)
            return false
        }
    }

    // labs can search for everything
    return true
}

async function getZipcodeCoords(req: express.Request, res: express.Response, token?: Token): Promise<Optional<number[]>> {
    if (req.query.zipcode) {
        try {
            return (await utils.addressToCoordinates({ zipcode: req.query.zipcode })).coordinates
        }
        catch {
            utils.errorResponse(res, 400, "invalid_zipcode")
            return undefined
        }
    }

    if (token) {
        let user = await getUser({_id: token.sub})
        return user?.location.coordinates
    }

    utils.badRequest(res)
    return undefined
}


export async function search(req: express.Request, res: express.Response, next: express.NextFunction) {
    let model: Model<any>;
    let projection: any;
    let page = 0
    try {
        page = parseInt(req.query.page ?? '1') - 1
    }
    catch {
        page = 0
    }
    page = Math.max(page, 0)

    let token = await utils.getVerifiedDecodedJWT(req)
    if (!validSearchFilter(req, res, token)) {
        return
    }
    
    if (req.query.role === 'human') {
        model = UserHuman
        projection = {
            'location': 1,
            'address': 1,
            'description': 1,
            'details': 1,
            'availability': 1,
            'consent': 1 // delete this from the query result
        }

        if (token && token.role === "lab") {
            projection['contact'] = 1
        }
    }
    else {
        model = UserLab
        projection = {
            'location': 1,
            'address': 1,
            'description': 1,
            'lookingFor': 1,
            'name': 1,
            'consent': 1 // delete this from the query result
        }

        if (token) {
            projection['contact'] = 1
        }
    }



    let center = await getZipcodeCoords(req, res, token)
    if (!center) {
        return
    }
    let center_point = {
        type: 'Point',
        coordinates: center
    }

    let filter = buildFilter(req, res, token)
    if (!filter) {
        // response is sent in buildFilter
        return
    }
 
    let count = (await model.aggregate([{
        $geoNear: {
            near: center_point,
            distanceField: 'distance',
            spherical: true,
            query: filter,
            key: 'location'
        }
    }]).count('count').exec())[0].count

    if (count == 0 || count < page*20) {
        return utils.errorResponse(res, 400, "no_results")
    }

    projection['distance'] = 1
    let docs = (await model.aggregate([{
        $geoNear: {
            near: center_point,
            distanceField: 'distance',
            spherical: true,
            query: filter,
            key: 'location'
        }
    }]).project(projection).skip(20*page).limit(20).exec())
    

    let results = []
    for (let i of docs) {
        let a = i
        if (!i.consent.publicContact) {
            delete a.contact
        }
        
        delete a.consent
        delete a._id
        results.push(a)
    }

    let reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let nextUrl = new URL(reqUrl)
    let nurl = null
    if (count - (page*20 + 20) > 0) {
        nextUrl.searchParams.set('page', (page + 2).toString())
        nurl = nextUrl.toString()
    }

    let previousUrl: URL = new URL(reqUrl)
    let purl = null
    if (page > 0) {
        previousUrl.searchParams.set('page', (page).toString())
        purl = previousUrl.toString()
    }
    
    let links = {
        next: nurl,
        previous: purl
    }

    let resp = {
        "_embedded": results,
        "_links": links,
        totalPages: Math.ceil(count/20),
        sucess: true
    }

    return res.send(resp)
}