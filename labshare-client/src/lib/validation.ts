import { ValidationError } from '../backend/errors';
import { labSkills, equipment, advices } from "./selectLists";

class ValidationResult {
    valid: boolean;
    err: ValidationError;

    constructor(valid: boolean = true, msg: string = '') {
        this.valid = valid
        if (!valid && msg === '') {
            throw new Error("Invalid ValidationResult initialized without message")
        }
        this.err = new ValidationError(msg)
    }
}

export class Validator {
    static validEmail(email?: string): ValidationResult {
        let regexpEmail = new RegExp(/^.+@.+\..+$/);
        if (email && !regexpEmail.test(email)) {
            return new ValidationResult(false, "Ungültige email Adresse")
        }
        return new ValidationResult()
    }

    static validateFirstname(firstname?: string) {
        this.validateTextShort(firstname);
    }

    static validateLastname(lastname?: string) {
        this.validateTextShort(lastname);
    }

    static validZipcode(zipcode?: string): ValidationResult {
        let regexpZipCode = new RegExp(/^[0-9]{5}$/);
        if (!zipcode || !regexpZipCode.test(zipcode)) {
            return new ValidationResult(false, "Ungültige PLZ")
        }
        return new ValidationResult()
    }

    static validateCity(city?: string) {
        this.validateTextShort(city);
    }

    static validateStreet(street?: string) {
        this.validateTextShort(street);
    }

    static validatePhone(phone?: string) {
        let regexpPhone = new RegExp(/^[0-9+ ()]+$/);
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

    static validSkills(skills?: string[]): ValidationResult {
        if (!skills) 
            return new ValidationResult(false, "Invalid skills")

        
        let skillCopy = Array.from(skills)
        for (let i of labSkills) {
            let index = skillCopy.indexOf(i.value)
            if (index > -1) {
                skillCopy.splice(index, 1)
            }
        }

        if (skillCopy.length > 0) {
            return new ValidationResult(false, "Invalid skills")
        }
        return new ValidationResult()
    }

    static validEquipment(equip?: string[]): ValidationResult {
        if (!equip)
            return new ValidationResult(false, "Invalid equipment")

        let eqipCopy = Array.from(equip)
        for (let i of equipment) {
            let index = eqipCopy.indexOf(i.value)
            if (index > -1) {
                eqipCopy.splice(index, 1)
            }
        }

        if (eqipCopy.length > 0) {
            return new ValidationResult(false, "Invalid equipment")
        }
        return new ValidationResult()
    }

    static validAdvice(adv?: string[]): ValidationResult {
        if (!adv)
            return new ValidationResult(false, "Invalid advice")

        let advArr = Array.from(adv)
        for (let i of advices) {
            let index = advArr.indexOf(i.value)
            if (index > -1) {
                advArr.splice(index, 1)
            }
        }

        if (advArr.length > 0) {
            return new ValidationResult(false, "Invalid advice")
        }
        return new ValidationResult()
    }

    static validateConsent(consent?: any) {
        if (!consent || typeof consent.processing !== 'boolean' || typeof consent.publicContact !== 'boolean') {
            throw new ValidationError('Invalid consent')
        }
    }

    static validateOrganization(org?: string) {
        this.validateTextShort(org)
    }


    static validateProfileFields(object: any, role: string) {
        // Address
        if (object.address?.city)
            this.validateCity(object.address?.city)
        if (object.address?.zipcode)
            this.validZipcode(object.address?.zipcode)
        if (object.address?.street)
            this.validateStreet(object.address?.street)

        // Contact
        if (object.contact?.firstname)
            this.validateFirstname(object.contact?.firstname)
        if (object.contact?.lastname)
            this.validateLastname(object.contact?.lastname)
        if (object.contact?.phone)
            this.validatePhone(object.contact?.phone)
        if (object.contact?.email)
            this.validEmail(object.contact?.email)

        // Other
        if (object.description)
            this.validateDescription(object.description)
        if (object.consent)
            this.validateConsent(object.consent)

        if (role == "lab") {
            if (object.name)
                this.validateName(object.name)
        }
        else {
            if (object.details?.skills) 
                this.validSkills(object.details?.skills)
            if (object.organization) 
                this.validateOrganization(object.organization)
        }
    }
}

