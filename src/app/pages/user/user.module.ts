import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyComponent, HomeComponent],
  imports:[
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
