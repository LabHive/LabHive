import { Schemas } from "./schemaIdentifier";
import { Schema } from 'jsonschema';
import { userCommon } from './userCommon';

export let registration_labDiag: Schema = {
    id: Schemas.registration_labDiag,
    type: "object",
    properties: {
        ...userCommon,
        name: { type: "string" },
        lookingFor: {
            properties: {
                volunteerSkills: {
                    type: "array",
                    items: { type: "string" }
                },
                advice: {
                    type: "array",
                    items: { type: "string" }
                },
                equipment: {
                    type: "array",
                    items: { type: "string" }
                },
            },
            required: ["volunteerSkills", "advice", "equipment"]
        }
    },
    required: ["address", "contact", "name", "description", "password", "consent"]
};
