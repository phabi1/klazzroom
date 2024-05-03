import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { map, switchMap, tap } from 'rxjs';
import { SpaceActions } from '../actions/space.actions';

const GET_SPACES_GQL = gql`
  query GetSpaces {
    spaces {
      ... on TeacherSpace {
        id
        title
        course
      }
      ... on AdministratorSpace {
        id
        title
      }
    }
  }
`;

@Injectable()
export class SpaceEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpaceActions.loadSpaces),
      switchMap(() =>
        this.apollo.query<{ spaces: any[] }>({ query: GET_SPACES_GQL }).pipe(
          map((res) =>
            res.data.spaces.map((space) => ({
              ...space,
              type: space.__typename,
            }))
          ),
          map((spaces) => SpaceActions.loadSpacesSuccess({ spaces }))
        )
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

  constructor(private actions$: Actions, private apollo: Apollo) {}
}
