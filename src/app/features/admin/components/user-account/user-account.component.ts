import { Component } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { ActivatedRoute } from '@angular/router';
import { updateLoading } from 'src/app/stores/loading/loading.actions';
import { LoadingState } from 'src/app/stores/loading/loading.reducer';
import { Store } from '@ngrx/store';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
  user!: User;
  type = false;
  constructor(
    private userApiServiceService: UserApiServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
   console.log("yzzzzzzzzzzzz");
   
    this.route.params.subscribe((params) => {
      const id = params['id']; // This is the id parameter from the URL
      this.userApiServiceService
        .getFriendsAccount(id)
        .subscribe((friendsAccount: User) => {
          this.user = friendsAccount;
        });
    });
  }
}
