import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/login/login.component';
import { AdminGuard } from 'src/app/core/authentication/admin.guard';
import { AdminLoginGuard } from 'src/app/core/authentication/adminLogin.guard';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAccountComponent } from './components/user-account/user-account.component';


const adminRoute: Routes = [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: DashboardComponent ,canActivate:[AdminGuard]},
      { path: 'users', component: UsersComponent ,canActivate:[AdminGuard]},
      { path: 'posts', component: PostsComponent ,canActivate:[AdminGuard]},
      { path: 'login', component: AdminLoginComponent,canActivate:[AdminLoginGuard]},
      { path: 'userAccount/:id', component: UserAccountComponent,canActivate:[AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoute)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
