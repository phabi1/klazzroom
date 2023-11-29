import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap, tap } from 'rxjs';
import { SpaceActions } from '../actions/space.actions';

@Injectable()
export class SpaceEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceActions.loadSpaces),
      switchMap(() =>
        of([
          { id: '1', title: 'Teacher 1', type: 'teacher' },
          { id: '2', title: 'Teacher 2', type: 'teacher' },
        ]).pipe(map((spaces) => SpaceActions.loadSpacesSuccess({ spaces })))
      )
    );
  });

  select$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SpaceActions.selectSpace),
        tap((action) => localStorage.setItem('klazzroom:space', action.spaceId))
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
