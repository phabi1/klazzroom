import { Schema } from 'mongoose';

export const TeacherSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userId: {
    type: String,
  },
});
