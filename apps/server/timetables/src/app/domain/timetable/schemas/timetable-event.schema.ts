import { Schema } from 'mongoose';

export const TimetableEventSchema = new Schema({
  title: {
    type: String,
  },
  startAt: {
    type: Date,
  },
  endAt: {
    type: Date,
  },
});
