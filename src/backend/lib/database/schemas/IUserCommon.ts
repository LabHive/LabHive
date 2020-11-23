import { Document, Schema } from 'mongoose';
import { ITimestamp } from './ITimestamps';
import { LANG_TYPE } from '../../constants';
import { UserRoles } from '../../../../lib/userRoles';
import { v4 } from "uuid";

export interface IUserCommon extends Document, ITimestamp {
    role: UserRoles;
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
        publicSearch: boolean;
        mailUpdates: boolean;
    };
    verified: {
        mail?: boolean,
        manually?: boolean,
    },
    language: LANG_TYPE,
    disabled: boolean,
    slug: string,
    secretRandomId: string,
    __t: String
}

export const UserCommonSchema = new Schema(
  {
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
      email: String
    },
    description: String,
    password: String,
    consent: {
      publicSearch: Boolean,
      mailUpdates: Boolean
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
    slug: {
      type: String,
      required: true,
      default: () => {
        return v4()
      }
    },
    language: String,
    secretRandomId: {
      type: String,
      required: true,
      default: () => {
        return v4()
      }
    }
}, {
    timestamps: true
  }
);
