import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { CreateStudentGQL, GetStudentsGQL, UpdateStudentGQL } from '../../graphql/generated';
import { SpaceTeacherStudentsActions } from '../actions/student.actions';

@Injectable()
export class StudentEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceTeacherStudentsActions.init),
      switchMap((action) =>
        this.getStudentsGQL.fetch({ id: action.course }).pipe(
          map(({ data }) =>
            SpaceTeacherStudentsActions.initComplete({
              grades: data.course.grades,
              students: data.course.students,
            })
          ),
          catchError(() =>
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

  add$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SpaceTeacherStudentsActions.addStudent),
        switchMap((action) =>
          this.createStudentGQL
            .mutate({
              student: {
                ...action.student,
              },
            })
            .pipe(
              map((res) => {
              if (res.data) {
                return SpaceTeacherStudentsActions.addStudentSuccess({
                  student: res.data.createStudent,
                });
              }
              return SpaceTeacherStudentsActions.addStudentFailure({
                error: 'Failed to create student',
              });
              }),
              catchError((error) =>
                of(
                  SpaceTeacherStudentsActions.addStudentFailure({
                    error: error.message,
                  })
                )
              )
            )
        )
      );
    }
  );

  update$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SpaceTeacherStudentsActions.updateStudent),
        switchMap((action) =>
          this.updateStudentGQL
            .mutate({
              id: action.id,
              student: {
                ...action.student,
              },
            })
            .pipe(
              map((res) => {
              if (res.data) {
                return SpaceTeacherStudentsActions.updateStudentSuccess({
                  student: {id: res.data.updateStudent.id, changes: res.data.updateStudent},
                });
              }
              return SpaceTeacherStudentsActions.updateStudentFailure({
                error: 'Failed to create student',
              });
              }),
              catchError((error) =>
                of(
                  SpaceTeacherStudentsActions.updateStudentFailure({
                    error: error.message,
                  })
                )
              )
            )
        )
      );
    }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private getStudentsGQL: GetStudentsGQL,
    private createStudentGQL: CreateStudentGQL,
    private updateStudentGQL: UpdateStudentGQL
  ) {}
}
