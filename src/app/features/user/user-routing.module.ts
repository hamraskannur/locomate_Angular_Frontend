import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { VerifyComponent } from './verify/verify.component';
// import { HomeComponent } from './home/home.component';
// import { MyAccountComponent } from './my-account/my-account.component';
// import { FriendAccountComponent } from './friend-account/friend-account.component';
// import { SettingsComponent } from './settings/settings.component';
// import { SearchComponent } from './search/search.component';
// import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { RequestsComponent } from './requests/requests.component';
// import { NotificationsComponent } from './notifications/notifications.component';
import { UserGuard } from 'src/app/core/authentication/user.guard';
import { UserLoginGuard } from 'src/app/core/authentication/userLogin.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FriendAccountComponent } from './components/friend-account/friend-account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/search/search.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RequestsComponent } from './components/requests/requests.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

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
      { path: 'notification', component: NotificationsComponent,canActivate:[UserGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
