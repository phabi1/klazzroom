import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selectSpaceGuard } from './select-space.guard';

describe('selectSpaceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selectSpaceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
