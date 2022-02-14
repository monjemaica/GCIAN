import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewReportsComponent } from './admin-view-reports.component';

describe('AdminViewReportsComponent', () => {
  let component: AdminViewReportsComponent;
  let fixture: ComponentFixture<AdminViewReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
