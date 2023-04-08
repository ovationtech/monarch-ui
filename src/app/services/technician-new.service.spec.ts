import { TestBed } from '@angular/core/testing';

import { TechnicianNewService } from './technician-new.service';

describe('TechnicianNewService', () => {
  let service: TechnicianNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicianNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
