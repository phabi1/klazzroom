import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Grade, Student } from '../../graphql/generated';
import { SpaceTeacherStudentsActions } from '../actions/student.actions';

export const spaceTeacherStudentsFeatureKey = 'spaceTeacherStudents';

export interface State extends EntityState<Student> {
  loaded: boolean;
  course: string | null;
  grades: Grade[];
  currentId: string | null;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  course: null,
  grades: [],
  currentId: null,
});

export const reducer = createReducer(
  initialState,

  on(SpaceTeacherStudentsActions.addStudentSuccess, (state, action) =>
    adapter.addOne(action.student, state)
  ),
  on(SpaceTeacherStudentsActions.updateStudentSuccess, (state, action) =>
    adapter.updateOne(action.student, state)
  ),
  on(SpaceTeacherStudentsActions.deleteStudentSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(SpaceTeacherStudentsActions.init, (state, action) =>
    adapter.removeAll({
      ...state,
      course: action.course,
    })
  ),
  on(SpaceTeacherStudentsActions.initComplete, (state, action) =>
    adapter.setAll(action.students, {
      ...state,
      loaded: true,
      grades: action.grades,
    })
  ),
  on(
    SpaceTeacherStudentsActions.selectStudent,
    (state, action): State => ({
      ...state,
      currentId: action.id,
    })
  )
);

export const spaceTeacherStudentsFeature = createFeature({
  name: spaceTeacherStudentsFeatureKey,
  reducer,
  extraSelectors: ({ selectSpaceTeacherStudentsState }) => ({
    ...adapter.getSelectors(selectSpaceTeacherStudentsState),
  }),
});
