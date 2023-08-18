import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { AdminOnePostComponent } from './components/posts/post/one-post.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { AdminAccountComponent } from './components/user-account/account/account.component';
import { AdminShowUserComponent } from './components/user-account/account/show-user/show-user.component';
import { AdminAllPostComponent } from './components/user-account/account/all-post/all-post.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    UsersComponent,
    AdminOnePostComponent,
    PostsComponent,
    DashboardComponent,
    UserAccountComponent,
    AdminAccountComponent,
    AdminShowUserComponent,
    AdminAllPostComponent
  ],
  imports: [
    CoreModule,
    sharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
