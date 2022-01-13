import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatroomLeaveComponent } from './user-chatroom-leave.component';

describe('UserChatroomLeaveComponent', () => {
  let component: UserChatroomLeaveComponent;
  let fixture: ComponentFixture<UserChatroomLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChatroomLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatroomLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
