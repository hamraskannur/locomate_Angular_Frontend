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
} from '@angular/core';
import { User, chat, message } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../../services/user-api.service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() chat!: chat;
  @Input() currentUserId!: string;
  @Input() receiveMessages: any;
  @Input() userName!:string
  @Output() setSentMessage: EventEmitter<message> = new EventEmitter<message>();
  @Output() setPhoneSizeUser: EventEmitter<string> = new EventEmitter<string>();
  @Output() setPhoneSizeChat: EventEmitter<string> = new EventEmitter<string>();
  messages: message[] = [];
  newMessage = '';
  user: User | undefined;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private userApiServiceService: UserApiServiceService) {}
  ngOnInit(): void {
    this.getUser();
    this.getMessages();
  }

  getUser() {
    if (this.chat && this.currentUserId) {
      const userId = this.chat.members.find((id) => id != this.currentUserId);
      if (userId) {
        this.userApiServiceService
          .getFriendsAccount(userId)
          .subscribe((data: User) => {
            this.user = data;
          });
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
      this.receiveMessages=null
    }
  }
  }

  getMessages() {
    if (this.chat) {
      this.userApiServiceService
        .getMessages(this.chat._id)
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
    if (this.newMessage.trim().length !== 0) {
      const messageAdd = {
        senderId: this.currentUserId,
        text: this.newMessage,
        chatId: this.chat?._id,
      };
      this.userApiServiceService
        .sentMessage(messageAdd)
        .subscribe((data: message) => {
          this.messages.push(data);
          this.newMessage = '';
          const receiverId = this.chat.members.find(
            (id) => id !== this.currentUserId
          );
          if (receiverId) {
            this.setSentMessage.emit({ ...data, receiverId });
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
}