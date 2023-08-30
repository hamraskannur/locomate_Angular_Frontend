import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShortsComponent } from './upload-shorts.component';
import { HttpClientModule } from '@angular/common/http';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

describe('UploadShortsComponent', () => {
  let component: UploadShortsComponent;
  let fixture: ComponentFixture<UploadShortsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadShortsComponent],
      imports: [HttpClientModule], // Import HttpClientModule
      providers: [UserApiServiceService], // Add your service here
    });
    fixture = TestBed.createComponent(UploadShortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
