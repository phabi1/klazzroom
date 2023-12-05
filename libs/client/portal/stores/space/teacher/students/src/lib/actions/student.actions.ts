import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CreateStudentInput,
  Grade,
  Student,
  UpdateStudentInput,
} from '../../graphql/generated';

export const SpaceTeacherStudentsActions = createActionGroup({
  source: 'Student/API',
  events: {
    Init: props<{ course: string }>(),
    'Init Complete': props<{ grades: Grade[]; students: Student[] }>(),
    'Add Student': props<{ student: CreateStudentInput }>(),
    'Add Student Success': props<{ student: Student }>(),
    'Add Student Failure': props<{ error: string }>(),
    'Update Student': props<{
      id: string;
      student: UpdateStudentInput;
    }>(),
    'Update Student Success': props<{ student: Update<Student> }>(),
    'Update Student Failure': props<{ error: string }>(),
    'Delete Student': props<{ id: string }>(),
    'Delete Student Success': props<{ id: string }>(),
    'Delete Student Failure': props<{ error: string }>(),
    'Select Student': props<{ id: string }>(),
    'Clear Students': emptyProps(),
  },
});
