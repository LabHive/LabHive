import { ValidationError } from '../backend/errors';
import { labSkills, equipment, advices } from "./selectLists";
import './optional'

class ValidationResult {
    valid: boolean;
    err: ValidationError;
    value: Optional<any>

    constructor(valid: boolean, msg: string, value: Optional<any>) {
        this.valid = valid
        if (!valid && !msg) {
            throw new Error("Invalid ValidationResult initialized without message")
        }
        this.err = new ValidationError(msg)
        this.value = value
    }
}

class ValidationResultError extends ValidationResult {
    constructor(msg: string, value: Optional<any>) {
        super(false, msg, value)
    }
}

class ValidationResultSuccess extends ValidationResult {
    constructor() {
        super(true, '', undefined)
    }
}

export class Validator {
    static validEmail(email?: string): ValidationResult {
        let regexpEmail = new RegExp(/^.+@.+\..+$/);
        if (!email || !regexpEmail.test(email)) {
            return new ValidationResultError("Ungültige email Adresse", email)
        }
        return new ValidationResultSuccess()
    }

    static validFirstname(firstname?: string): ValidationResult {
        return this.validTextShort(firstname);
    }

    static validLastname(lastname?: string): ValidationResult {
        return this.validTextShort(lastname);
    }

    static validZipcode(zipcode?: string): ValidationResult {
        let regexpZipCode = new RegExp(/^[0-9]{5}$/);
        if (!zipcode || !regexpZipCode.test(zipcode)) {
            return new ValidationResultError("Ungültige PLZ", zipcode)
        }
        return new ValidationResultSuccess()
    }

    static validCity(city?: string): ValidationResult {
        return this.validTextShort(city);
    }

    static validStreet(street?: string): ValidationResult {
        return this.validTextShort(street);
    }

    static validPhone(phone?: string): ValidationResult {
        let regexpPhone = new RegExp(/^[0-9+ ()]+$/);
        if (!phone || !regexpPhone.test(phone)) {
            return new ValidationResultError("Telefonnummer bitte in der Form +49931123 oder 12344 eingeben ohne Leerzeichen, - oder /", phone)
        }
        return new ValidationResultSuccess()
    }

    static validDescription(description?: string): ValidationResult {
        if (description === "") {
            description = " "
        }
        return this.validTextLong(description);
    }

    static validName(name?: string): ValidationResult {
        return this.validTextShort(name)
    }


    private static validTextShort(text?: string): ValidationResult {
        if (!text || text.length > 200) {
            return new ValidationResultError("Nicht mehr als 200 Zeichen eingeben", text)
        }
        return new ValidationResultSuccess()
    }

    private static validTextLong(text?: string): ValidationResult {
        if (!text || text.length > 2000) {
            return new ValidationResultError("Nicht mehr als 2000 Zeichen eingeben", text)
        }
        return new ValidationResultSuccess()
    }

    private static validNumber(number?: number): ValidationResult {
        if (!number || !Number.isInteger(number)) {
            return new ValidationResultError("Bitte eine Zahl eingeben", number)
        }
        return new ValidationResultSuccess()
    }

    static validSearchType(searchtype?: string): ValidationResult {
        if (!searchtype || (searchtype !== "human_ressources" && searchtype !== "device" && searchtype !== "advice")) {
            return new ValidationResultError("Unknown searchtype", searchtype)
        }
        return new ValidationResultSuccess()
    }

    static validRole(role?: string): ValidationResult {
        if (!role || (role !== "lab" && role !== "human")) {
            return new ValidationResultError("Unknown role", role)
        }
        return new ValidationResultSuccess()
    }

    static validSkills(skills?: string[]): ValidationResult {
        if (!skills) 
            return new ValidationResultError("Invalid skills", skills)

        
        let skillCopy = Array.from(skills)
        for (let i of labSkills) {
            let index = skillCopy.indexOf(i.value)
            if (index > -1) {
                skillCopy.splice(index, 1)
            }
        }

        if (skillCopy.length > 0) {
            return new ValidationResultError("Invalid skills", skills)
        }
        return new ValidationResultSuccess()
    }

    static validEquipment(equip?: string[]): ValidationResult {
        if (!equip)
            return new ValidationResultError("Invalid equipment", equip)

        let eqipCopy = Array.from(equip)
        for (let i of equipment) {
            let index = eqipCopy.indexOf(i.value)
            if (index > -1) {
                eqipCopy.splice(index, 1)
            }
        }

        if (eqipCopy.length > 0) {
            return new ValidationResultError("Invalid equipment", equip)
        }
        return new ValidationResultSuccess()
    }

    static validAdvice(adv?: string[]): ValidationResult {
        if (!adv)
            return new ValidationResultError("Invalid advice", adv)

        let advArr = Array.from(adv)
        for (let i of advices) {
            let index = advArr.indexOf(i.value)
            if (index > -1) {
                advArr.splice(index, 1)
            }
        }

        if (advArr.length > 0) {
            return new ValidationResultError("Invalid advice", adv)
        }
        return new ValidationResultSuccess()
    }

    static validConsent(consent?: any): ValidationResult {
        if (!consent || typeof consent.processing !== 'boolean' || typeof consent.publicContact !== 'boolean') {
            return new ValidationResultError('Invalid consent', consent)
        }
        return new ValidationResultSuccess()
    }

    static validOrganization(org?: string): ValidationResult {
        return this.validTextShort(org)
    }


    static validProfileFields(object: any, role: string): ValidationResult {
        // Address
        let results = []
        results.push(this.validCity(object.address?.city))
        results.push(this.validZipcode(object.address?.zipcode))
        
        // Contact
        results.push(this.validFirstname(object.contact?.firstname))
        results.push(this.validLastname(object.contact?.lastname))
        results.push(this.validPhone(object.contact?.phone))
        results.push(this.validEmail(object.contact?.email))

        // Other
        results.push(this.validDescription(object.description))
        results.push(this.validConsent(object.consent))

        if (role == "lab") {
            results.push(this.validName(object.name))
            results.push(this.validStreet(object.address?.street))
        }
        else {
            results.push(this.validSkills(object.details?.skills))
            results.push(this.validOrganization(object.organization))
        }

        for (let i of results) {
            if (!i.valid && i.value != null) {
                return i
            }
        }

        return new ValidationResultSuccess()
    }
}

