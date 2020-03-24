import jsonschema from 'jsonschema';

import { registration_human } from "./registration_human";
import { registration_lab } from "./registration_lab";
import { password_forgotton } from "./password_forgotton";
import { password_reset } from "./password_reset";
import { login } from "./login";
import { Schemas, SchemaIdenifier } from './schemaIdentifier';

interface SchemaMap {
    [key: string]: jsonschema.Schema
}

export let schemas: SchemaMap = {
    registration_human,
    registration_lab,
    password_forgotton,
    password_reset,
    login
}

let validator = new jsonschema.Validator()

class JsonSchema {
    
    public validate(obj: any, schema: jsonschema.Schema) {
        let result = validator.validate(obj, schema)
        console.log(result.toString())
        return result.valid
    }
}

export default new JsonSchema()

