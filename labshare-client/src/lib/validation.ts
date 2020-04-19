import { ValidationError } from '../backend/errors';
import { labSkills, equipment, advices, qualification } from "./selectLists";
import './optional'
import { UserRoles } from './userRoles';
import { IUserCommon } from '../backend/database/schemas/IUserCommon';

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
    constructor(value: any = undefined) {
        super(true, '', value)
    }
}


function checkArray(got: Optional<string[]>, expected: { text: string, value: string }[], reason: string): ValidationResult {
    if (!got)
        return new ValidationResultError(reason, got)

    let gotCopy = Array.from(got)
    for (let i of expected) {
        let index = gotCopy.indexOf(i.value)
        if (index > -1) {
            gotCopy.splice(index, 1)
        }
    }

    if (gotCopy.length > 0) {
        return new ValidationResultError(reason, got)
    }
    return new ValidationResultSuccess()
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
            if (phone == "") return new ValidationResultSuccess("");
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

    static validRole(role?: string): ValidationResult {
        let roles: string[] = [UserRoles.LAB_DIAG, UserRoles.LAB_RESEARCH, UserRoles.VOLUNTEER]

        if (!role || roles.indexOf(role) == -1) {
            return new ValidationResultError("invalid_role", role)
        }
        return new ValidationResultSuccess()
    }

    static validSkills(skills?: string[]): ValidationResult {
        return checkArray(skills, labSkills, "invalid_skills")
    }

    static validEquipment(equip?: string[]): ValidationResult {
        return checkArray(equip, equipment, "invalid_equipment")
    }

    static validAdvice(adv?: string[]): ValidationResult {
        return checkArray(adv, advices, "invalid_advice")
    }

    static validConsent(consent?: any): ValidationResult {
        if (!consent || typeof consent.publicSearch !== 'boolean' || typeof consent.mailUpdates !== 'boolean') {
            return new ValidationResultError('invalid_consent', consent)
        }
        return new ValidationResultSuccess()
    }

    static validOrganization(org?: string): ValidationResult {
        return Validator.validTextShort(org, 'invalid_organization')
    }

    static validUrl(url?: string): ValidationResult {
        if (url === '') return new ValidationResultSuccess('')
        let regexpUrl = new RegExp(/^https?:\/\/[^\s"'\\]+$/);
        if (!url || !regexpUrl.test(url)) {
            return new ValidationResultError('invalid_url', url)
        }
        return new ValidationResultSuccess()
    }

    static validQualifications(q?: string[]): ValidationResult {
        return checkArray(q, qualification, "invalid_qualification")
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

        results.push(Validator.validOrganization(object.organization))
        results.push(Validator.validUrl(object.website))

        if (role === UserRoles.LAB_DIAG || role === UserRoles.LAB_RESEARCH) {
            results.push(Validator.validStreet(object.address?.street))

            if (object.lookingFor) {
                if (object.lookingFor.advice) results.push(Validator.validAdvice(object.lookingFor.advice))
                if (object.lookingFor.volunteerSkills) results.push(Validator.validSkills(object.lookingFor.volunteerSkills))
                if (object.lookingFor.equipment) results.push(Validator.validEquipment(object.lookingFor.equipment))
                if (object.lookingFor.equipmentDescription) results.push(Validator.validTextLong(object.lookingFor.equipmentDescription, "invalid_equipmentDescription"))
                if (object.lookingFor.adviceDescription) results.push(Validator.validTextLong(object.lookingFor.adviceDescription, "invalid_adviceDescription"))
            }

            if (object.offers) {
                if (object.offers.advice) results.push(Validator.validAdvice(object.offers.advice))
                if (object.offers.equipment) results.push(Validator.validEquipment(object.offers.equipment))
                if (object.offers.equipmentDescription) results.push(Validator.validTextLong(object.offers.equipmentDescription, "invalid_equipmentDescription"))
                if (object.offers.adviceDescription) results.push(Validator.validTextLong(object.offers.adviceDescription, "invalid_adviceDescription"))
            }
        }
        else {
            results.push(Validator.validSkills(object.details?.skills))
            results.push(Validator.validQualifications(object.details?.qualifications))
        }

        for (let i of results) {
            if (!i.valid && i.value != null) {
                return i
            }
        }

        return new ValidationResultSuccess()
    }
}

