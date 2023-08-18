import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit,OnDestroy {
  request:any[]=[]
  
  constructor(private userApiServiceService:UserApiServiceService){}
  userDataSubscription: Subscription | undefined;

  ngOnInit(): void {
   this.userDataSubscription= this.userApiServiceService.getAllRequest().subscribe((data:any)=>{
      this.request=data.Request
    })
  }

  handleAcceptRequest(acceptId: string): void {
      this.request = this.request.filter((item:any) => item.Requests[0]._id !== acceptId);
  }

  handleDeleteRequest(id: string): void {  
      this.request = this.request.filter((item:any) => item.Requests[0]._id !== id);
  }
  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe()
  }
}
