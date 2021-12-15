import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCaresComponent } from './user-profile-cares.component';

describe('UserProfileCaresComponent', () => {
  let component: UserProfileCaresComponent;
  let fixture: ComponentFixture<UserProfileCaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileCaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
