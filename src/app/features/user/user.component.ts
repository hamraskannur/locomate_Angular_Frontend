import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/stores/loading/loading.selectors';
import { SocketService } from './services/socket.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { User } from 'src/app/core/models/interface';
import { loadUserData } from 'src/app/stores/user/user.actions';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="loding" *ngIf="isLoading; else content">
      <app-loading></app-loading>
    </div>

    <ng-template #content>
      <router-outlet ></router-outlet>
    </ng-template>
  `,
  })
export class UserComponent implements OnInit {

  isLoading = false

  isLoading$ = this.store.select(selectIsLoading);
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  constructor(private store: Store<{ user: UserState }> , private SocketService:SocketService) {}
  ngOnInit(): void {
    this.store.dispatch(loadUserData())
    this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
      
      if(user){
        this.SocketService.getSocket().emit("new-user-add", user._id);
      }
   });
  }

  // ngOnInit(): void {
    // this.isLoading$.subscribe((isLoading) => {
    //   console.log(isLoading);
      
    //   this.isLoading=isLoading
    // });
  // }
}

// isLoading$ = this.store.select(selectIsLoading);

// constructor(private store: Store) {}
// this.isLoading$.subscribe((isLoading) => {
//   const newLoadingValue = !isLoading;
//   this.store.dispatch(updateLoading({ isLoading: newLoadingValue }));
// });