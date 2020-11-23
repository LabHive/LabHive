import jsonschema, { Schema } from 'jsonschema';

import { registration_volunteer } from "./registration_volunteer";
import { registration_labDiag } from "./registration_labDiag";
import { registration_labResearch } from "./registration_labResearch";
import { registration_admin } from "./registration_admin";
import { password_forgotton } from "./password_forgotton";
import { password_reset } from "./password_reset";
import { testCapacity } from "./testCapacity";
import { login } from "./login";
import { UserRoles } from 'lib/userRoles';
import { Optional } from 'lib/optional'

export const schemas = {
    registration_volunteer,
    registration_labDiag,
    registration_labResearch,
    registration_admin,
    password_forgotton,
    password_reset,
    testCapacity,
    login
}

let validator = new jsonschema.Validator()

class JsonSchema {
    
    public validate(obj: any, schema: Schema) {
        let result = validator.validate(obj, schema, {allowUnknownAttributes: false})
        if (!result.valid)
            console.log(result.toString())
        return result.valid
    }
}

export default new JsonSchema()

export function schemaForRole(role: string): Optional<jsonschema.Schema> {
    switch (role) {
        case UserRoles.LAB_DIAG:
            return JSON.parse(JSON.stringify(schemas.registration_labDiag))
        case UserRoles.LAB_RESEARCH:
            return JSON.parse(JSON.stringify(schemas.registration_labResearch))
        case UserRoles.VOLUNTEER:
            return JSON.parse(JSON.stringify(schemas.registration_volunteer))
        default:
            console.error("Invalid role")
            return undefined
    }
}

