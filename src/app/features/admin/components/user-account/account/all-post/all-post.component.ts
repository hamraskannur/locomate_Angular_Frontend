import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-admin-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AdminAllPostComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId: string | undefined;
  @Input() type: Boolean = false;
  @Input() postCount: number | undefined;
  @Output() postCountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onePost: EventEmitter<Post> = new EventEmitter<Post>();
  @Input() shorts: boolean = false;

  posts: any;
  subscription2: Subscription | undefined;
  subscription1: Subscription | undefined;
  constructor(private userApiServiceService: UserApiServiceService) {}

  ngOnInit(): void {
    this.getPost();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['SavedPost']) {
      this.getPost();
    }
  }

  getPost = async () => {
    if (this.shorts && this.userId) {
      this.subscription1 = this.userApiServiceService
        .getUserShorts(this.userId)
        .subscribe(
          (response: {
            AllPosts: Post[];
            message: string;
            success: boolean;
          }) => {
            this.posts = response.AllPosts;
          }
        );
    } else {
      if (this.userId) {
        this.subscription2 = this.userApiServiceService
          .getUserAllPost(this.userId)
          .subscribe(
            ({
              AllPosts,
            }: {
              success: boolean;
              AllPosts: Post[];
              message: string;
            }) => {
              this.postCount = AllPosts.length;
              this.postCountChange.emit(this.postCount);
              this.posts = AllPosts;
            }
          );
      }
    }
  };
  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  getOnePost(post: Post) {
    if (this.shorts) {
      post.shortsCheck = true;
    } else {
      post.shortsCheck = false;
    }
    this.onePost.emit(post);
  }
}
