import { Component , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/interface';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnDestroy{
  user !:User
  type=true
  constructor(private store: Store<{ user: UserState }>) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  userDataSubscription: Subscription | undefined;

 ngOnInit(): void {
   this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
    if(user){
      this.user=user
    }
  });
 }
 ngOnDestroy(): void {
   this.userDataSubscription?.unsubscribe();
 }
}
