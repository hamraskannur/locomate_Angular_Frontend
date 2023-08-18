import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from './services/socket.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { User } from 'src/app/core/models/interface';
import { loadUserData } from 'src/app/stores/user/user.actions';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-avatar',
  template: `
      <router-outlet ></router-outlet>
  `,
  })
export class UserComponent implements OnInit {
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  constructor(private store: Store<{ user: UserState }> , private SocketService:SocketService) {}
  ngOnInit(): void {
    this.store.dispatch(loadUserData())
    this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
      if(user ){
        this.SocketService.getSocket().emit("new-user-add", user._id);
      }
   });
  }
}

