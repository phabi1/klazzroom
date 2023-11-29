import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpaceEffects } from './space.effects';

describe('SpaceEffects', () => {
  let actions$: Observable<any>;
  let effects: SpaceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpaceEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SpaceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
