import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { removeUserData, updateOptions } from 'src/app/stores/user/user.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  switchChecked = false;
  constructor(
    private userApiServiceService: UserApiServiceService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}

  ngOnInit(): void {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.switchChecked = !user.public;
      }
    });
  }

  handleSwitchChange(): void {

    this.userApiServiceService
      .changeToPrivate(!this.switchChecked)
      .subscribe(({ success }: { message: string; success: boolean }) => {
        if(success){ 
          this.userDataAndOptions$.pipe(first()).subscribe(
            ({ user }: { user: User | null }) => {
              if (user) {
                const updatedUser: User = {
                  ...user,
                  public: !this.switchChecked,
                };
                this.store.dispatch(updateOptions({ user: updatedUser }));
              }
            }
          );
        }
      });
  }

  handleLogout() {
    localStorage.clear();
    this.store.dispatch(removeUserData())
    this.router.navigate(['/login']);
  }
}
