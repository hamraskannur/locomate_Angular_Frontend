import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AdminAccountComponent;
  let fixture: ComponentFixture<AdminAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccountComponent]
    });
    fixture = TestBed.createComponent(AdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
