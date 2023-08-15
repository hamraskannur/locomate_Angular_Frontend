import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { MessageComponent } from './message.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';




const route:Routes =[
    {path:'',component:MessageComponent},
]
@NgModule({
  declarations: [MessageComponent, UsersComponent, ChatComponent],
  imports: [CommonModule,CoreModule,sharedModule,FormsModule,RouterModule.forChild(route)],
})
export class MessageModule { }
