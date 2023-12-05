import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selectStudentGuard } from './select-student.guard';

describe('selectStudentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selectStudentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
