import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isOwnerSpaceGuard } from './is-owner-space.guard';

describe('isOwnerSpaceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isOwnerSpaceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
