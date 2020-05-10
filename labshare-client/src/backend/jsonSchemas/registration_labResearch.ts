import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';
import { userCommon } from './userCommon';

export let registration_labResearch: Schema = {
    id: Schemas.registration_labDiag,
    type: "object",
    properties: {
        ...userCommon,
        website: { type: "string" },
        offers: {
            properties: {
                advice: {
                    type: "array",
                    items: { type: "string" }
                },
                equipment: {
                    type: "array",
                    items: { type: "string" }
                },
                equipmentDescription: { type: "string" },
                adviceDescription: { type: "string" }
            },
            required: ["advice", "equipment", "equipmentDescription", "adviceDescription"]
        }
    },
    required: ["address", "contact", "organization", "description", "password", "consent", "website", "offers"]
};
