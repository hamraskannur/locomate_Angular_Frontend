import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { MyAccountComponent } from './my-account.component';




const route:Routes =[
    {path:'',component:MyAccountComponent},
]
@NgModule({
  declarations: [MyAccountComponent],
  imports: [FormsModule,CommonModule,CoreModule,sharedModule,RouterModule.forChild(route)],
})
export class myAccountModule { }
