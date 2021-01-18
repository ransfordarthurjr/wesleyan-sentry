import { TestBed } from '@angular/core/testing';

import { MembersPrerequisiteService } from './members-prerequisite.service';

describe('MembersPrerequisiteService', () => {
  let service: MembersPrerequisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersPrerequisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
