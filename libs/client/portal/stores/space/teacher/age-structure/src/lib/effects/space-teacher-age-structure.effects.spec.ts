import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpaceTeacherAgeStructureEffects } from './space-teacher-age-structure.effects';

describe('SpaceTeacherAgeStructureEffects', () => {
  let actions$: Observable<any>;
  let effects: SpaceTeacherAgeStructureEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpaceTeacherAgeStructureEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SpaceTeacherAgeStructureEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
