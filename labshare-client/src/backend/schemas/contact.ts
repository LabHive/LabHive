import { ISchema, names } from './jsonschemas';
export let contact: ISchema = {
    id: names.contact,
    type: "object",
    properties: {
        email: { type: "string" },
        phone: { type: "string" },
        firstname: { type: "string" },
        lastname: { type: "string" }
    },
    required: ["email", "phone"]
};
