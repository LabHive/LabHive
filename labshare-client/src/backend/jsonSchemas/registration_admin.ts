import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';

export let registration_admin: Schema = {
    id: Schemas.registration_admin,
    type: "object",
    properties: {
        contact: {
            type: 'object',
            properties: {
                email: { type: "string" },
                firstname: { type: "string" },
                lastname: { type: "string" }
            },
            required: ["email", "firstname", "lastname"]
        },
        password: { type: "string" },
    },
    required: ["contact", "password"]
};
