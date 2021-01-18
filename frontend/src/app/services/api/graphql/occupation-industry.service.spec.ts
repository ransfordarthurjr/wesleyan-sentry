import { TestBed } from '@angular/core/testing';

import { OccupationIndustryService } from './occupation-industry.service';

describe('OccupationIndustryService', () => {
  let service: OccupationIndustryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationIndustryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
