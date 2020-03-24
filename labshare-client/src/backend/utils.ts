import axios from 'axios'
import express from 'express'
import { LocationNotFoundError, ValidationError, UnauthorizedError } from './errors'
import HttpStatusCodes from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'

export interface Address {
    city: string,
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
        let searchTerm = ""
        if (address.street) {
            searchTerm += address.street
            searchTerm += ", "
        }

        searchTerm += address.zipcode + " " + address.city

        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(searchTerm))
            if (response.data.length == 0) {
                throw new LocationNotFoundError("Invalid location")
            }
            let lon = <number>response.data[0].lon
            let lat = <number>response.data[0].lat
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
        this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, "Ungültige Anfrage!")
    }

    public handleError(res: express.Response, error: Error) {
        if (error instanceof LocationNotFoundError) {
            this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, "Ungültige Addresse")
        }
        else if (error instanceof ValidationError) {
            this.errorResponse(res, HttpStatusCodes.BAD_REQUEST, error.message)
        }
        else {
            this.errorResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, "Etwas ist schiefgelaufen...")
        }
    }

    public internalError(res: express.Response) {
        this.errorResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, "Es ist etwas schiefgelaufen.")
    }

    public getJWTToken(req: express.Request) {
        if (!req.headers.authorization) {
            throw new UnauthorizedError()
        }

        let token = req.headers.authorization
        token = token.replace("Bearer", "").trim()
        return token
    }

    public getDecodedJWT(req: express.Request): Token {
        let token = this.getJWTToken(req)
        return <Token>jsonwebtoken.decode(token)
    }
}


export default new Utils()


