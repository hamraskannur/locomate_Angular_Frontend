import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBottomBarComponent } from './admin-bottom-bar.component';

describe('AdminBottomBarComponent', () => {
  let component: AdminBottomBarComponent;
  let fixture: ComponentFixture<AdminBottomBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBottomBarComponent]
    });
    fixture = TestBed.createComponent(AdminBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
