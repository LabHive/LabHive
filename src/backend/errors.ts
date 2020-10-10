

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

export class UnauthorizedError extends Error {
    constructor() {
        super("Nicht authentisiert!")
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}
