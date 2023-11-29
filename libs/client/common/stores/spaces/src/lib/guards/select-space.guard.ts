import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, map } from 'rxjs';
import { SpaceActions } from '../actions/space.actions';
import { selectSpacesState } from '../selectors/space.selectors';

export const selectSpaceGuard: CanActivateFn = (route) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectSpacesState).pipe(
    filter((state) => {
      if (state.loaded) {
        return true;
      }
      store.dispatch(SpaceActions.loadSpaces());
      return false;
    }),
    first(),
    map((state) => {
      if (state.entities[route.params['space']] !== undefined) {
        store.dispatch(SpaceActions.selectSpace({ spaceId: route.params['space'] }));
        return true;
      }
      return router.createUrlTree(['/spaces']);
    })
  );
};
