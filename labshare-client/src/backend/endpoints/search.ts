import express from "express";
import { UserRoles } from '../../lib/userRoles';
import { Validator } from '../../lib/validation';
import { getModelForRole, getUser } from '../database/database';
import utils, { Token } from '../utils';


enum QueryTypes {
    volunteerSkills = "volunteerSkills",
    advice = "advice",
    equipment = "equipment"
}

function getVolunteerSkills(req: express.Request, res: express.Response): Optional<string[]> {
    let skills: string[] = req.query[QueryTypes.volunteerSkills]
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
    let skills: string[] = req.query[QueryTypes.advice]
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
    let skills: string[] = req.query[QueryTypes.equipment]
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
    let searchForRole = req.query.role
    let filter: any = {}

    let skills = getVolunteerSkills(req, res)
    if (!skills) return undefined
    let equipment = getEquipment(req, res)
    if (!equipment) return undefined
    let advice = getAdvice(req, res)
    if (!advice) return undefined

    skills = skills.length == 0 ? undefined : skills
    equipment = equipment.length == 0 ? undefined : equipment
    advice = advice.length == 0 ? undefined : advice

    if (searchForRole === UserRoles.VOLUNTEER) {
        filter.availability = true
    
        if (skills) {
            filter['details.skills'] = {
                '$in': skills
            }
        }
    }
    else if (searchForRole === UserRoles.LAB_DIAG) {
        if (skills) {
            filter['lookingFor.volunteerSkills'] = {
                '$in': skills
            }
        }
        if (equipment) {
            filter['lookingFor.equipment'] = {
                '$in': equipment
            }
        }

        if (advice) {
            filter['lookingFor.advice'] = {
                '$in': advice
            }
        }
    }
    else if (searchForRole === UserRoles.LAB_RESEARCH) {
        if (equipment) {
            filter['offers.equipment'] = {
                '$in': equipment
            }
        }

        if (advice) {
            filter['offers.advice'] = {
                '$in': advice
            }
        }
    }

    filter['consent.processing'] = true
    return filter
}


function validSearchFilter(req: express.Request, res: express.Response, token?: Token): boolean {
    if (req.query.role === UserRoles.VOLUNTEER) {
        if (req.query[QueryTypes.equipment] || req.query[QueryTypes.advice]) {
            console.log("searching for volunteers can not search for equipment or advice")
            return false
        }
    }
    else if (req.query.role === UserRoles.LAB_RESEARCH) {
        if (req.query[QueryTypes.volunteerSkills]) {
            console.log("searching for research labs can not search for human skills")
            return false
        }
    }

    if (!token && !req.query.zipcode) {
        console.log('Zipcode is required when unauthenticated')
        return false
    }

    if (req.query.zipcode) {
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
    let page = 0
    try {
        page = parseInt(req.query.page ?? '1') - 1
    }
    catch {
        page = 0
    }
    page = Math.max(page, 0)


    let searchForRole = req.query.role
    if (!Validator.validRole(searchForRole).valid) {
        return utils.badRequest(res)
    }

    let token = await utils.getVerifiedDecodedJWT(req)
    if (!validSearchFilter(req, res, token)) {
        return utils.badRequest(res)
    }

    let model = getModelForRole(searchForRole)
    if (!model) return utils.badRequest(res)

    let projection: { [key: string]: number } = {
        'location': 1,
        'address': 1,
        'description': 1,
        'consent': 1
    }


    // TODO: Permissions
    switch (searchForRole) {
        case UserRoles.VOLUNTEER:
            projection['details'] = 1
            projection['availability'] = 1

            if (token && token.role == UserRoles.LAB_DIAG) {
                projection['contact'] = 1
                projection['organization'] = 1
            }
            break;
        case UserRoles.LAB_DIAG: 
            projection['organization'] = 1
            projection['lookingFor'] = 1
            projection['offers'] = 1
            break;
        case UserRoles.LAB_RESEARCH:
            projection['organization'] = 1
            projection['offers'] = 1
            if (token && token.role == UserRoles.LAB_DIAG) {
                projection['contact'] = 1
            }
            break;
        default:
            throw new Error("role not implemented")
            break;
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
    }]).count('count').exec())

    if (count.length > 0) {
        count = count[0].count
    }

    if (count == 0 || count < page*20) {
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

    let reqUrl = utils.getBaseUrl(req) + req.originalUrl;
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
        totalResults: count,
        sucess: true
    }

    return res.send(resp)
}
