import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { UserComponent } from './user.component';
import { LoadingComponent } from '../../shared/components/user/loding/loading.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyComponent,UserComponent,LoadingComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    CommonModule,
    RouterModule,
    CoreModule,
    
  ],
  bootstrap:[UserComponent]
})
export class UserModule {}
