import express from "express";
import { UserRoles } from '../../lib/userRoles';
import { Validator } from '../../lib/validation';
import { getModelForRole, getUser, UserCommon, getFilterForPublicUsers, cleanUserObjForToken, sensibleUserProjection } from '../database/database';
import utils, { Token } from '../utils';
import { IUserCommon } from '../database/schemas/IUserCommon';
import crypto from "crypto"


enum QueryTypes {
    volunteerSkills = "volunteerSkills",
    advice = "advice",
    equipment = "equipment"
}

enum SearchMode {
    lookingFor = "lookingFor",
    offers = "offers",
    volunteers = "volunteers"
}

function getVolunteerSkills(req: express.Request, res: express.Response): Optional<string[]> {
    let query = req.query.filters
    let skills: Optional<string[]> = Array.isArray(query) ? <string[]>query : undefined
    if (skills) {
        let result = Validator.validSkills(skills)
        if (!result.valid) {
            utils.handleError(res, result.err)
            return undefined
        }
        return skills
    }
    return []
}

function getAdvice(req: express.Request, res: express.Response): Optional<string[]> {
    let query = req.query.filters
    let skills: Optional<string[]> = Array.isArray(query) ? <string[]>query : undefined
    if (skills) {
        let result = Validator.validAdvice(skills)
        if (!result.valid) {
            utils.handleError(res, result.err)
            return undefined
        }
        return skills
    }
    return []
}

function getEquipment(req: express.Request, res: express.Response): Optional<string[]> {
    let query = req.query.filters
    let skills: Optional<string[]> = Array.isArray(query) ? <string[]>query : undefined
    if (skills) {
        let result = Validator.validEquipment(skills)
        if (!result.valid) {
            utils.handleError(res, result.err)
            return undefined
        }
        return skills
    }
    return []
}

function buildFilter(req: express.Request, res: express.Response, token?: Token): Optional<any> {
    let searchMode = req.query.mode
    let filter: any = getFilterForPublicUsers()

    let filterBy = typeof req.query.filterBy === 'string' ? req.query.filterBy : undefined
    if (filterBy && (filterBy != QueryTypes.equipment && filterBy != QueryTypes.advice && filterBy != QueryTypes.volunteerSkills)) {
        utils.badRequest(res)
        return undefined
    }

    let filterList: Optional<string[]>
    switch (filterBy) {
        case QueryTypes.volunteerSkills:
            filterList = getVolunteerSkills(req, res)
            if (!filterList) return undefined
            break
        case QueryTypes.equipment:
            filterList = getEquipment(req, res)
            if (!filterList) return undefined
            break
        case QueryTypes.advice:
            filterList = getAdvice(req, res)
            if (!filterList) return undefined
            break
    }


    if (searchMode == SearchMode.volunteers && filterBy == QueryTypes.volunteerSkills) {
        filter['details'] = {
            "$exists": true
        }

        if (filterList && filterList.length > 0) {
            filter['details.skills'] = {
                "$all": filterList
            }
        }
    }
    else if (filterBy && filterList) {
        if (filterList.length > 0) {
            filter[`${searchMode}.${filterBy}`] = {
                "$all": filterList
            }
        }
        else {
            filter[`${searchMode}.${filterBy}.0`] = {
                "$exists": true
            }
        }
    }
    else if (searchMode) {
        if (searchMode === SearchMode.lookingFor) {
            filter['$or'] = [
                { "lookingFor.equipment.0": { "$exists": true } },
                { "lookingFor.advice.0": { "$exists": true } },
                { "lookingFor.volunteerSkills.0": { "$exists": true } },
            ]
        } else if (searchMode === SearchMode.offers) {
            filter['$or'] = [
                { "offers.equipment.0": { "$exists": true } },
                { "offers.advice.0": { "$exists": true } },
            ]
        } else if (searchMode == SearchMode.volunteers) {
            filter['role'] = UserRoles.VOLUNTEER
        }
    }

    return filter
}


function validSearchFilter(req: express.Request, res: express.Response, token?: Token): boolean {
    if (!req.query.mode && (req.query.filterBy || req.query.filters)) {
        console.error("searchMode is required to be able to filter")
        return false
    }

    if (req.query.filters && !req.query.filterBy) {
        console.error("filterBy is required with filters")
        return false
    }

    if (req.query.zipcode) {
        if (typeof req.query.zipcode !== "string") return false
        let result = Validator.validZipcode(req.query.zipcode)
        if (!result.valid) {
            console.log("Invalid zipcode")
            return false
        }
    }

    // labs can search for everything
    return true
}

async function getZipcodeCoords(req: express.Request, res: express.Response, token?: Token): Promise<Optional<number[]>> {
    if (req.query.zipcode) {
        try {
            if (typeof req.query.zipcode !== "string") throw new Error("invalid_zipcode")
            return (await utils.addressToCoordinates({ zipcode: req.query.zipcode })).coords.coordinates
        }
        catch {
            utils.errorResponse(res, 400, "invalid_zipcode")
            return undefined
        }
    }

    return undefined
}


export async function search(req: express.Request, res: express.Response, next: express.NextFunction) {
    let page = 0
    try {
        if (typeof req.query.page !== "string") throw new Error()
        page = parseInt(req.query.page ?? '1') - 1
    }
    catch {
        page = 0
    }
    page = Math.max(page, 0)


    let searchMode = typeof req.query.mode === "string" ? req.query.mode : undefined
    if (searchMode && (searchMode !== SearchMode.lookingFor && 
            searchMode !== SearchMode.offers && 
            searchMode !== SearchMode.volunteers)) {
        return utils.badRequest(res)
    }

    let token = await utils.getVerifiedDecodedJWT(req)
    if (!validSearchFilter(req, res, token)) {
        return utils.badRequest(res)
    }

    let projection = sensibleUserProjection()

    let filter = buildFilter(req, res, token)
    if (!filter) {
        // response is sent in buildFilter
        return
    }

    let count = await UserCommon.find(filter).countDocuments().exec()

    if (count == 0 || count < page * 20) {
        let links = {
            next: null,
            previous: null
        }

        let resp = {
            "_embedded": [],
            "_links": links,
            totalResults: count,
            sucess: true
        }
        return res.send(resp)
    }

    let center = await getZipcodeCoords(req, res, token)
    let docs: IUserCommon[]
    if (center) {
        let center_point = {
            type: 'Point',
            coordinates: center
        }

        projection['distance'] = 1
        docs = (await UserCommon.aggregate([{
            $geoNear: {
                near: center_point,
                distanceField: 'distance',
                spherical: true,
                query: filter,
                key: 'location'
            }
        }]).project(projection).skip(20 * page).limit(20).exec())
    } else {
        docs = await UserCommon.find(filter).sort({ "updatedAt": -1 }).select(projection).skip(20 * page).limit(20)
    }

    let results = []
    for (let i of docs) {
        let a: IUserCommon = i
        try {
            // Only find returns Document[], aggregate returns any[]
            a = i.toObject()
        }
        catch (err) { }

        cleanUserObjForToken(token, a)
        results.push(a)
    }

    let reqUrl = utils.getBaseUrl(req) + req.originalUrl;
    let nextUrl = new URL(reqUrl)
    let nurl = null
    if (count - (page * 20 + 20) > 0) {
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
        totalResults: count,
        sucess: true
    }

    return res.send(resp)
}
