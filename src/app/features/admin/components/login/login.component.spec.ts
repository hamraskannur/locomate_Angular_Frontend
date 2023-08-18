import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLoginComponent]
    });
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
