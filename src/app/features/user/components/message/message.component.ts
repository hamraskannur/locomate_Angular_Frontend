import { Component,OnInit } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { User, chat, message } from 'src/app/core/models/interface';
import { Socket, io } from 'socket.io-client';
import { loadUserData } from 'src/app/stores/user/user.actions';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  user!:User
  chats:chat[] = [];
  searchUser=""
  currentChat!:chat
  private socket!: Socket;
  onlineUsers:any
  phoneSizeUser="lg:inline-block"
  phoneSizeChat="hidden lg:inline-block"
  receiveMessages:message|null=null

  constructor(private UserApiServiceService:UserApiServiceService,private store: Store<{ user: UserState }>){}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {
    this.socket = io("http://localhost:8800");
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
    this.socket.on("receive-message", (data) => {
      console.log(data);
      this.receiveMessages=data
    });
  }


  socketSetup(user:User){    
    if(this.socket && user){
      this.socket.emit("new-user-add", user._id);
      this.socket.on("get-user", (users:any) => {
        this.onlineUsers=users
      });
    }
  }


  setPhoneSizeUser(value:string){    
    this.phoneSizeUser=value
  }

  setPhoneSizeChat(value:string){    
     this.phoneSizeChat=value
  }

  clickUser(data:chat){
    this.currentChat=data
    this.phoneSizeChat="lg:flex"
    this.phoneSizeUser="hidden lg:flex"
   
  }

  setSentMessage(value:message){
    this.socket.emit("send-message", value);
  }
}
