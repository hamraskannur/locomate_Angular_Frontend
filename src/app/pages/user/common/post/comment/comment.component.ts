import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() postId: string | undefined;
  @Input() count: number | undefined;
  profileImg : string|undefined
  newComment:string=""
  
  @Output() setCount: EventEmitter<number> = new EventEmitter<number>();
  constructor(private userApiServiceService:UserApiServiceService){}

  ngOnInit(): void {
    this.userApiServiceService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{    
         this.profileImg=user.ProfileImg
    })
  }
  handlePostComment(){

  }
  changeComment() {
    // Handle comment change
  }

  handleEmojiSelection(emoji: string) {
    // Handle emoji selection and append it to the newComment
    this.newComment += emoji;
  }
}
