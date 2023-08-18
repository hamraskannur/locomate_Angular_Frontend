import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interface';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnDestroy {
  @Input() searchResults: User[] = [];

  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  userDataSubscription: Subscription | undefined;

  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  goToAccount(userId: string): void {
    this.userDataSubscription = this.userDataAndOptions$.subscribe(
      ({ user }: { user: User | null }) => {
        if (user) {
          const currentUserId = user._id;
          if (userId === currentUserId) {
            this.router.navigate(['/myAccount']);
          } else {
            this.router.navigate(['/friendAccount', userId]);
          }
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
  }
}
