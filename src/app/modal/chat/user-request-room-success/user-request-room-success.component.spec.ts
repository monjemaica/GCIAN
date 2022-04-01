import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestRoomSuccessComponent } from './user-request-room-success.component';

describe('UserRequestRoomSuccessComponent', () => {
  let component: UserRequestRoomSuccessComponent;
  let fixture: ComponentFixture<UserRequestRoomSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestRoomSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestRoomSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
