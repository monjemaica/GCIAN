import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateRoomComponent } from './user-create-room.component';

describe('UserCreateRoomComponent', () => {
  let component: UserCreateRoomComponent;
  let fixture: ComponentFixture<UserCreateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
