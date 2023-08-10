import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from 'src/app/guard/user.guard';
import { UserLoginGuard } from 'src/app/guard/userLogin.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { FriendAccountComponent } from './friend-account/friend-account.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RequestsComponent } from './requests/requests.component';

const userRoute: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full',canActivate:[UserGuard] },
      { path: 'login', component: LoginComponent ,canActivate:[UserLoginGuard]},
      { path: 'register', component: RegisterComponent,canActivate:[UserLoginGuard] },
      { path: 'verify', component: VerifyComponent,canActivate:[UserLoginGuard] },
      { path: 'myAccount', component: MyAccountComponent,canActivate:[UserGuard] },
      { path: 'friendAccount/:id', component: FriendAccountComponent,canActivate:[UserGuard] },
      { path: 'settings', component: SettingsComponent,canActivate:[UserGuard] },
      { path: 'search', component: SearchComponent,canActivate:[UserGuard] },
      { path: 'editProfile', component: EditProfileComponent,canActivate:[UserGuard] },
      { path: 'requests', component: RequestsComponent,canActivate:[UserGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
