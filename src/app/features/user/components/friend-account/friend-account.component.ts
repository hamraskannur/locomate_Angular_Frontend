import { Component,OnDestroy } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { ActivatedRoute } from '@angular/router';
import { UserApiServiceService } from '../../services/user-api.service.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friend-account',
  templateUrl: './friend-account.component.html',
  styleUrls: ['./friend-account.component.css'],
})
export class FriendAccountComponent implements OnDestroy{
  user!: User;
  type=false
  constructor(private userApiServiceService: UserApiServiceService,private route: ActivatedRoute) {}
  subscription1: Subscription | undefined;

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params['id']; 
     this.subscription1= this.userApiServiceService
        .getFriendsAccount(id)
        .subscribe((friendsAccount:User) => {
          this.user=friendsAccount
        });
    });
  }
  
  ngOnDestroy(): void {
    this.subscription1?.unsubscribe()
  }
}
