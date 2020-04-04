import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';
import { userCommon } from './userCommon';

export let registration_labResearch: Schema = {
    id: Schemas.registration_labDiag,
    type: "object",
    properties: {
        ...userCommon,
        name: { type: "string" },
        offers: {
            properties: {
                advice: {
                    type: "array",
                    items: { type: "string" }
                },
                equipment: {
                    type: "array",
                    items: { type: "string" }
                }
            }
        }
    },
    required: ["address", "contact", "name", "description", "password", "consent"]
};
