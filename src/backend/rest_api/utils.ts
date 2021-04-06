import axios from 'axios'
import express from 'express'
import { LocationNotFoundError, ValidationError, UnauthorizedError } from 'lib/errors'
import HttpStatusCodes from 'http-status-codes'
import jsonwebtoken from 'jsonwebtoken'
import { CONF, OPT } from './config/options'
import { osmLimiter } from './ratelimiter'
import { ZipCode } from "backend/lib/database/models"
import { JWT } from 'backend/lib/JWT'
import { Optional } from 'lib/optional'

export interface Address {
    city?: string,
    zipcode: string,
    street?: string
}


class Utils {
    public async addressToCoordinates(address: Address) {
        let searchComponent: any = {
            street: "",
            postalcode: "",
            country: "Germany"
        }
        if (address.street) {
            searchComponent.street = address.street
        }
        if (address.zipcode) {
            searchComponent.postalcode = address.zipcode
        }

        if (address.zipcode && !address.street) {
            let zipDoc = await ZipCode.findOne({ zipcode: address.zipcode }).exec()
            if (zipDoc) {
                if (address.city && !zipDoc.city) {
                    zipDoc.city = address.city
                    zipDoc.save()
                }

                return {
                    coords: {
                        type: "Point",
                        coordinates: [zipDoc.location.coordinates[0] , zipDoc.location.coordinates[1]]
                    },
                    city: address.city ?? (zipDoc.city ?? "")
                }
            }
        }

        const url = new URL("https://nominatim.openstreetmap.org/search?format=json&limit=1")

        for (let i in searchComponent) {
            if (searchComponent[i] !== "") {
                url.searchParams.set(i, searchComponent[i])
            } 
        }

        try {
            const urls = url.toString()
            const response = await osmLimiter.schedule(() => axios.get(urls))
            if (response.data.length == 0) {
                throw new LocationNotFoundError("invalid_location")
            }
            let lon = parseFloat(response.data[0].lon)
            let lat = parseFloat(response.data[0].lat)
            if (address.zipcode && !address.street) {
                new ZipCode({
                    zipcode: address.zipcode,
                    location: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    city: address.city ?? "",
                    country: "Germany"
                }).save()
            }
            return {
                coords: {
                    type: "Point",
                    coordinates: [lon, lat]
                },
                city: address.city ?? ""
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

    public async getVerifiedDecodedJWT(req: express.Request): Promise<Optional<JWT>> {
        if (!await this.isValidJWT(req)) {
            return undefined
        }

        return this.getUnverifiedDecodedJWT(req)
    }

    public getUnverifiedDecodedJWT(req: express.Request): JWT {
        let token = this.getJWTToken(req)
        return <JWT>jsonwebtoken.decode(token)
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
}


export default new Utils()


