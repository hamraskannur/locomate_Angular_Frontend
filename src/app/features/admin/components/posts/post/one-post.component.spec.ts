import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOnePostComponent } from './one-post.component';

describe('OnePostComponent', () => {
  let component: AdminOnePostComponent;
  let fixture: ComponentFixture<AdminOnePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOnePostComponent]
    });
    fixture = TestBed.createComponent(AdminOnePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
