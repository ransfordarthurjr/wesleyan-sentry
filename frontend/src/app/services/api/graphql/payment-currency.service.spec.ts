import { TestBed } from '@angular/core/testing';

import { PaymentCurrencyService } from './payment-currency.service';

describe('PaymentCurrencyService', () => {
  let service: PaymentCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
