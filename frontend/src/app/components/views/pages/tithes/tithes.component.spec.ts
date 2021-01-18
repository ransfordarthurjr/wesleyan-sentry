import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TithesComponent } from './tithes.component';

describe('TithesComponent', () => {
  let component: TithesComponent;
  let fixture: ComponentFixture<TithesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TithesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TithesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
