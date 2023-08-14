import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Post, User } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { LoadingState } from 'src/app/stores/loading/loading.reducer';
import { updateLoading } from 'src/app/stores/loading/loading.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private userApiServiceService: UserApiServiceService,
    private store: Store<{ user: UserState; loading: LoadingState }>
  ) {}

  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  subscription: Subscription | undefined; // Subscription to handle cleanup

  onePost = false;
  posts: Post[] = [];
  update: boolean = false;

  ngOnInit(): void {
    this.getUser();
    this.getPost();
  }

  getUser() {
    this.subscription = this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
        if (user && user.addPost) {
          this.getPost();
        }
      
    });
  }

  deletePost(id:string):void {
    this.posts = this.posts.filter(post => post._id !== id);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getPost(): void {
    this.store.dispatch(updateLoading({ isLoading: true }));

    this.userApiServiceService.getAllPost().subscribe((allPost: Post[]) => {
      if (allPost.length > 0) {
        this.posts = allPost.reverse();
        this.store.dispatch(updateLoading({ isLoading: false }));
      }
    });
  }
}
