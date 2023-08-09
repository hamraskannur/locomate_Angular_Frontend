import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  @Input() userId: string | undefined;
  @Input() type: Boolean =false;
  @Input() SavedPost: boolean = false;
  @Input() postCount: number | undefined;
  @Output() postCountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onePost: EventEmitter<Post> = new EventEmitter<Post>();

  posts:any

  constructor(private userApiServiceService:UserApiServiceService){}

ngOnInit(): void {
  this.getPost()
}

  handlePostClick(post: Post): void {
    if (this.SavedPost) {
      
      this.getSavedOnePost(post);
    } else {
      this.getOnePost(post);
    }
  }


   getPost = async () => {    
    if (this.SavedPost && this.userId) {  
       this.userApiServiceService.getSavedPost(this.userId).subscribe((response)=>{
        console.log(response,"response");
         this.posts=response
       })

      } else {
        if (this.userId) {
          this.userApiServiceService.getUserAllPost(this.userId).subscribe(({AllPosts}:{success:boolean,AllPosts:Post[],message:string})=>{
            this.postCount=AllPosts.length
            this.postCountChange.emit(this.postCount)
              this.posts=AllPosts
          })
        }
      }
    };
  getSavedOnePost(postData: Post) {
    this.onePost.emit(postData)
  }

  getOnePost(post: Post  ) {
    this.onePost.emit(post)
  
  }

}
