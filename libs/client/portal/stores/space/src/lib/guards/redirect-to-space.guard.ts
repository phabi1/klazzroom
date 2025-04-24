import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { waitSpacesLoaded } from '../utils/space.util';
import { SpacesStore } from '../store';

export const redirectToSpaceGuard: CanActivateFn = async (route, state) => {
  const store = inject(SpacesStore);
  const router = inject(Router);
  const spaceId = localStorage.getItem('spaceId');
  if (spaceId) {
    return router.createUrlTree([`/space/${spaceId}`]);
  }

  await waitSpacesLoaded(store);

  const spaces = store.spaces();
  if (spaces.length > 0) {
    const firstSpace = spaces[0];
    return router.createUrlTree(['/space', firstSpace.id]);
  }

  return router.createUrlTree(['/spaces']);
};
