import { Schema } from 'jsonschema';
import { userCommon } from './userCommon';

export let registration_volunteer: Schema = {
    id: "/registration_volunteer",
    type: "object",
    properties: {
        ...userCommon,
        availability: { type: "boolean" },
        details: {
            type: "object",
            properties: {
                skills: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                qualifications: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
            },
            required: ["skills", "qualifications"]
        },
    },
    required: ["address", "contact", "description", "password", "details", "availability", "consent", "organization", "website"]
}
