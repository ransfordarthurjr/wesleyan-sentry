import { TestBed } from '@angular/core/testing';

import { AltarServersTypeService } from './altar-servers-type.service';

describe('AltarServersTypeService', () => {
  let service: AltarServersTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltarServersTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
