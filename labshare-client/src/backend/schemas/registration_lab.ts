import { ISchema, names } from './jsonschemas';
export let registration_lab: ISchema = {
    id: names.registration_lab,
    type: "object",
    properties: {
        address: { "$ref": names.address },
        labContact: { "$ref": names.contact },
        name: { type: "string" },
        description: { type: "string" },
        password: { type: "string" },
    },
    required: ["address", "labContact", "description", "password"]
};
