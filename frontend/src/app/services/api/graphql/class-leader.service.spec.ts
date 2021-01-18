import { TestBed } from '@angular/core/testing';

import { ClassLeaderService } from './class-leader.service';

describe('ClassLeaderService', () => {
  let service: ClassLeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassLeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
