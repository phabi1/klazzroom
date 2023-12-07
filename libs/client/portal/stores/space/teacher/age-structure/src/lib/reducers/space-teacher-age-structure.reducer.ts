import { createFeature, createReducer, on } from '@ngrx/store';
import { SpaceTeacherAgeStructureActions } from '../actions/space-teacher-age-structure.actions';

export const spaceTeacherAgeStructureFeatureKey = 'spaceTeacherAgeStructure';

export interface State {
  loading: boolean;
  students: any[];
}

export const initialState: State = {
  loading: false,
  students: [],
};

export const reducer = createReducer(
  initialState,
  on(
    SpaceTeacherAgeStructureActions.load,
    (state): State => ({...state, loading: true})
  ),
  on(
    SpaceTeacherAgeStructureActions.loadSuccess,
    (state, action): State => ({
      ...state,
      loading: false,
      students: action.students,
    })
  ),
);

export const spaceTeacherAgeStructureFeature = createFeature({
  name: spaceTeacherAgeStructureFeatureKey,
  reducer,
});
