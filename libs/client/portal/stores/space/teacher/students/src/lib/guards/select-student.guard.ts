import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, map, switchMap } from 'rxjs';
import { SpaceTeacherStudentsActions } from '../actions/student.actions';
import { selectIds, selectLoaded } from '../selectors/student.selectors';

export const selectStudentGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectLoaded).pipe(
    filter((loaded) => {
      if (!loaded) {
        store.dispatch(
          SpaceTeacherStudentsActions.init({ course: route.params['course'] })
        );
      }
      return loaded;
    }),
    switchMap(() =>
      store.select(selectIds).pipe(
        first(),
        map((ids) => {
          if (
            route.params['student']
          ) {
            store.dispatch(
              SpaceTeacherStudentsActions.selectStudent({
                id: route.params['student'],
              })
            );
            return true;
          }
          return router.createUrlTree(['..']);
        })
      )
    )
  );
};
