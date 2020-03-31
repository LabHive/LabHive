import { ValidationError } from '../backend/errors';
import { labSkills, equipment, advices } from "./selectLists";
import './optional'

export class ValidationResult {
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

export class ValidationResultError extends ValidationResult {
    constructor(msg: string, value: Optional<any>) {
        super(false, msg, value)
    }
}

export class ValidationResultSuccess extends ValidationResult {
    constructor() {
        super(true, '', undefined)
    }
}

export class Validator {
    static validEmail(email?: string): ValidationResult {
        let regexpEmail = new RegExp(/^.+@.+\..+$/);
        if (!email || !regexpEmail.test(email)) {
            return new ValidationResultError("invalid_email", email)
        }
        return new ValidationResultSuccess()
    }

    static validFirstname(firstname?: string): ValidationResult {
        return Validator.validTextShort(firstname, "invalid_firstname");
    }

    static validLastname(lastname?: string): ValidationResult {
        return Validator.validTextShort(lastname, "invalid_lastname");
    }

    static validZipcode(zipcode?: string): ValidationResult {
        let regexpZipCode = new RegExp(/^[0-9]{5}$/);
        if (!zipcode || !regexpZipCode.test(zipcode)) {
            return new ValidationResultError("invalid_zipcode", zipcode)
        }
        return new ValidationResultSuccess()
    }

    static validCity(city?: string): ValidationResult {
        return Validator.validTextShort(city, "invalid_city");
    }

    static validStreet(street?: string): ValidationResult {
        return Validator.validTextShort(street, "invalid_street");
    }

    static validPhone(phone?: string): ValidationResult {
        let regexpPhone = new RegExp(/^[0-9+ ()]+$/);
        if (!phone || !regexpPhone.test(phone)) {
            return new ValidationResultError("invalid_phone", phone)
        }
        return new ValidationResultSuccess()
    }

    static validDescription(description?: string): ValidationResult {
        if (description === "") {
            description = " "
        }
        return Validator.validTextLong(description, "invalid_description");
    }

    static validName(name?: string): ValidationResult {
        return Validator.validTextShort(name, "invalid_name")
    }


    private static validTextShort(text: Optional<string>, desc: string): ValidationResult {
        if (!text || text.length > 200) {
            return new ValidationResultError(desc, text)
        }
        return new ValidationResultSuccess()
    }

    private static validTextLong(text: Optional<string>, desc: string): ValidationResult {
        if (!text || text.length > 2000) {
            return new ValidationResultError(desc, text)
        }
        return new ValidationResultSuccess()
    }

    private static validNumber(number?: number): ValidationResult {
        if (!number || !Number.isInteger(number)) {
            return new ValidationResultError("invalid_number", number)
        }
        return new ValidationResultSuccess()
    }

    static validSearchType(searchtype?: string): ValidationResult {
        if (!searchtype || (searchtype !== "human_ressources" && searchtype !== "device" && searchtype !== "advice")) {
            return new ValidationResultError("invalid_search", searchtype)
        }
        return new ValidationResultSuccess()
    }

    static validRole(role?: string): ValidationResult {
        if (!role || (role !== "lab" && role !== "human")) {
            return new ValidationResultError("invalid_role", role)
        }
        return new ValidationResultSuccess()
    }

    static validSkills(skills?: string[]): ValidationResult {
        if (!skills) 
            return new ValidationResultError("invalid_skills", skills)

        
        let skillCopy = Array.from(skills)
        for (let i of labSkills) {
            let index = skillCopy.indexOf(i.value)
            if (index > -1) {
                skillCopy.splice(index, 1)
            }
        }

        if (skillCopy.length > 0) {
            return new ValidationResultError("invalid_skills", skills)
        }
        return new ValidationResultSuccess()
    }

    static validEquipment(equip?: string[]): ValidationResult {
        if (!equip)
            return new ValidationResultError("invalid_equipment", equip)

        let eqipCopy = Array.from(equip)
        for (let i of equipment) {
            let index = eqipCopy.indexOf(i.value)
            if (index > -1) {
                eqipCopy.splice(index, 1)
            }
        }

        if (eqipCopy.length > 0) {
            return new ValidationResultError("invalid_equipment", equip)
        }
        return new ValidationResultSuccess()
    }

    static validAdvice(adv?: string[]): ValidationResult {
        if (!adv)
            return new ValidationResultError("invalid_advice", adv)

        let advArr = Array.from(adv)
        for (let i of advices) {
            let index = advArr.indexOf(i.value)
            if (index > -1) {
                advArr.splice(index, 1)
            }
        }

        if (advArr.length > 0) {
            return new ValidationResultError("invalid_advice", adv)
        }
        return new ValidationResultSuccess()
    }

    static validConsent(consent?: any): ValidationResult {
        if (!consent || typeof consent.processing !== 'boolean' || typeof consent.publicContact !== 'boolean') {
            return new ValidationResultError('invalid_consent', consent)
        }
        return new ValidationResultSuccess()
    }

    static validOrganization(org?: string): ValidationResult {
        return Validator.validTextShort(org, 'invalid_organization')
    }


    static validProfileFields(object: any, role: string): ValidationResult {
        // Address
        let results = []
        results.push(Validator.validCity(object.address?.city))
        results.push(Validator.validZipcode(object.address?.zipcode))
        
        // Contact
        results.push(Validator.validFirstname(object.contact?.firstname))
        results.push(Validator.validLastname(object.contact?.lastname))
        results.push(Validator.validPhone(object.contact?.phone))
        results.push(Validator.validEmail(object.contact?.email))

        // Other
        results.push(Validator.validDescription(object.description))
        results.push(Validator.validConsent(object.consent))

        if (role == "lab") {
            results.push(Validator.validName(object.name))
            results.push(Validator.validStreet(object.address?.street))
        }
        else {
            results.push(Validator.validSkills(object.details?.skills))
            results.push(Validator.validOrganization(object.organization))
        }

        for (let i of results) {
            if (!i.valid && i.value != null) {
                return i
            }
        }

        return new ValidationResultSuccess()
    }
}

