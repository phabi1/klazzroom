import { inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, EventType, Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { filter, Subscription } from 'rxjs';

export type SidebarState = {
  name: string;
};

const initialState: SidebarState = {
  name: '',
};

export const sidebarStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setName: (name: string) => {
      patchState(store, {
        name,
      });
    },
  })),
  withHooks(
    (store, router = inject(Router), route = inject(ActivatedRoute)) => {
      let subscription: Subscription | null = null;
      return {
        onInit: () => {
          subscription = router.events
            .pipe(filter((event) => event.type === EventType.NavigationEnd))
            .subscribe(() => {
              let sidebarName = '';
              let currentRoute: ActivatedRouteSnapshot | null = route.snapshot.root
              do {
                const sidebar: string | undefined = currentRoute.data['sidebar'];
                if (sidebar) {
                  sidebarName = sidebar;
                }
                currentRoute = currentRoute.firstChild;
              } while (currentRoute);
              store.setName(sidebarName);
            });
        },
        onDestroy: () => {
          subscription?.unsubscribe();
          subscription = null;
        },
      };
    }
  )
);
