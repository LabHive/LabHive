import { ISchema, names } from './jsonschemas';
export let password_reset: ISchema = {
    id: names.password_reset,
    type: "object",
    properties: {
        newPassword: { type: "string" },
        oldPassword: { type: "string" },
    },
    required: ["newPassword"]
};
