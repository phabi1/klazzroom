import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../models/student.model';
import { SpaceTeacherStudentsActions } from '../actions/student.actions';
import { Grade } from '../models/grade.model';

export const spaceTeacherStudentsFeatureKey = 'spaceTeacherStudents';

export interface State extends EntityState<Student> {
  loaded: boolean;
  course: string | null;
  grades: Grade[];
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  course: null,
  grades: [],
});

export const reducer = createReducer(
  initialState,
  on(SpaceTeacherStudentsActions.addStudent, (state, action) =>
    adapter.addOne(action.student, state)
  ),
  on(SpaceTeacherStudentsActions.upsertStudent, (state, action) =>
    adapter.upsertOne(action.student, state)
  ),
  on(SpaceTeacherStudentsActions.addStudents, (state, action) =>
    adapter.addMany(action.students, state)
  ),
  on(SpaceTeacherStudentsActions.upsertStudents, (state, action) =>
    adapter.upsertMany(action.students, state)
  ),
  on(SpaceTeacherStudentsActions.updateStudent, (state, action) =>
    adapter.updateOne(action.student, state)
  ),
  on(SpaceTeacherStudentsActions.updateStudents, (state, action) =>
    adapter.updateMany(action.students, state)
  ),
  on(SpaceTeacherStudentsActions.deleteStudent, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(SpaceTeacherStudentsActions.deleteStudents, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(SpaceTeacherStudentsActions.initComplete, (state, action) =>
    adapter.setAll(action.students, {
      ...state,
      loaded: true,
      grades: action.grades,
    })
  ),
  on(SpaceTeacherStudentsActions.clearStudents, (state) =>
    adapter.removeAll(state)
  )
);

export const spaceTeacherStudentsFeature = createFeature({
  name: spaceTeacherStudentsFeatureKey,
  reducer,
  extraSelectors: ({ selectSpaceTeacherStudentsState }) => ({
    ...adapter.getSelectors(selectSpaceTeacherStudentsState),
  }),
});
