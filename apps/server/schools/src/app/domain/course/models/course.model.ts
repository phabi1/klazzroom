import { Model } from 'mongoose';
import { Student } from './student.model';
import { AggregatorModelMethods } from '@klazzroom/libs-server-mongoose-cqrs';

export interface Course {
  readonly id: string;
  gradeIds: string[];
  holidayZone: string;
  students: Student[];
}

export type CourseMethods = AggregatorModelMethods;

export type CourseModel = Model<Course, {}, CourseMethods>;
