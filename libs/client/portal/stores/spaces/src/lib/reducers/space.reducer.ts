import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { SpaceActions } from '../actions/space.actions';
import { Space } from '../models/space.model';

export const spacesFeatureKey = 'spaces';

export interface State extends EntityState<Space> {
  loading: boolean;
  loaded: boolean;
  currentSpaceId: string | null;
}

export const adapter: EntityAdapter<Space> = createEntityAdapter<Space>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  currentSpaceId: null,
});

export const reducer = createReducer(
  initialState,
  on(SpaceActions.loadSpaces, (state): State => ({ ...state, loading: true })),
  on(SpaceActions.loadSpacesSuccess, (state, action) =>
    adapter.setAll(action.spaces, { ...state, loading: false, loaded: true })
  ),
  on(
    SpaceActions.loadSpacesFailure,
    (state): State => ({ ...state, loading: false })
  ),
  on(
    SpaceActions.selectSpace,
    (state, action): State => ({ ...state, currentSpaceId: action.spaceId })
  )
);

export const spacesFeature = createFeature({
  name: spacesFeatureKey,
  reducer,
  extraSelectors: ({ selectSpacesState }) => ({
    ...adapter.getSelectors(selectSpacesState),
  }),
});
