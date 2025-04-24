import { Schema, SchemaTypes } from 'mongoose';

export const StudentSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  userId: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  gradeId: {
    type: SchemaTypes.ObjectId,
  },
  birthday: {
    type: Date,
  },
  sex: {
    type: String,
  },
});
