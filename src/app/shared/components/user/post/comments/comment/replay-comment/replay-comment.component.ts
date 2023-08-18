import { Component, Input,OnDestroy ,SimpleChanges,OnChanges} from '@angular/core';
import { comment } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-replay-comment',
  templateUrl: './replay-comment.component.html',
  styleUrls: ['./replay-comment.component.css']
})
export class ReplayCommentComponent implements OnChanges,OnDestroy {

  @Input() data:comment|undefined
  @Input() userId:string|undefined
  likeCount=0
  like=false
  subscription: Subscription | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] ) { 
      this.likeCount = this.data?.likes.length || 0; 
      if(this.userId && this.data){
        this.like=this.data.likes.includes(this.userId)
      }
    }
  }

  constructor(
    private userApiServiceService: UserApiServiceService
    , private router: Router
  ) {}
  

  getUserAccount(id:string){
    if(this.userId){
      if (id === this.userId) {
        this.router.navigate(['/myAccount']);
      } else {
        this.router.navigate(['/friendAccount', id]);
      }
  }
  }

  likeComment(commentId:string){
    this.subscription=  this.userApiServiceService.likeReplayComment({commentId}).subscribe(({success}:{message:string,success:boolean})=>{
        if(success){
          if(this.like){
            this.likeCount--
            this.like=false
          }else{
            this.likeCount++
            this.like=true
          }
       }
         
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
