import { Schema } from 'mongoose';
import { TimetableEventSchema } from './timetable-event.schema';

export const TimetableSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  events: {
    type: [TimetableEventSchema],
    default: () => [],
  },
  tags: {
    type: [String],
  },
});

export const TimetableSchemaName = 'Timetable';