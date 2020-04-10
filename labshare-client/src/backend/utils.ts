import axios from 'axios'
import express from 'express'
import { LocationNotFoundError, ValidationError, UnauthorizedError } from './errors'
import HttpStatusCodes from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'
import { getUser } from "./database/database";
import { CONF } from './options'

export interface Address {
    city?: string,
    zipcode: string,
    street?: string
}

export interface Token {
    role: string
    email: string
    iss: string
    sub: string
}


class Utils {
    public async addressToCoordinates(address: Address) {
        let searchComponent = []
        if (address.street) {
            searchComponent.push(address.street)
        }
        if (address.zipcode) {
            searchComponent.push(address.zipcode)
        }
        if (address.city) {
            searchComponent.push(address.city)
        }

        let searchTerm = searchComponent.join(', ')

        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(searchTerm))
            if (response.data.length == 0) {
                throw new LocationNotFoundError("invalid_location")
            }
            let lon = parseFloat(response.data[0].lon)
            let lat = parseFloat(response.data[0].lat)
            return {
                type: "Point",
                coordinates: [lon, lat]
            }
        }
        catch (err) {
            throw err
        }
    }



    public errorResponse(res: express.Response, code: number, description: string) {
        res.status(code).send({
            "success": false,
            "errorDescription": description
        })
    }

    public successResponse(res: express.Response) {
        res.send({
            success: true
        })
    }

    public badRequest(res: express.Response) {
        this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, "bad_request")
    }

    public handleError(res: express.Response, error: Error) {
        if (error instanceof LocationNotFoundError) {
            console.log("invalid address")
            this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, "invalid_location")
        }
        else if (error instanceof ValidationError) {
            console.log(error.message)
            this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, error.message)
        }
        else {
            console.log('internal server error')
            this.errorResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, "internal_error")
        }
    }

    public internalError(res: express.Response) {
        this.errorResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, "internal_error")
    }

    public getJWTToken(req: express.Request) {
        if (!req.headers.authorization) {
            throw new UnauthorizedError()
        }

        let token = req.headers.authorization
        token = token.replace("Bearer", "").trim()
        return token
    }

    public async getVerifiedDecodedJWT(req: express.Request): Promise<Optional<Token>> {
        if (!await this.isAuthenticated(req)) {
            return undefined
        }

        return this.getUnverifiedDecodedJWT(req)
    }

    public getUnverifiedDecodedJWT(req: express.Request): Token {
        let token = this.getJWTToken(req)
        return <Token>jsonwebtoken.decode(token)
    }

    public async isAuthenticated(req: express.Request): Promise<boolean> {
        try {
            let token = this.getJWTToken(req);
            jsonwebtoken.verify(token, CONF.HMAC_KEY, {
                algorithms: ["HS256"],
                clockTolerance: 300,
                issuer: "labhive"
            });
        }
        catch {
            return false
        }
        
        let decoded_token = this.getUnverifiedDecodedJWT(req);
        let user = await getUser({ _id: decoded_token.sub });
        if (!user)
            return false
        return true
    }
}


export default new Utils()


