import { Schema } from 'jsonschema';

export let contact: Schema = {
    type: "object",
    properties: {
        email: { type: "string" },
        phone: { type: "string" },
        firstname: { type: "string" },
        lastname: { type: "string" }
    },
    required: ["email", "phone", "firstname", "lastname"]
};
