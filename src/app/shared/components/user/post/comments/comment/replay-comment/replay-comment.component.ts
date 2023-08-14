import { Component, Input,OnInit ,SimpleChanges,OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { comment } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
@Component({
  selector: 'app-replay-comment',
  templateUrl: './replay-comment.component.html',
  styleUrls: ['./replay-comment.component.css']
})
export class ReplayCommentComponent implements OnChanges {

  @Input() data:comment|undefined
  @Input() userId:string|undefined
  likeCount=0
  like=false

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] ) { 
      this.likeCount = this.data?.likes.length || 0; 
      if(this.userId && this.data){
        this.like=this.data.likes.includes(this.userId)
      }
    }
  }

  constructor(
    private store: Store<{ user: UserState }>,
    private userApiServiceService: UserApiServiceService,
     private router: Router
  ) {}
  

  getUserAccount(id:string){

  }

  likeComment(commentId:string){
      this.userApiServiceService.likeReplayComment({commentId}).subscribe(({success}:{message:string,success:boolean})=>{
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
}
