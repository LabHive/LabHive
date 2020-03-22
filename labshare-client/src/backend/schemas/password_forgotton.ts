import { ISchema, names } from './jsonschemas';
export let password_forgotton: ISchema = {
    id: names.password_forgotton,
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: ["email"]
};
