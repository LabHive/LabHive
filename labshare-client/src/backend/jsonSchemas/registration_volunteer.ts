import { Schema } from 'jsonschema';
import { userCommon } from './userCommon';

export let registration_volunteer: Schema = {
    id: "/registration_volunteer",
    type: "object",
    properties: {
        ...userCommon,
        availability: { type: "boolean" },
        organization: { type: "string" },
        details: {
            type: "object",
            properties: {
                skills: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            },
            required: ["skills"]
        },
    },
    required: ["address", "contact", "description", "password", "details", "availability", "consent", "organization"]
}
