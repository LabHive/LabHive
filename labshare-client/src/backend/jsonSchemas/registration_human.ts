import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';
import { contact } from './contact';
import { address } from './address';

export let registration_human: Schema = {
    id: "/registration_human",
    type: "object",
    properties: {
        address: address,
        contact: contact,
        description: { type: "string" },
        password: { type: "string" },
        availability: { type: "boolean" },
        details: {
            type: "object",
            properties: {
                skills: {
                    type: "array",
                }
            },
            required: ["skills"]
        },
    },
    required: ["address", "contact", "description", "password", "details", "availability"]
}
