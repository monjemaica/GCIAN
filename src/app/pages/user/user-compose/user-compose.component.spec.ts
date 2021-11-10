import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComposeComponent } from './user-compose.component';

describe('UserComposeComponent', () => {
  let component: UserComposeComponent;
  let fixture: ComponentFixture<UserComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
