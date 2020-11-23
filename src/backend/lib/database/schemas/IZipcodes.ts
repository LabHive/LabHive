import { Schema, Document } from 'mongoose';


export interface IZipcode extends Document {
  zipcode: string,
  location: {
    type: string;
    coordinates: number[];
  };
  city: string
}

export const ZipcodeSchema = new Schema({
  zipcode: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  city: String
});
