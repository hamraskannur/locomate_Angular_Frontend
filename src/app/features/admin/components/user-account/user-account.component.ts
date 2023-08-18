import { Component ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/interface';
import { ActivatedRoute } from '@angular/router';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnDestroy {
  user!: User;
  type = false;
  constructor(
    private userApiServiceService: UserApiServiceService,
    private route: ActivatedRoute,
  ) {}

  subscription1: Subscription | undefined;

  ngOnInit(): void {
    this.subscription1=this.route.params.subscribe((params) => {
      const id = params['id']; // This is the id parameter from the URL
      this.userApiServiceService
        .getFriendsAccount(id)
        .subscribe((friendsAccount: User) => {
          this.user = friendsAccount;
        });
    });
  }
  ngOnDestroy(): void {
    this.subscription1?.unsubscribe()
  }
}
