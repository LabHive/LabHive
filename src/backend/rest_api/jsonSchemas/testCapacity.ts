import { Schema } from 'jsonschema';
import { Schemas } from './schemaIdentifier';


export const testCapacity: Schema = {
  id: Schemas.testCapcity,
  type: "object",
  properties: {
    totalCapacity: { type: "number" },
    usedCapacity: { type: "number" },
    sampleBackup: { type: "number" },
    positiveRate: { type: "number" },
    createdAt: { 
      type: "string",
      format: "date-time"
    }
  },
  required: [
    "totalCapacity",
    "usedCapacity",
    "createdAt"
  ],
  additionalProperties: false
};