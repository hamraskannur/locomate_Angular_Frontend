import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { BottomBarComponent } from './layout/bottom-bar/bottom-bar.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyComponent, HomeComponent, LayoutComponent,NavBarComponent, SideBarComponent, BottomBarComponent],
  imports:[
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
