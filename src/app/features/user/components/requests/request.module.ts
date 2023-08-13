import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { RequestsComponent } from './requests.component';
import { CardComponent } from './card/card.component';



const route:Routes =[
    {path:'',component:RequestsComponent},
]
@NgModule({
  declarations: [RequestsComponent,CardComponent],
  imports: [CommonModule,CoreModule,RouterModule.forChild(route)],
})
export class RequestModule { }
