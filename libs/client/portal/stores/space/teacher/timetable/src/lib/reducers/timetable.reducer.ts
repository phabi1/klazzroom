import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { SpaceTeacherTimetableActions } from '../actions/timetable.actions';
import { Timetable } from '../../graphql/generated';

export const spaceTeacherTimetablesFeatureKey = 'spaceTeacherTimetables';

export interface State extends EntityState<Timetable> {
  loading: boolean;
  saving: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Timetable> =
  createEntityAdapter<Timetable>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  saving: false,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(SpaceTeacherTimetableActions.addTimetable, (state, action) =>
    adapter.addOne(action.timetable, state)
  ),
  on(SpaceTeacherTimetableActions.upsertTimetable, (state, action) =>
    adapter.upsertOne(action.timetable, state)
  ),
  on(SpaceTeacherTimetableActions.addTimetables, (state, action) =>
    adapter.addMany(action.timetables, state)
  ),
  on(SpaceTeacherTimetableActions.upsertTimetables, (state, action) =>
    adapter.upsertMany(action.timetables, state)
  ),
  on(SpaceTeacherTimetableActions.updateTimetableSuccess, (state, action) =>
    adapter.updateOne(action.timetable, state)
  ),
  on(SpaceTeacherTimetableActions.updateTimetables, (state, action) =>
    adapter.updateMany(action.timetables, state)
  ),
  on(SpaceTeacherTimetableActions.deleteTimetable, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(SpaceTeacherTimetableActions.deleteTimetables, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(SpaceTeacherTimetableActions.loadTimetablesSuccess, (state, action) =>
    adapter.setAll(action.timetables, state)
  ),
  on(SpaceTeacherTimetableActions.clearTimetables, (state) => adapter.removeAll(state))
);

export const timetablesFeature = createFeature({
  name: spaceTeacherTimetablesFeatureKey,
  reducer,
  extraSelectors: ({ selectSpaceTeacherTimetablesState }) => ({
    ...adapter.getSelectors(selectSpaceTeacherTimetablesState),
  }),
});
