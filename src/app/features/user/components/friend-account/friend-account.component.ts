import { Component } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { ActivatedRoute } from '@angular/router';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { updateLoading } from 'src/app/stores/loading/loading.actions';
import { LoadingState } from 'src/app/stores/loading/loading.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-friend-account',
  templateUrl: './friend-account.component.html',
  styleUrls: ['./friend-account.component.css'],
})
export class FriendAccountComponent {
  user!: User;
  type=false
  constructor(
    private userApiServiceService: UserApiServiceService,
    private route: ActivatedRoute,
    private store: Store<{  loading: LoadingState }>

  ) {}

  ngOnInit(): void {
    this.store.dispatch(updateLoading({ isLoading: true }));

    this.route.params.subscribe((params) => {
      const id = params['id']; // This is the id parameter from the URL
      this.userApiServiceService
        .getFriendsAccount(id)
        .subscribe((friendsAccount:User) => {
    this.store.dispatch(updateLoading({ isLoading: false }));
          this.user=friendsAccount
        });
    });
  }
}
