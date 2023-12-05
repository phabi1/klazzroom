import { createSelector } from '@ngrx/store';
import { spaceTeacherStudentsFeature } from '../reducers/student.reducer';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectLoaded,
  selectCourse,
  selectGrades,
  selectCurrentId,
} = spaceTeacherStudentsFeature;

export const selectCurrentStudent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => {
    if (!id) return null;
    return entities[id];
  }
);
