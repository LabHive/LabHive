import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';

export let password_forgotton: Schema = {
    id: Schemas.password_forgotton,
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: ["email"]
};
