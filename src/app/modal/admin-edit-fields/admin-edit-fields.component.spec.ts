import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFieldsComponent } from './admin-edit-fields.component';

describe('AdminEditFieldsComponent', () => {
  let component: AdminEditFieldsComponent;
  let fixture: ComponentFixture<AdminEditFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
