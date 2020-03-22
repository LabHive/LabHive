import jsonschema from 'jsonschema'

const names = {
    address: "/address",
    contact: "/contact",
    password_forgotton: "/password_forgotton",
    password_reset: "/password_reset",
    registration_human: "/registration_human",
    registration_lab: "/registration_lab",
    login: "/login"
}

let address = {
    id: names.address,
    type: "object",
    properties: {
        city: { type: "string" },
        zipcode: { type: "string" },
        street: { type: "string" }
    },
    required: ["city", "zipcode"]
}


let password_forgotton = {
    id: names.password_forgotton,
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: [ "email" ]
}

let password_reset = {
    id: names.password_reset,
    type: "object",
    properties: {
        newPassword: { type: "string" },
        oldPassword: { type: "string" },
    },
    required: [ "newPassword" ]
}

let contact = {
    id: names.contact,
    type: "object",
    properties: {
        email: { type: "string" },
        phone: { type: "string" },
        firstname: { type: "string" },
        lastname: { type: "string" }
    },
    required: [ "email", "phone" ]
}

let registration_human = {
    id: "/registration_human",
    type: "object",
    properties: {
        address: { "$ref": names.address },
        firstname: { "type": "string" },
        lastname: { "type": "string" },
        contact: { "$ref": names.contact },
        description: { type: "string" },
        password: { type: "string" },
        available: { type: "boolean" },
        details: { 
            type: "object",
            properties: {
                "RNA-Extraction": { type: "number" },
                "RT-PCR": { type: "number" },
                "hoursPerWeek": { type: "number" }
            },
            required: ["RNA-Extraction", "RT-PCR", "hoursPerWeek"]
        },
    },
    required: ["address", "firstname", "lastname", "contact", "description", "password", "available", "details"]
}


let registration_lab = {
    id: names.registration_lab,
    type: "object",
    properties: {
        address: { "$ref": names.address },
        labContact: { "$ref": names.contact },
        name: { type: "string" },
        description: { type: "string" },
        password: { type: "string" },
    },
    required: [ "address", "labContact", "description", "password" ]
}


let login = {
    id: names.login,
    type: "object",
    properties: {
        address: { "$ref": names.address },
        labContact: { "$ref": names.contact },
        name: { type: "string" },
        description: { type: "string" },
        password: { type: "string" },
    },
    required: ["address", "labContact", "description", "password"]
}



let validator = new jsonschema.Validator()
validator.addSchema(address, names.address)
validator.addSchema(contact, names.contact)

let schemas = {
    registration_human,
    registration_lab,
    password_forgotton,
    password_reset,
    login
}


export { validator, schemas } 


