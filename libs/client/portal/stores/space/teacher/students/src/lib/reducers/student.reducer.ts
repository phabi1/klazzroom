import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Grade, Student } from '../../graphql/generated';
import { SpaceTeacherStudentsContactActions } from '../actions/contact.actions';
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
  on(SpaceTeacherStudentsContactActions.addContactSuccess, (state, action) => {
    if (state.currentId) {
      const student = state.entities[state.currentId];
      if (!student) {
        return state;
      }
      return adapter.updateOne(
        {
          id: state.currentId,
          changes: {
            contacts: student.contacts.concat(action.contact),
          },
        },
        state
      );
    }
    return state;
  }),
  on(
    SpaceTeacherStudentsContactActions.updateContactSuccess,
    (state, action) => {
      if (state.currentId) {
        const student = state.entities[state.currentId];
        if (!student) {
          return state;
        }
        return adapter.updateOne(
          {
            id: state.currentId,
            changes: {
              contacts: student.contacts.map((c) =>
                c.id === action.contact.id ? action.contact : c
              ),
            },
          },
          state
        );
      }
      return state;
    }
  ),
  on(
    SpaceTeacherStudentsContactActions.deleteContactSuccess,
    (state, action) => {
      if (state.currentId) {
        const student = state.entities[state.currentId];
        if (!student) {
          return state;
        }
        return adapter.updateOne(
          {
            id: state.currentId,
            changes: {
              contacts: student.contacts.filter((c) => c.id !== action.id),
            },
          },
          state
        );
      }
      return state;
    }
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
