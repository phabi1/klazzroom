import { Schema, SchemaTypes } from 'mongoose';
import { TeacherSchema } from './teacher.schema';
import { StudentSchema } from './student.schema';

export const CourseSchema = new Schema({
  gradeIds: {
    type: [SchemaTypes.ObjectId],
  },
  holidayZone: {
    type: String,
    default: '',
  },
  teachers: {
    type: [TeacherSchema],
    ref: 'Teacher',
    default: [],
  },
  students: {
    type: [StudentSchema],
    default: [],
  },
});

export const CourseSchemaName = 'Course';
