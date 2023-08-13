import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

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
  constructor(private store: Store<{ user: UserState }>) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {
    this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
      if(user){
        this.profileImg=user.ProfileImg
      }
    });
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
