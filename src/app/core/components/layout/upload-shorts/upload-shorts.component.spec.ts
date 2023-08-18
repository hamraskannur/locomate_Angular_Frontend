import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShortsComponent } from './upload-shorts.component';

describe('UploadShortsComponent', () => {
  let component: UploadShortsComponent;
  let fixture: ComponentFixture<UploadShortsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadShortsComponent]
    });
    fixture = TestBed.createComponent(UploadShortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
