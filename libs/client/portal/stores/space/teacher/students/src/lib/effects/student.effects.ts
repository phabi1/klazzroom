import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpaceTeacherStudentsActions } from '../actions/student.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const STUDENTS_GQL = gql`
query ($id: ID!) {
  course(id: $id) {
    id
    grades {
      id
      title
    }
    students {
      id
      firstname
      lastname
    }
  }
}`;

@Injectable()
export class StudentEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceTeacherStudentsActions.init),
      switchMap((action) =>
        this.apollo
          .query<{ course: { grades: any[]; students: any[] } }>({
            query: STUDENTS_GQL,
            variables: { id: action.course },
          })
          .pipe(
            map(({ data }) =>
              SpaceTeacherStudentsActions.initComplete({
                grades: data.course.grades,
                students: data.course.students,
              })
            ),
            catchError((error) =>
              of(
                SpaceTeacherStudentsActions.initComplete({
                  grades: [],
                  students: [],
                })
              )
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private apollo: Apollo) {}
}
