import express from "express";
import utils from '../utils';
import { ActivationToken, getUserById } from '../database/database';

interface IBody {
    token?: string
}

export async function activate(req: express.Request, res: express.Response) {
    let body: IBody = req.body

    if (!body.token || typeof body.token !== 'string') {
        return utils.badRequest(res)
    }

    let token = body.token
    try {
        let token_doc = await ActivationToken.findOne({ token: token }).exec()
        if (!token_doc) {
            return utils.badRequest(res)
        }

        let userId = token_doc.objectId
        let user_doc = await getUserById(userId)
        if (!user_doc) {
            return utils.errorResponse(res, 500, "contact_support")
        }

        user_doc.verified.mail = true
        user_doc.save().then((doc) => {
            if (!doc)
                throw new Error("Unsuccessful save")
            utils.successResponse(res)
            token_doc?.remove()
        }).catch((err) => {
            return utils.errorResponse(res, 500, "contact_support")
        })
    }
    catch(err) {
        console.log(err)
        utils.internalError(res)
    }
}


