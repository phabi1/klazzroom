import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimetableEffects } from './timetable.effects';

describe('TimetableEffects', () => {
  let actions$: Observable<any>;
  let effects: TimetableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimetableEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TimetableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
