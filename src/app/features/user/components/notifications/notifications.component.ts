import { Component, OnInit } from '@angular/core';
import { User, notification } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notification:notification[]=[]
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  constructor(private userApiServiceService:UserApiServiceService, private router: Router,private store: Store<{ user: UserState }>){}
ngOnInit(): void {
  this.userApiServiceService.getAllNotifications().subscribe(({user}:{Status:boolean,user:notification[]})=>{
    this.notification=user.reverse()
  })
}

getAccountPage(userId: string): void {

  this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
    if(user){
      const currentUserId = user._id;
      if (userId === currentUserId) {
        this.router.navigate(['/myAccount']);
      } else {
        this.router.navigate(['/friendAccount', userId]);
      }
    }
  });
}
}
