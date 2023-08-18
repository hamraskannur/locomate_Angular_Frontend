import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UserApiServiceService } from '../../services/user-api.service.service';
import { Post, User } from 'src/app/core/models/interface';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { UserState } from 'src/app/stores/user/user.reducer';

@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.css'],
})
export class ShortsComponent implements OnInit {
  shorts: Post[] = [];
  subscription: Subscription | undefined; // Subscription to handle cleanup
  subscription1: Subscription | undefined; // Subscription to handle cleanup

  constructor(
    private UserApiServiceService: UserApiServiceService,
    private store: Store<{ user: UserState }>
  ) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {
    this.subscription = this.userDataAndOptions$.subscribe(
      ({ user }: { user: User | null }) => {
        if (user && user.addPost) {
          this.getshorts();
        }
      }
    );
    this.getshorts();
  }

  getshorts() {
    this.subscription1 = this.UserApiServiceService.getAllshorts().subscribe(
      (data: Post[]) => {
        this.shorts = data.reverse();
      }
    );
  }
  deletePost(id: string): void {
    this.shorts = this.shorts.filter((post) => post._id !== id);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription1?.unsubscribe();
  }
}
