import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/login/login.component';
import { AdminGuard } from 'src/app/core/authentication/admin.guard';
import { AdminLoginGuard } from 'src/app/core/authentication/adminLogin.guard';




const adminRoute: Routes = [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to dashboard
      { path: 'dashboard', component: HomeComponent ,canActivate:[AdminGuard]},
      { path: 'login', component: AdminLoginComponent,canActivate:[AdminLoginGuard]},
   
];

@NgModule({
  imports: [RouterModule.forChild(adminRoute)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
