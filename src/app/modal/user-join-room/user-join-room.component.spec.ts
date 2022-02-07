import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJoinRoomComponent } from './user-join-room.component';

describe('UserJoinRoomComponent', () => {
  let component: UserJoinRoomComponent;
  let fixture: ComponentFixture<UserJoinRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJoinRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
