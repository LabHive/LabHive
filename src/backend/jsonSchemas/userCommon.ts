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
            publicSearch: { type: "boolean" },
            mailUpdates: { type: "boolean" },
        },
        required: ["publicSearch", "mailUpdates"]
    },
    organization: { type: "string" },
    website: { type: "string" }
}