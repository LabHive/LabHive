import { Schema } from 'jsonschema';

export let address: Schema = {
    type: "object",
    properties: {
        city: { type: "string" },
        zipcode: { type: "string" },
        street: { type: "string" }
    },
    required: ["city", "zipcode"]
};
