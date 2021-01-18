import { TestBed } from '@angular/core/testing';

import { MemberTithePaymentService } from './member-tithe-payment.service';

describe('MemberTithePaymentService', () => {
  let service: MemberTithePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberTithePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
