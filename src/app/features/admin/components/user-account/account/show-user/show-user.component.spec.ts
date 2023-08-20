import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowUserComponent } from './show-user.component';

describe('ShowUserComponent', () => {
  let component: AdminShowUserComponent;
  let fixture: ComponentFixture<AdminShowUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowUserComponent]
    });
    fixture = TestBed.createComponent(AdminShowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
