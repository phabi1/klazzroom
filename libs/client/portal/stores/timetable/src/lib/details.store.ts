import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GetTimetableGQL,
  UpdateTimetableGQL,
} from '@klazzroom/libs-client-portal-graphql-timetables';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export type TimetableDetails = {
  title: string;
  events: any[];
  tags: string[];
};

export type TimetableDetailsState = {
  id: string;
  details: TimetableDetails;
  loading: boolean;
};

export const initialDetailsState: TimetableDetailsState = {
  id: '',
  details: {
    title: '',
    events: [],
    tags: [],
  },
  loading: false,
};

export const timetableDetailsStore = signalStore(
  withState(initialDetailsState),
  withMethods(
    (
      state,
      getTimetableGql = inject(GetTimetableGQL),
      updateTimetableGql = inject(UpdateTimetableGQL)
    ) => ({
      load: rxMethod<string>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((timetableId: string) =>
            getTimetableGql.fetch({ id: timetableId }).pipe(
              tapResponse({
                next: (response) => {
                  const timetable = response.data.timetable;
                  if (timetable) {
                    patchState(state, {
                      id: timetable.id,
                      details: {
                        title: timetable.title,
                        events: timetable.events.map((event) => ({
                          ...event,
                        })),
                        tags: timetable.tags,
                      },
                      loading: false,
                    });
                  } else {
                    patchState(state, { loading: false });
                  }
                },
                error: () => patchState(state, { loading: false }),
              })
            )
          )
        )
      ),
      update: rxMethod<{ title?: string; events?: any[]; tags?: string[] }>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((data) =>
            updateTimetableGql
              .mutate({
                input: {
                  id: state.id(),
                  ...data,
                },
              })
              .pipe(
                tapResponse({
                  next: (response) => {
                    const timetable = response.data?.updateTimetable;
                    if (timetable) {
                      patchState(state, {
                        details: { ...timetable },
                        loading: false,
                      });
                    } else {
                      patchState(state, { loading: false });
                    }
                  },
                  error: () => patchState(state, { loading: false }),
                })
              )
          )
        )
      ),
    })
  ),
  withHooks({
    onInit: (store) => {
      const route = inject(ActivatedRoute);
      if (route.snapshot.params['timetabeId']) {
        store.load(route.snapshot.params['timetabeId']);
      } else {
        console.error('No timetable ID found');
      }
    },
  })
);
