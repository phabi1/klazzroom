import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Student } from '../models/student.model';
import { Grade } from '../models/grade.model';

export const SpaceTeacherStudentsActions = createActionGroup({
  source: 'Student/API',
  events: {
    Init: props<{ course: string }>(),
    'Init Complete': props<{ grades: Grade[]; students: Student[] }>(),
    'Add Student': props<{ student: Student }>(),
    'Upsert Student': props<{ student: Student }>(),
    'Add Students': props<{ students: Student[] }>(),
    'Upsert Students': props<{ students: Student[] }>(),
    'Update Student': props<{ student: Update<Student> }>(),
    'Update Students': props<{ students: Update<Student>[] }>(),
    'Delete Student': props<{ id: string }>(),
    'Delete Students': props<{ ids: string[] }>(),
    'Clear Students': emptyProps(),
  },
});
