import { Schema } from 'mongoose';

export const TeacherSpaceSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
});

export const TeacherSpaceSchemaName = 'teacher';