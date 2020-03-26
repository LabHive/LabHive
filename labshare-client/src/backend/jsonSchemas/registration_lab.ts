import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';
import { address } from './address';
import { contact } from './contact';

export let registration_lab: Schema = {
    id: Schemas.registration_lab,
    type: "object",
    properties: {
        address: address,
        contact: contact,
        name: { type: "string" },
        description: { type: "string" },
        password: { type: "string" },
        consent: {
            type: "object",
            properties: {
                processing: { type: "boolean" },
                publicContact: { type: "boolean" },
            },
            required: ["processing", "publicContact"]
        }
    },
    required: ["address", "contact", "name", "description", "password", "consent"]
};
