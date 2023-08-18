import { Component } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { ActivatedRoute } from '@angular/router';
import { UserApiServiceService } from '../../services/user-api.service.service';

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
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params['id']; // This is the id parameter from the URL
      this.userApiServiceService
        .getFriendsAccount(id)
        .subscribe((friendsAccount:User) => {
          this.user=friendsAccount
        });
    });
  }
}
