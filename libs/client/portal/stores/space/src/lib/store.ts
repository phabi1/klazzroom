import { computed, inject } from '@angular/core';
import { GetSpacesGQL } from '@klazzroom/libs-client-portal-graphql-space';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { Space } from './models/space.model';

type SpacesState = {
  spaces: Space[];
  currentSpaceId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
};

const initialState: SpacesState = {
  spaces: [],
  loading: false,
  loaded: false,
  currentSpaceId: null,
  error: null,
};

export const SpacesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, getSpacesGQL = inject(GetSpacesGQL)) => ({
    init: rxMethod<void>(
      pipe(
        switchMap(() => {
          if (store.loaded() || store.loading()) {
            return EMPTY;
          }
          patchState(store, {
            loading: true,
            loaded: false,
            error: null,
          });

          return getSpacesGQL
            .fetch()
            .pipe(
              tapResponse({
                next: (response) => {
                  const spaces = response.data.me.spaces.map((space: any) => {
                    return {
                      id: space.id,
                      title: space.title,
                      courseId: space.courseId || null,
                      kind: space.__typename.toLowerCase().replace('space', ''),
                    };
                  });
                  patchState(store, {
                    spaces,
                    loading: false,
                    loaded: true,
                  });
                },
                error: (error: any) => {
                  console.error('Error fetching spaces:', error);
                  patchState(store, {
                    loading: false,
                    loaded: false,
                    error: error.message,
                  });
                },
              })
            );
        })
      )
    ),
    select(spaceId: string) {
      const currentSpaceId = store.currentSpaceId();
      if (currentSpaceId === spaceId) {
        return;
      }
      patchState(store, {
        currentSpaceId: spaceId,
      });
    },
  })),
  withComputed((store) => ({
    currentSpace: computed<Space | null>(() => {
      const currentSpaceId = store.currentSpaceId();
      if (!currentSpaceId) {
        return null;
      }
      return (
        store.spaces().find((space) => space.id === currentSpaceId) || null
      );
    }),
  }))
);
