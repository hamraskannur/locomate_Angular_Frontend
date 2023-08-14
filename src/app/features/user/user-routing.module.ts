import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/core/authentication/user.guard';
import { UserLoginGuard } from 'src/app/core/authentication/userLogin.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { UserComponent } from './user.component';


const userRoute: Routes = [
  {
    path: '',component: UserComponent,
    children: [
      { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),pathMatch: 'full',canActivate:[UserGuard] },
      { path: 'login', component: LoginComponent ,canActivate:[UserLoginGuard]},
      { path: 'register', component: RegisterComponent,canActivate:[UserLoginGuard] },
      { path: 'verify', component: VerifyComponent,canActivate:[UserLoginGuard] },
      { path: 'settings', loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule), canActivate: [UserGuard] },
      { path: 'myAccount', loadChildren: () => import('./components/my-account/myAccount.module').then(m => m.myAccountModule), canActivate: [UserGuard] },
      { path: 'search', loadChildren: () => import('./components/search/search.module').then(m => m.SearchModule), canActivate: [UserGuard] },
      { path: 'editProfile', loadChildren: () => import('./components/edit-profile/edit.module').then(m => m.EditModule), canActivate: [UserGuard] },
      { path: 'requests', loadChildren: () => import('./components/requests/request.module').then(m => m.RequestModule), canActivate: [UserGuard] },
      { path: 'notification', loadChildren: () => import('./components/notifications/notification.module').then(m => m.NotificationModule), canActivate: [UserGuard] },
      { path: 'friendAccount/:id', loadChildren: () => import('./components/friend-account/friendAccount.module').then(m => m.FriendAccountModule), canActivate: [UserGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
