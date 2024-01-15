import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Timetable, UpdateTimetableInput } from '../../graphql/generated';

export const SpaceTeacherTimetableActions = createActionGroup({
  source: 'Space Teacher Timetable/API',
  events: {
    'Load Timetable': props<{ id: string }>(),
    'Load Timetable Success': props<{ timetable: Timetable }>(),
    'Load Timetable Failure': props<{ error: string }>(),
    'Load Timetables': props<{ space: string }>(),
    'Load Timetables Success': props<{ timetables: Timetable[] }>(),
    'Load Timetables Failure': props<{ error: string }>(),
    'Add Timetable': props<{ timetable: Timetable }>(),
    'Upsert Timetable': props<{ timetable: Timetable }>(),
    'Add Timetables': props<{ timetables: Timetable[] }>(),
    'Upsert Timetables': props<{ timetables: Timetable[] }>(),
    'Update Timetable': props<{ id: string, input: UpdateTimetableInput }>(),
    'Update Timetable Success': props<{ timetable: Update<Timetable> }>(),
    'Update Timetable Failure': props<{ error: string }>(),
    'Update Timetables': props<{ timetables: Update<Timetable>[] }>(),
    'Delete Timetable': props<{ id: string }>(),
    'Delete Timetables': props<{ ids: string[] }>(),
    'Clear Timetables': emptyProps(),
  },
});
