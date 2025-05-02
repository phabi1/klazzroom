import { inject } from '@angular/core';
import {
  GetTimetablesForSpaceGQL,
  Timetable,
} from '@klazzroom/libs-client-portal-graphql-timetables';
import { SpacesStore } from '@klazzroom/libs-client-portal-stores-space';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

export type TimetableInfo = {
  id: string;
  title: string;
};

export type TimetableState = {
  items: TimetableInfo[];
  loading: boolean;
};

export const initialState: TimetableState = {
  items: [],
  loading: false,
};

export const timetableStore = signalStore(
  withState(initialState),
  withMethods(
    (state, getTimetablesByTagsGql = inject(GetTimetablesForSpaceGQL)) => ({
      load: rxMethod<string>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((spaceId: string) =>
            getTimetablesByTagsGql.fetch({ tags: ['space:' + spaceId] }).pipe(
              tapResponse({
                next: (response) => {
                  patchState(state, {
                    items: response.data.timetablesByTags.map((timetable) => ({
                      id: timetable.id,
                      title: timetable.title,
                    })),
                    loading: false,
                  });
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
      const spaceStore = inject(SpacesStore);
      const currentSpace = spaceStore.currentSpace();
      if (!currentSpace) {
        console.error('No current space found');
        return;
      }
      store.load(currentSpace.id);
    },
  })
);
