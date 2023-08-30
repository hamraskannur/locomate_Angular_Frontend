import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { HttpClientModule } from '@angular/common/http';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Import HttpClientModule
      providers: [UserApiServiceService], // Add your service here
      declarations: [PostsComponent]
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
