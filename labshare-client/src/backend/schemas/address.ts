import { ISchema, names } from './jsonschemas';
export let address: ISchema = {
    id: names.address,
    type: "object",
    properties: {
        city: { type: "string" },
        zipcode: { type: "string" },
        street: { type: "string" }
    },
    required: ["city", "zipcode"]
};
