import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule, Routes } from '@angular/router';



const route:Routes =[
    {path:'',component:EditProfileComponent},
]
@NgModule({
  declarations: [EditProfileComponent],
  imports: [FormsModule, ReactiveFormsModule,CommonModule,  CoreModule,RouterModule.forChild(route)],
})
export class EditModule { }
