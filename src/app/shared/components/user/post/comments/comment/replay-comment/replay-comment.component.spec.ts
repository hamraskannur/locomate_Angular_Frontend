import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayCommentComponent } from './replay-comment.component';

describe('ReplayCommentComponent', () => {
  let component: ReplayCommentComponent;
  let fixture: ComponentFixture<ReplayCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplayCommentComponent]
    });
    fixture = TestBed.createComponent(ReplayCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
