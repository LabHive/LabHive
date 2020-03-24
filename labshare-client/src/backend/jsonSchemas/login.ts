import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';

export let login: Schema = {
    id: Schemas.login,
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
    required: ["email", "password"]
};
