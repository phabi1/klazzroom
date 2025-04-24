import { TestBed } from '@angular/core/testing';

import { SidebarRegistryService } from './sidebar-registry.service';

describe('SidebarRegistryService', () => {
  let service: SidebarRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
