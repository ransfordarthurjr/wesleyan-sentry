import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMemberPreviewComponent } from './members-member-preview.component';

describe('MembersMemberPreviewComponent', () => {
  let component: MembersMemberPreviewComponent;
  let fixture: ComponentFixture<MembersMemberPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMemberPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMemberPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
