import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User, comment } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit ,OnDestroy{
  constructor(
    private store: Store<{ user: UserState }>,
    private userApiServiceService: UserApiServiceService
    , private router: Router
  ) {}
  private commentDataSubscription: Subscription | undefined;
  userDataSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;

  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);


  @Input() comment: comment | undefined;
  profileImg: string | undefined;
  allReplayComment: comment[] | undefined;
  user: User | undefined;
  reply = false;
  replayCommentCount = 0;
  like = true;
  likeCount = 0;
  newReplayComment = '';


  ngOnInit(): void {
  this.getComments()
  }


  getComments(){
 if (this.comment) {
  this.commentDataSubscription = this.userApiServiceService
      .getReplayComment(this.comment._id)
      .subscribe((data) => {
        this.allReplayComment = data.comments;
        this.replayCommentCount = data.comments?.length;
        
      });
   this.userDataSubscription= this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.profileImg = user.ProfileImg;
        this.user = user;
      }
    });
    if (this.user) {
      this.like = this.comment.likes.includes(this.user._id);
      this.likeCount = this.comment?.likes?.length;
    }
  }
  }
 
  handlePostComment() {
    if (this.comment) {
      const commentId = this.comment._id;
      this.subscription2=  this.userApiServiceService
        .postReplayComment({ commentId, newComment: this.newReplayComment })
        .subscribe((data) => {
          if (this.user) {
            const newComment = {
              ...data.comments,
              username: this.user.username,
              ProfileImg: this.user.ProfileImg,
              likes: [],
            };
            this.allReplayComment?.push(newComment);
          }
        });
    }
  }

  likeComment(id: string | undefined) {
    if (id) {
      this.subscription3= this.userApiServiceService
        .likeMainComment({ commentId: id })
        .subscribe(({ success }: { message: string; success: boolean }) => {
          if (success) {
            if (this.like) {
              this.likeCount--
              this.like=false
            } else {
              this.likeCount++
              this.like=true
            }
          }
        });
    }
  }

  setReply(Reply: boolean) {
    this.reply = Reply;
  }


  getUserAccount(id: string | undefined) {
    if(id && this.user){
        const currentUserId = this.user._id;
        if (id === currentUserId) {
          this.router.navigate(['/myAccount']);
        } else {
          this.router.navigate(['/friendAccount', id]);
        }
    }
  }
  ngOnDestroy(): void {
      this.commentDataSubscription?.unsubscribe();
      this.userDataSubscription?.unsubscribe();
      this.subscription2?.unsubscribe();
      this.subscription3?.unsubscribe();
    }
}
