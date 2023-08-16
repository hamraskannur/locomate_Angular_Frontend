import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';




const adminRoute: Routes = [
  {
    path: '',component: HomeComponent,
    children: [
       
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoute)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
