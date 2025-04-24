import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { SpacesStore } from '../store';

export const allowSpaceGuard: CanActivateChildFn = (route, state) => {
  const store = inject(SpacesStore);
  const router = inject(Router);

  const currentSpace = store.currentSpace();

  if (currentSpace === null) {
    return router.createUrlTree(['/spaces']);
  }

  if (route.routeConfig?.data && route.routeConfig?.data['space']) {
    const kinds = Array.isArray(route.routeConfig.data['space'])
      ? route.routeConfig.data['space']
      : [route.routeConfig.data['space']];

    console.log('kinds', kinds);
    console.log('currentSpace.kind', currentSpace.kind);
    
    if (kinds.length === 0 || kinds.includes(currentSpace.kind)) {
      return true;
    }
    return router.createUrlTree(['/forbidden']);
  }

  return true;
};
