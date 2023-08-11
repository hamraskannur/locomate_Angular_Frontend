import { Component, OnInit } from '@angular/core';
import { notification } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notification:notification[]=[]
  constructor(private userApiServiceService:UserApiServiceService){}
ngOnInit(): void {
  this.userApiServiceService.getAllNotifications().subscribe(({user}:{Status:boolean,user:notification[]})=>{
    this.notification=user.reverse()
  })
}

getAccountPage(userId: string): void {

  this.userApiServiceService.goToAccount(userId)
}
}
