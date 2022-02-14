import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcceptReportComponent } from './admin-accept-report.component';

describe('AdminAcceptReportComponent', () => {
  let component: AdminAcceptReportComponent;
  let fixture: ComponentFixture<AdminAcceptReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAcceptReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAcceptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
