import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { NotificationsComponent } from './notifications.component';



const route:Routes =[
    {path:'',component:NotificationsComponent},
]
@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule,CoreModule,sharedModule,RouterModule.forChild(route)],
})
export class NotificationModule { }
