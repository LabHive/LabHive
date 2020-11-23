import { Document, Schema } from 'mongoose';
import { ITimestamp } from './ITimestamps';
import { IUserLabDiag } from './IUserLabDiag';
import { Optional } from 'lib/optional'


export interface ITestCapacity extends Document, ITimestamp {
  totalCapacity: number,
  usedCapacity: number,
  positiveRate: Optional<number>,
  sampleBackup: Optional<number>,
  staging: boolean,
  user: IUserLabDiag['_id']
}

export const TestCapacitySchema = new Schema({
  totalCapacity: Number,
  usedCapacity: Number,
  positiveRate: Number,
  sampleBackup: Number,
  staging: Boolean,
  user: {
    type: Schema.Types.ObjectId,
  }
}, {
  timestamps: true
})


