import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { Store } from '@ngrx/store';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { loadUserData } from 'src/app/stores/user/user.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  showModal = false;
  addPost = false;
  shortsModal = false;
  showToggle = false;
  user :User|null = null;

  constructor(private store: Store<{ user: UserState }>){}

 ngOnInit(): void {
   this.store.dispatch(loadUserData())
   this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
    console.log(user);
    
    this.user=user
  });
 }
  toggleAddPost() {
    this.addPost = !this.addPost;
  }

  toggleShowToggle() {
    this.showToggle = !this.showToggle;
  }

  toggleShortsModal() {
    this.shortsModal = !this.shortsModal;
  }

  outsideClickHandlerShowToggle() {
    this.showToggle = false;
  }

  outsideClickHandlerAddPost() {
    this.addPost = false;
  }



}
