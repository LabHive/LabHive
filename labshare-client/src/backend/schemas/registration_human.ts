import { ISchema, names } from './jsonschemas';
export let registration_human: ISchema = {
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
                rnaExtraction: { type: "number" },
                rtPcr: { type: "number" },
                hoursPerWeek: { type: "number" }
            },
            required: ["rnaExtraction", "rtPcr", "hoursPerWeek"]
        },
    },
    required: ["address", "firstname", "lastname", "contact", "description", "password", "details"]
}
