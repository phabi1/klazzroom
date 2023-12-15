import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpaceTeacherStudentsContactActions } from '../actions/contact.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  CreateContactGQL,
  RemoveContactGQL,
  UpdateContactGQL,
} from '../../graphql/generated';

@Injectable()
export class ContactEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceTeacherStudentsContactActions.addContact),
      switchMap((action) =>
        this.createContactGQL
          .mutate({ input: action.contact, student: action.student })
          .pipe(
            map((res) => {
              if (res.data?.addContact) {
                return SpaceTeacherStudentsContactActions.addContactSuccess({
                  contact: res.data.addContact,
                });
              }
              return SpaceTeacherStudentsContactActions.addContactFailure({
                error: 'Impossible to add contact',
              });
            }),
            catchError((error) =>
              of(
                SpaceTeacherStudentsContactActions.addContactFailure({ error })
              )
            )
          )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceTeacherStudentsContactActions.updateContact),
      switchMap((action) =>
        this.updateContactGQL
          .mutate({ input: action.contact, id: action.id })
          .pipe(
            map((res) => {
              if (res.data?.updateContact) {
                return SpaceTeacherStudentsContactActions.updateContactSuccess({
                  contact: res.data.updateContact,
                });
              }
              return SpaceTeacherStudentsContactActions.updateContactFailure({
                error: 'Impossible to update contact',
              });
            }),
            catchError((error) =>
              of(
                SpaceTeacherStudentsContactActions.updateContactFailure({
                  error,
                })
              )
            )
          )
      )
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceTeacherStudentsContactActions.deleteContact),
      switchMap((action) =>
        this.removeContactGQL.mutate({ id: action.id }).pipe(
          map((res) => {
            if (res.data?.removeContact) {
              return SpaceTeacherStudentsContactActions.deleteContactSuccess({
                id: res.data.removeContact.id,
              });
            }
            return SpaceTeacherStudentsContactActions.deleteContactFailure({
              error: 'Impossible to remove contact',
            });
          }),
          catchError((error) =>
            of(
              SpaceTeacherStudentsContactActions.deleteContactFailure({
                error,
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private createContactGQL: CreateContactGQL,
    private updateContactGQL: UpdateContactGQL,
    private removeContactGQL: RemoveContactGQL
  ) {}
}
