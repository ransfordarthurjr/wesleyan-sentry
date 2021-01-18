import { TestBed } from '@angular/core/testing';

import { MaritalStatusService } from './marital-status.service';

describe('MaritalStatusService', () => {
  let service: MaritalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaritalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
