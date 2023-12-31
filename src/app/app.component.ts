import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/stores/user/user.reducer';
import { User } from 'src/app/core/models/interface';
import { loadUserData } from 'src/app/stores/user/user.actions';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { SocketService } from './features/user/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent   {
  title = 'client';
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  constructor(
    private store: Store<{ user: UserState }>,
    private SocketService: SocketService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.store.dispatch(loadUserData());
      this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
        if (user) {
          this.SocketService.getSocket().emit('new-user-add', user._id);
        }
      });
    }
  }
}
