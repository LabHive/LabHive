import jsonschema from 'jsonschema';




export interface ISchema extends jsonschema.Schema { }

export const names = {
    address: "/address",
    contact: "/contact",
    password_forgotton: "/password_forgotton",
    password_reset: "/password_reset",
    registration_human: "/registration_human",
    registration_lab: "/registration_lab",
    login: "/login"
}



import { address } from './address';
import { contact } from './contact';
import { registration_human } from "./registration_human";
import { registration_lab } from "./registration_lab";
import { password_forgotton } from "./password_forgotton";
import { password_reset } from "./password_reset";
import { login } from "./login";



let validator = new jsonschema.Validator()
validator.addSchema(address, names.address)
validator.addSchema(contact, names.contact)


export let schemas = {
    registration_human,
    registration_lab,
    password_forgotton,
    password_reset,
    login
}


export function validateSchema(obj: any, schema: ISchema) {
    let result = validator.validate(obj, schema)
    console.log(result.toString())
    return result.valid
}


