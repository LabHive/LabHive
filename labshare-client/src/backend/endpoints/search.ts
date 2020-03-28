import express from "express";
import { Mongoose, Model } from 'mongoose';
import { UserLab, UserHuman } from '../database/database';
import utils from '../utils';

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
    
    if (req.query.role === 'human') {
        model = UserHuman
        projection = {
            'location': 'location',
            'address': 'address',
            'description': 'description',
            'details': 'details',
            'availability': 'availability'
        }
    }
    else if (req.query.role === 'lab') {
        model = UserLab
        projection = {
            'location': 'location',
            'address': 'address',
            'description': 'description',
            'lookingFor': 'lookingFor',
            'name': 'name'
        }
    }
    else {
        return utils.badRequest(res)
    }

    let count = await model.countDocuments().exec()
    if (count == 0 || count < page*20) {
        return utils.errorResponse(res, 400, "No results could be found")
    }

    let docs = await model.find({'consent.processing': true}, projection).skip(page * 20).limit(20).exec()
    let results = []
    for (let i of docs) {
        results.push(i)
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