import { ISchema, names } from './jsonschemas';
export let login: ISchema = {
    id: names.login,
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
    required: ["email", "password"]
};
