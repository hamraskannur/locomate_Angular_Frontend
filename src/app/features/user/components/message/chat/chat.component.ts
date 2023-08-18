import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit,
  OnDestroy
} from '@angular/core';
import { User, chat, message } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../../services/user-api.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnChanges, AfterViewChecked,OnDestroy {
  @Input() chat: chat|undefined;
  @Input() currentUserId!: string;
  @Input() receiveMessages: any;
  @Input() userName!:string
  @Output() setSentMessage: EventEmitter<message> = new EventEmitter<message>();
  @Output() setPhoneSizeUser: EventEmitter<string> = new EventEmitter<string>();
  @Output() setPhoneSizeChat: EventEmitter<string> = new EventEmitter<string>();
  messages: message[] = [];
  newMessage = '';
  user!: User ;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private userApiServiceService: UserApiServiceService) {}
  ngOnInit(): void {
    this.getUser();
   
  }

  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;
  subscription4: Subscription | undefined;

  getUser() {
    if (this.chat && this.currentUserId) {
      if(this.chat){

        const userId = this.chat.members.find((id) => id != this.currentUserId);
        if (userId) {
        this.subscription2=  this.userApiServiceService
            .getFriendsAccount(userId)
            .subscribe((data: User) => {
              this.user = data;
              this.getMessages(data._id);
            });
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat']) {
      this.getUser();
      this.getMessages();
    }
    if (changes['receiveMessages']) {
    if(this.receiveMessages && this.user && this.receiveMessages.senderId===this.user._id){
      this.messages.push(this.receiveMessages)
    this.subscription3=  this.userApiServiceService.messageView(this.receiveMessages._id).subscribe(()=>{

        this.receiveMessages=null
      })
    }
  }
  }

  getMessages(userId:string=this.user._id) {
    if (this.chat) {
     this.subscription4= this.userApiServiceService
        .getMessages(this.chat._id,userId)
        .subscribe((data: message[]) => {
          this.messages = data;
        });
    }
  }

  clickUser() {
    this.setPhoneSizeUser.emit('lg:flex ');
    this.setPhoneSizeChat.emit('hidden lg:flex ');
  }

  
 



  postMessage() {
    if (this.newMessage.trim().length !== 0 && this.chat) {
      const messageAdd = {
        senderId: this.currentUserId,
        text: this.newMessage,
        chatId: this.chat._id,
      };
      this.subscription1=this.userApiServiceService
        .sentMessage(messageAdd)
        .subscribe((data: message) => {
          this.messages.push(data);
          this.newMessage = '';
          if(this.chat){

            const receiverId = this.chat.members.find(
              (id) => id !== this.currentUserId
            );
            if (receiverId) {
              this.setSentMessage.emit({ ...data, receiverId });
            }
          }
        });
    }
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

ngOnDestroy(): void {
  this.subscription1?.unsubscribe()
  this.subscription2?.unsubscribe()
  this.subscription3?.unsubscribe()
  this.subscription4?.unsubscribe()

}
}
