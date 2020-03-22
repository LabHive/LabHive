import axios from 'axios'
import express from 'express'
import { LocationNotFoundError, ValidationError } from './errors'
import HttpStatusCodes from 'http-status-codes'

interface Address {
    city: string,
    zipcode: string,
    street?: string
}



export function addressToCoordinates(address: Address) {
    let searchTerm = ""
    if (address.street) {
        searchTerm += address.street
        searchTerm += ", "
    }

    searchTerm += address.zipcode + " " + address.city

    return axios.get("https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(searchTerm))
        .then(function (response) {
            if (response.data.length == 0) {
                throw new LocationNotFoundError("Invalid location")
            }

            let lon = response.data[0].lon
            let lat = response.data[0].lat
            return {
                type: "Point",
                coordinates: [lon, lat]
            }
        }).catch((err) => {
            throw err
        })
}



export function errorResponse(res: express.Response, code: number, description: string) {
    res.status(code).send({
        "success": false,
        "errorDescription": description
    })
}

export function successResponse(res: express.Response) {
    res.send({
        success: true
    })
}

export function badRequest(res: express.Response) {
    errorResponse(res, HttpStatusCodes.BAD_REQUEST, "Ungültige Anfrage!")
}

export function handleError(res: express.Response, error: Error) {
    if (error instanceof LocationNotFoundError) {
        errorResponse(res, HttpStatusCodes.BAD_REQUEST, "Ungültige Addresse")
    }
    else if (error instanceof ValidationError) {
        errorResponse(res, HttpStatusCodes.BAD_REQUEST, error.message)
    }
    else {
        errorResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, "Etwas ist schiefgelaufen...")
    }
}

export function internalError(res:express.Response) {
    errorResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, "Es ist etwas schiefgelaufen.")
}