import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBadgatewayComponent } from './app-badgateway.component';

describe('AppBadgatewayComponent', () => {
  let component: AppBadgatewayComponent;
  let fixture: ComponentFixture<AppBadgatewayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppBadgatewayComponent]
    });
    fixture = TestBed.createComponent(AppBadgatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
