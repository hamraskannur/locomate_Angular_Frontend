import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html', // Adjust the template URL
  styleUrls: ['./show-user.component.css'], // Adjust the styles URL
})
export class ShowUserComponent implements OnInit, OnChanges,OnDestroy {
  @Input() type!: string;
  @Input() userId!: string;
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  userDataSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;

  currentUser: User | null = null;
  users: any[] | undefined;

  constructor(
    private userApiService: UserApiServiceService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      const newType = changes['type'].currentValue;
      this.getUserData(newType);
    }
  }

  ngOnInit(): void {
    this.getUserData(this.type);
   
  }

  getUserData(type: string): void {
    if (type === 'Following') {
     this.subscription2= this.userApiService
        .getFollowingUser(this.userId)
        .subscribe(({ user }: { message: string; user: any[] }) => {
          this.users = user;
        });
    } else if (type === 'Followers') {
     this.subscription3= this.userApiService
        .getFollowersUser(this.userId)
        .subscribe(({ user }: { message: string; user: any[] }) => {
          this.users = user;
        });
    }
  }

  goToAccountPage(userId: string): void {
    this.userDataSubscription=this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
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
  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe()
    this.subscription2?.unsubscribe()
    this.subscription3?.unsubscribe()
  }
}
