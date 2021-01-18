import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XwesleyanPagexComponent } from './xwesleyan-pagex.component';

describe('XwesleyanPagexComponent', () => {
  let component: XwesleyanPagexComponent;
  let fixture: ComponentFixture<XwesleyanPagexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XwesleyanPagexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XwesleyanPagexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
