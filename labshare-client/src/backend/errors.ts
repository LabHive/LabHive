

export class LocationNotFoundError extends Error {
    constructor(m: string) {
        super(m)
        Object.setPrototypeOf(this, LocationNotFoundError.prototype)
    }
}

export class ValidationError extends Error {
    constructor(m: string) {
        super(m)
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}