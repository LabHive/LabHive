import axios from 'axios'
import express from 'express'
import { LocationNotFoundError, ValidationError, UnauthorizedError } from './errors'
import HttpStatusCodes from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'
import { getUser } from "./database/database";
import { CONF, OPT } from './options'

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
        let searchComponent: any = {
            street: "",
            postalcode: "",
            city: "",
            country: "Germany"
        }
        if (address.street) {
            searchComponent.street = address.street
        }
        if (address.zipcode) {
            searchComponent.postalcode = address.zipcode
        }
        if (address.city) {
            searchComponent.city = address.city
        }


        const url = new URL("https://nominatim.openstreetmap.org/search?format=json&limit=1")

        for (let i in searchComponent) {
            if (searchComponent[i] !== "") {
                url.searchParams.set(i, searchComponent[i])
            } 
        }

        try {
            const urls = url.toString()
            const response = await axios.get(urls)
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

    public badRequest(res: express.Response, reason: string = "bad_request") {
        this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, reason)
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
        if (!await this.isValidJWT(req)) {
            return undefined
        }

        return this.getUnverifiedDecodedJWT(req)
    }

    public getUnverifiedDecodedJWT(req: express.Request): Token {
        let token = this.getJWTToken(req)
        return <Token>jsonwebtoken.decode(token)
    }

    public async isValidJWT(req: express.Request): Promise<boolean> {
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
        
        return true
    }

    public getBaseUrl(req: express.Request) {
        if (OPT.BASE_URL) {
            return OPT.BASE_URL
        }
        return req.protocol + '://' + req.get('host')
    }
}


export default new Utils()


