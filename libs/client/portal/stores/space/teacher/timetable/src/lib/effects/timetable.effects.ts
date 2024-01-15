import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpaceTeacherTimetableActions } from '../actions/timetable.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { GetTimetablesGQL } from '../../graphql/generated';



@Injectable()
export class TimetableEffects {

laod$ = createEffect(() => { return this.actions$.pipe(
  ofType(SpaceTeacherTimetableActions.loadTimetables), 
  switchMap(() => this.getTimetablesGQL.fetch().pipe(
    map((result) => SpaceTeacherTimetableActions.loadTimetablesSuccess({ timetables: result.data.timetables })),
    catchError((error) => of(SpaceTeacherTimetableActions.loadTimetablesFailure({ error })))
  )
  ))
});

  constructor(private actions$: Actions, private readonly getTimetablesGQL: GetTimetablesGQL) {}
}
