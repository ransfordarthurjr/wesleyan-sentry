import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverstationCardComponent } from './converstation-card.component';

describe('ConverstationCardComponent', () => {
  let component: ConverstationCardComponent;
  let fixture: ComponentFixture<ConverstationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverstationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverstationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
