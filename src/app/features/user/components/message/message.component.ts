import { Component,OnInit } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { User, chat, message } from 'src/app/core/models/interface';
import { Socket, io } from 'socket.io-client';
import { loadUserData } from 'src/app/stores/user/user.actions';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  user!:User
  chats:chat[] = [];
  searchUser=""
  currentChat:chat|undefined
  onlineUsers:any
  phoneSizeUser="lg:inline-block"
  phoneSizeChat="hidden lg:inline-block"
  receiveMessages:message|null=null
  receiveMessagescount:{status:boolean,count:number,userId:string}={status:false,count:1,userId:""}
  
  receiveMessagesChange:number=0
  constructor(private UserApiServiceService:UserApiServiceService,private store: Store<{ user: UserState }>,private SocketService:SocketService){}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {
    
    this.store.dispatch(loadUserData())

    this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
      if(user){        
        this.user=user
        this.socketSetup(user)
        this.UserApiServiceService.getUserChat(user._id).subscribe((data:chat[])=>{
            this.chats=data
        })
      }
    });
    this.SocketService.getSocket().on("receive-message", (data:message) => {
       
       
      if(this.user && this.currentChat&& data.chatId===this.currentChat._id){
        this.receiveMessages=data
      }else{        
        this.receiveMessagescount.status=true
        this.receiveMessagescount.userId=data.senderId
        this.receiveMessagescount.count=1
        this.receiveMessagesChange++
      }
    });
  }


  socketSetup(user:User){    
    if(user){
      this.SocketService.getSocket().on("get-user", (users:any) => {
        this.onlineUsers=users
      });
    }
  }


  setPhoneSizeUser(value:string){    
    this.currentChat=undefined
    this.phoneSizeUser=value
  }

  setPhoneSizeChat(value:string){   
    this.currentChat=undefined 
     this.phoneSizeChat=value
  }

  clickUser(data:chat){
    this.currentChat=data
    this.phoneSizeChat="lg:flex"
    this.phoneSizeUser="hidden lg:flex"
    this.receiveMessagescount.count=0
    this.receiveMessagesChange++
  }

  setSentMessage(value:message){    
    this.SocketService.getSocket().emit("send-message", value);
  }
}
