import { ValidationError } from '../backend/errors';

export class Validator {
    static validateEmail(email: string) {
        let regexpEmail = new RegExp(/^.+@.+\..+$/);
        if (!regexpEmail.test(email)) {
            throw new ValidationError("Keine valide Email-Adresse")
        }
    }

    static validateFirstname(firstname: string) {
        console.log("test")
        console.log(new ValidationError("d"))
        this.validateTextShort(firstname);
    }

    static validateLastname(lastname: string) {
        this.validateTextShort(lastname);
    }

    static validateZipcode(zipcode: string) {
        let regexpZipCode = new RegExp(/^[0-9]{5}$/);
        if (!regexpZipCode.test(zipcode)) {
            throw new ValidationError("Bitte nicht mehr als fünf Zeichen eingeben")
        }
    }

    static validateCity(city: string) {
        this.validateTextShort(city);
    }

    static validateStreet(street: string) {
        this.validateTextShort(street);
    }

    static validatePhone(phone: string) {
        let regexpPhone = new RegExp(/^[0-9+]+$/);
        if (!regexpPhone.test(phone)) {
            throw new ValidationError("Telefonnummer bitte in der Form +49931123 oder 12344 eingeben ohne Leerzeichen, - oder /")
        }
    }

    static validateDescription(description: string) {
        this.validateTextLong(description);
    }

    static validateRNAExctractionHours(hours: number) {
        this.validateNumber(hours);
    }

    static validateRTPCRHours(hours: number) {
        this.validateNumber(hours);
    }

    static validateHoursPerWeek(hours: number) {
        this.validateNumber(hours);
    }

    static validateName(name: string) {
        this.validateTextShort(name)
    }


    private static validateTextShort(text: string) {
        if (text.length > 200) {
            throw new ValidationError("Nicht mehr als 200 Zeichen eingeben")
        }
    }

    private static validateTextLong(text: string) {
        if (text.length > 2000) {
            throw new ValidationError("Nicht mehr als 2000 Zeichen eingeben")
        }
    }

    private static validateNumber(number: number) {
        if (!Number.isInteger(number)) {
            throw new ValidationError("Bitte eine Zahl eingeben")
        }
    }

    static validateSearchType(searchtype: string) {
        if (searchtype !== "human_ressources" && searchtype !== "device" && searchtype !== "advice") {
            throw new ValidationError("Unknown searchtype")
        }

    }

    static validateRole(role: string) {
        if (role !== "lab" && role !== "human") {
            throw new ValidationError("Unknown role")
        }

    }


    static validateProfileFields(object: any, role: string) {
        this.validateCity(object.address.city)
        this.validateZipcode(object.address.zipcode)

        if (role === "human") {
            this.validateFirstname(object.firstname)
            this.validateLastname(object.lastname)
            this.validatePhone(object.contact.phone)
            this.validateDescription(object.description)
        }
        else if (role == "lab") {
            this.validateFirstname(object.labContact.firstname)
            this.validateLastname(object.labContact.lastname)
            this.validatePhone(object.labContact.phone)
            this.validateStreet(object.address.street)
            this.validateName(object.name)
        }
    }
}

