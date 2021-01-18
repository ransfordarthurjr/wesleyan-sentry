import { TestBed } from '@angular/core/testing';

import { ChurchGroupService } from './church-group.service';

describe('ChurchGroupService', () => {
  let service: ChurchGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
