import { createSelector } from '@ngrx/store';
import { spacesFeature } from '../reducers/space.reducer';

export const {
  selectSpacesState,
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectLoading,
  selectLoaded,
  selectCurrentSpaceId,
} = spacesFeature;

export const selectCurrentSpace = createSelector(
  selectEntities,
  selectCurrentSpaceId,
  (entities, id) => (id ? entities[id] : null)
);
