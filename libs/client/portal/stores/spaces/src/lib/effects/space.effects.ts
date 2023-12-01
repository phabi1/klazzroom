import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { map, switchMap, tap } from 'rxjs';
import { SpaceActions } from '../actions/space.actions';
import { Space } from '../models/space.model';

const GET_SPACES_GQL = gql`
  query GetSpaces {
    __typename
    spaces {
      ... on TeacherSpace {
        id
        title
        course
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
        this.apollo
          .query<{ spaces: Space[] }>({ query: GET_SPACES_GQL })
          .pipe(
            map((res) =>
              SpaceActions.loadSpacesSuccess({ spaces: res.data['spaces'] })
            )
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
