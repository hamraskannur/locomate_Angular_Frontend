import { Component, EventEmitter, Input, OnInit, Output ,OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User, comment } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit,OnDestroy {

  @Input() postId: string | undefined;
  @Input() count: number | undefined;
  comments:comment[]|undefined
  profileImg : string|undefined
  newComment:string=""
  userDataSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;

  @Output() setCount: EventEmitter<number> = new EventEmitter<number>();
  constructor(private store: Store<{ user: UserState }>,private userApiServiceService:UserApiServiceService) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {
   this.userDataSubscription= this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
      if(user){
        this.profileImg=user.ProfileImg
      }
    });
    this.getAllComments()
  }

   getAllComments() {
    if(this.postId){
      this.subscription2=this.userApiServiceService.getAllComment(this.postId).subscribe(({comments}:{success:boolean,comments:comment[],message:string})=>{
        this.comments=comments
        this.setCount.emit(comments.length)
      })
    }
  };

  handlePostComment(){
    if(this.postId){
     this.subscription3= this.userApiServiceService.postComment(this.postId,this.newComment).subscribe((data)=>{        
        const newComment = {
          ...data.comment,
          userId: data.comment.userId._id,
          username: data.comment.userId.username,
          ProfileImg:data.ProfileImg
        };         
        this.comments?.push(newComment)      
        this.setCount.emit(this.comments?.length)
  
      })
    }
  }
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to prevent memory leaks
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
    if(this.subscription3){
      this.subscription3.unsubscribe();
    }
  }

}
