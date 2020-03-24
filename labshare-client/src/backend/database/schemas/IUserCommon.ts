import { Document, Schema } from "mongoose";
export interface IUserCommon extends Document {
    role: string,
    location: {
        type: string;
        coordinates: number[];
    };
    address: {
        city: string;
        zipcode: string;
        street: string;
    };
    contact: {
        firstname: string,
        lastname: string,
        phone: string,
        email: string,
    }
    description: string;
    password: string;
}

export const UserCommonSchema = new Schema({
    role: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: {
        city: String,
        zipcode: String,
        street: String
    },
    contact: {
        firstname: String,
        lastname: String,
        phone: String,
        email: String,
    },
    description: String,
    password: String,
})
