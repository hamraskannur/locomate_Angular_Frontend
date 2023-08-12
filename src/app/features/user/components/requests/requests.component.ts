import { Component, OnInit } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api.service.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  request:any[]=[]
  
  constructor(private userApiServiceService:UserApiServiceService){}

  ngOnInit(): void {
    this.userApiServiceService.getAllRequest().subscribe((data:any)=>{
      this.request=data.Request
    })
  }

  handleAcceptRequest(acceptId: string): void {
      this.request = this.request.filter((item:any) => item.Requests[0]._id !== acceptId);
  }

  handleDeleteRequest(id: string): void {  
      this.request = this.request.filter((item:any) => item.Requests[0]._id !== id);
  }
}
