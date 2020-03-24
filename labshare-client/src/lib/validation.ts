import { ValidationError } from '../backend/errors';

export class Validator {
    static validateEmail(email: string) {
        let regexpEmail = new RegExp(/^.+@.+\..+$/);
        if (!regexpEmail.test(email)) {
            throw new ValidationError("Keine valide Email-Adresse")
        }
    }

    static validateFirstname(firstname?: string) {
        this.validateTextShort(firstname);
    }

    static validateLastname(lastname?: string) {
        this.validateTextShort(lastname);
    }

    static validateZipcode(zipcode?: string) {
        let regexpZipCode = new RegExp(/^[0-9]{5}$/);
        if (!zipcode || !regexpZipCode.test(zipcode)) {
            throw new ValidationError("Bitte nicht mehr als fünf Zeichen eingeben")
        }
    }

    static validateCity(city?: string) {
        this.validateTextShort(city);
    }

    static validateStreet(street?: string) {
        this.validateTextShort(street);
    }

    static validatePhone(phone?: string) {
        let regexpPhone = new RegExp(/^[0-9+]+$/);
        if (!phone || !regexpPhone.test(phone)) {
            throw new ValidationError("Telefonnummer bitte in der Form +49931123 oder 12344 eingeben ohne Leerzeichen, - oder /")
        }
    }

    static validateDescription(description?: string) {
        this.validateTextLong(description);
    }

    static validateRNAExctractionHours(hours?: number) {
        this.validateNumber(hours);
    }

    static validateRTPCRHours(hours?: number) {
        this.validateNumber(hours);
    }

    static validateHoursPerWeek(hours?: number) {
        this.validateNumber(hours);
    }

    static validateName(name?: string) {
        this.validateTextShort(name)
    }


    private static validateTextShort(text?: string) {
        if (!text || text.length > 200) {
            throw new ValidationError("Nicht mehr als 200 Zeichen eingeben")
        }
    }

    private static validateTextLong(text?: string) {
        if (!text || text.length > 2000) {
            throw new ValidationError("Nicht mehr als 2000 Zeichen eingeben")
        }
    }

    private static validateNumber(number?: number) {
        if (!number || !Number.isInteger(number)) {
            throw new ValidationError("Bitte eine Zahl eingeben")
        }
    }

    static validateSearchType(searchtype?: string) {
        if (!searchtype || (searchtype !== "human_ressources" && searchtype !== "device" && searchtype !== "advice")) {
            throw new ValidationError("Unknown searchtype")
        }

    }

    static validateRole(role?: string) {
        if (!role || (role !== "lab" && role !== "human")) {
            throw new ValidationError("Unknown role")
        }

    }


    static validateProfileFields(object: any, role: string) {
        if (object.address?.city)
            this.validateCity(object.address?.city)
        if (object.address?.zipcode)
            this.validateZipcode(object.address?.zipcode)

        if (role === "human") {
            if (object.firstname)
                this.validateFirstname(object.firstname)
            if (object.lastname)
                this.validateLastname(object.lastname)
            if (object.contact?.phone)
                this.validatePhone(object.contact?.phone)
            if (object.contact?.email)
                this.validateEmail(object.contact?.email)
            if (object.description)
                this.validateDescription(object.description)
        }
        else if (role == "lab") {
            if (object.labContact?.firstname)
                this.validateFirstname(object.labContact?.firstname)
            if (object.labContact?.lastname)
                this.validateLastname(object.labContact?.lastname)
            if (object.labContact?.phone)
                this.validatePhone(object.labContact?.phone)
            if (object.labContact?.email)
                this.validateEmail(object.labContact?.email)
            if (object.address?.street)
                this.validateStreet(object.address?.street)
            if (object.name)
                this.validateName(object.name)
        }
    }
}

