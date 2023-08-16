import { Component, Input, OnInit ,OnChanges,SimpleChanges} from '@angular/core';
import { User, chat } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../../services/user-api.service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Input() data: chat | undefined;
  @Input() currentUserId: string | undefined;
  @Input() onlineUsers: any;
  @Input() searchUser:string=""
  @Input() receiveMessagesChange!:number
  @Input() receiveMessagescount:{status:boolean,count:number,userId:string}={status:false,count:1,userId:""}

  count=0
  user:User|undefined
  notAllowed=true

  constructor(private userApiServiceService:UserApiServiceService){}
  ngOnInit(): void {
      this.getUser()
  }

  getUser(){
    if(this.data &&  this.currentUserId){
      const userId = this.data.members.find((id) => id != this.currentUserId);
      if(userId){
        this.userApiServiceService.getFriendsAccount(userId).subscribe((data:User)=>{
          this.user=data
          if(data){
            this.getCount(data)
          }
        })
      }
    }
  }


  getCount(data:User){
    this.userApiServiceService.getMessageCount(data._id).subscribe((data:number)=>{      
      this.count=data
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['searchUser'] &&  this.user) {
     this.notAllowed= this.user.username.toLowerCase().includes(this.searchUser.toLowerCase())     
    }
    if (changes['receiveMessagesChange']) {
      if(this.receiveMessagescount.status && this.user&& this.receiveMessagescount.userId===this.user._id) {
        this.count++
      }
      if(this.receiveMessagescount.count===0){
        this.count=0
      }
    }
  }
}
