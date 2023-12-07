import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetBirthdaysGQL } from '../../graphql/generated';
import { SpaceTeacherAgeStructureActions } from '../actions/space-teacher-age-structure.actions';

@Injectable()
export class SpaceTeacherAgeStructureEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceTeacherAgeStructureActions.load),
      switchMap((action) =>
        this.getBirthdaysGql.fetch({ course: action.course }).pipe(
          map((res) =>
            SpaceTeacherAgeStructureActions.loadSuccess({
              students: res.data.course.students,
            })
          ),
          catchError((error) =>
            of(
              SpaceTeacherAgeStructureActions.loadFailure({
                error: error.message,
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private getBirthdaysGql: GetBirthdaysGQL
  ) {}
}
