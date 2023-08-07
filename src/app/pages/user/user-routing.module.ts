import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from 'src/app/guard/user.guard';
import { UserLoginGuard } from 'src/app/guard/userLogin.guard';

const userRoute: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full',canActivate:[UserGuard] },
      { path: 'login', component: LoginComponent ,canActivate:[UserLoginGuard]},
      { path: 'register', component: RegisterComponent,canActivate:[UserLoginGuard] },
      { path: 'verify', component: VerifyComponent,canActivate:[UserLoginGuard] }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
