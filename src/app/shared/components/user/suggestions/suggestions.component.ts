import { Component, OnInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit,OnDestroy {
  users: User[] = [];
  userId: string = '';
  constructor(
    private userApiServiceService: UserApiServiceService,
    private store: Store<{ user: UserState;}>
  ) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  subscription: Subscription | undefined;
  userDataSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getUser();
    this.fetchSuggestions();
  }

  fetchSuggestions(): void {

   this.subscription= this.userApiServiceService
      .getSuggestionUsers()
      .subscribe(
        ({
          notFollowedUsers,
        }: {
          status: boolean;
          notFollowedUsers: User[];
        }) => {
          this.users = notFollowedUsers;
        }
      );
  }

  getUser() {
   this.userDataSubscription= this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.userId = user._id;
      }
    });
  }
  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe()
    this.subscription?.unsubscribe()
  }
}
