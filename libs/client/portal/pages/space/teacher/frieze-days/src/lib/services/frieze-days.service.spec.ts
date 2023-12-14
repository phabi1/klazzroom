import { TestBed } from '@angular/core/testing';

import { FriezeDaysService } from './frieze-days.service';

describe('FriezeDaysService', () => {
  let service: FriezeDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriezeDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
