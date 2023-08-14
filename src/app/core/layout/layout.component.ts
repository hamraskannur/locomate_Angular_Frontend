import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interface';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/stores/user/user.reducer';
import { removeUserData } from 'src/app/stores/user/user.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  count = 0;
  sideBar = true;
  public = true;
  notification = false;
  showOption = false;
  uploadPhoto = false;
  uploadShorts = false;
  ngOnInit(): void {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.count = user.Requests.length;
        this.public = user.public;
        this.notification = user.read;
      }
    });
  }

  menus = [
    { name: 'Home', link: '/', icon: 'Home' },
    { name: 'Search', link: '/search', icon: 'Search' },
    { name: 'Messages', link: '/messages', icon: 'chat' },
    { name: 'Shorts', link: '/shorts', icon: 'play_circle' },
    { name: 'Settings', link: '/settings', icon: 'settings' },
  ];
  showOptions(showOption: boolean) {
    this.showOption = showOption;
  }

  changeSidebar() {
    this.sideBar = !this.sideBar;
  }

  logOut() {
    localStorage.clear();
    this.store.dispatch(removeUserData());
    this.router.navigate(['/login']);
  }

  uploadShortsFun(value: boolean) {
    this.uploadShorts = value;

  }

  uploadPhotoFun(value: boolean) {
    this.uploadPhoto = value;
  }

}
