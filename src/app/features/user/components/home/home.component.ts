import { Component, OnInit } from '@angular/core';
import { Post, User } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { selectIsLoading } from 'src/app/stores/loading/loading.selectors';
import { LoadingState } from 'src/app/stores/loading/loading.reducer';
import { updateLoading } from 'src/app/stores/loading/loading.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userApiServiceService: UserApiServiceService,
    private store: Store<{ user: UserState; loading: LoadingState }>
  ) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  onePost = false;
  posts: Post[] = [];
  userId: string | undefined;
  update: boolean = false;

  ngOnInit(): void {
    this.getPost();
  }
  getUser() {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.userId = user._id;
      }
    });
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
