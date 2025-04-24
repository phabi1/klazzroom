import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectToSpaceGuard } from './redirect-to-space.guard';

describe('redirectToSpaceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectToSpaceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
