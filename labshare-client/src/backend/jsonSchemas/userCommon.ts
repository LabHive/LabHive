import { address } from './address';
import { contact } from './contact';


export let userCommon = {
    address: address,
    contact: contact,
    description: { type: "string" },
    password: { type: "string" },
    consent: {
        type: "object",
        properties: {
            processing: { type: "boolean" },
            publicContact: { type: "boolean" },
        },
        required: ["processing", "publicContact"]
    },
    organization: { type: "string" },
    website: { type: "string" }
}