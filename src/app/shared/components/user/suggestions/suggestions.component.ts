import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  users: User[] = [];
  userId: string = '';
  constructor(
    private userApiServiceService: UserApiServiceService,
    private store: Store<{ user: UserState }>
  ) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {
    this.getUser();
    this.fetchSuggestions();
  }

  fetchSuggestions(): void {
    this.userApiServiceService
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
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.userId = user._id;
      }
    });
  }
}
