import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNotfoundComponent } from './pages/error/app-notfound/app-notfound.component';
import { AppBadgatewayComponent } from './pages/error/app-badgateway/app-badgateway.component';
import { AppInternalserverComponent } from './pages/error/app-internalserver/app-internalserver.component';
import { CommonerrorComponent } from './pages/error/commonerror/commonerror.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: '404', component: AppNotfoundComponent },
  { path: '502', component: AppBadgatewayComponent },
  { path: '500', component: AppInternalserverComponent },
  { path: 'error', component: CommonerrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
