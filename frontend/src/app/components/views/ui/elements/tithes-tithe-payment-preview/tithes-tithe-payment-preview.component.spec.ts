import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TithesTithePaymentPreviewComponent } from './tithes-tithe-payment-preview.component';

describe('TithesTithePaymentPreviewComponent', () => {
  let component: TithesTithePaymentPreviewComponent;
  let fixture: ComponentFixture<TithesTithePaymentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TithesTithePaymentPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TithesTithePaymentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
