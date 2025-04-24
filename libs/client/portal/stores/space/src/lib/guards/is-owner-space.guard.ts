import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpacesStore } from '../store';
import { waitSpacesLoaded } from '../utils/space.util';

export const isOwnerSpaceGuard: CanActivateFn = async (route, state) => {
  const store = inject(SpacesStore);
  const router = inject(Router);
  const spaceId = route.paramMap.get('spaceId');

  await waitSpacesLoaded(store);

  const spaces = store.spaces();

  for (const space of spaces) {
    if (space.id === spaceId) {
      localStorage.setItem('spaceId', space.id);
      store.select(space.id);
      return true;
    }
  }
  return router.createUrlTree(['/forbidden']);
};
