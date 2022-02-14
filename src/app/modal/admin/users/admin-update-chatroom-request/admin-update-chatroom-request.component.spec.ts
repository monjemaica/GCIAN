import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateChatroomRequestComponent } from './admin-update-chatroom-request.component';

describe('AdminUpdateChatroomRequestComponent', () => {
  let component: AdminUpdateChatroomRequestComponent;
  let fixture: ComponentFixture<AdminUpdateChatroomRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateChatroomRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateChatroomRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
