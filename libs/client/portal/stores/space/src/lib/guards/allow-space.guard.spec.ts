import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allowSpaceGuard } from './allow-space.guard';

describe('allowSpaceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allowSpaceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
