import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveUserComponent } from './admin-remove-user.component';

describe('AdminRemoveUserComponent', () => {
  let component: AdminRemoveUserComponent;
  let fixture: ComponentFixture<AdminRemoveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRemoveUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
