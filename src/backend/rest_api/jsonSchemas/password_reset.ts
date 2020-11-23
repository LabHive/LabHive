import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';

export let password_reset: Schema = {
    id: Schemas.password_reset,
    type: "object",
    properties: {
        newPassword: { type: "string" },
        oldPassword: { type: "string" },
    },
    required: ["newPassword"]
};
