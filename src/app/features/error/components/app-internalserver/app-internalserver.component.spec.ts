import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInternalserverComponent } from './app-internalserver.component';

describe('AppInternalserverComponent', () => {
  let component: AppInternalserverComponent;
  let fixture: ComponentFixture<AppInternalserverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppInternalserverComponent]
    });
    fixture = TestBed.createComponent(AppInternalserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
