import { Document, Schema } from "mongoose";
import { ITimestamp } from './ITimestamps';
import { LANG_TYPE } from '../../constants';
export interface IUserCommon extends Document, ITimestamp {
    role: string;
    organization: string;
    website: string;
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
    };
    description: string;
    password: string;
    consent: {
        processing: boolean;
        publicContact: boolean;
    };
    verified: {
        mail?: boolean,
        manually?: boolean,
    },
    language: LANG_TYPE,
    disabled: boolean,
    __t: String
}

export const UserCommonSchema = new Schema({
    role: String,
    organization: String,
    website: String,
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
    consent: {
        processing: Boolean,
        publicContact: Boolean,
    },
    verified: {
        mail: {
            type: Boolean,
            default: false
        },
        manually: {
            type: Boolean,
            default: false
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    language: String
}, {
    timestamps: true
})
