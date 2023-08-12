import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Post, User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input() user!: User;
  @Input() type: boolean=false

  postCount = 0;
  selectOption = 'post';
  onePostId: Post | null = null;
  follow = false;
  Requested = false;
  followersCount = 0;
  followingCount = 0;
  loading=false

  constructor(
    private userApiServiceService: UserApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.type);
    
    this.userCheck()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.userCheck();
    }
  }

  userCheck(){
    this.userApiServiceService
    .getUser()
    .subscribe(
      ({ user }: { success: boolean; message: string; user: User }) => {
        this.follow = this.user?.Followers.includes(user._id);
        this.Requested = this.user?.Requests.includes(user._id);
        this.followersCount = this.user?.Followers?.length 
        this.followingCount = this.user?.Following?.length  
        this.follow= this.user?.Followers.includes(user._id)

      }
      );
  }


  onePost(post: Post) {
    this.onePostId = post;
  }

  editUser = () => {
    this.router.navigate(['/editProfile']);
  };

  followUserHandler(followId: string ) {
    this.loading=true
    this.userApiServiceService.followUser({followId}).subscribe(({success,message}:{message:string,success:boolean})=>{
      if (success) {
        if (!this.user?.public) {
          if (this.follow) {
            this.followersCount--
            this.follow=false
            this.loading=false
          } else {
            if (this.Requested) {
              this.Requested=false
              this.loading=false
            } else {
              this.Requested=true
              this.loading=false
            }
          }
        } else {
          if (this.follow) {
            this.followersCount--
            this.follow=false
            this.loading=false
          } else {
            this.followersCount++
            this.follow=true
            this.loading=false
          }
        }
      } else {

        
      }
    })
  }

  createMessage(id: string ) {}
  openPost = () => {
    this.onePostId = null;
    this.selectOption = 'post';
  };
  openShorts = () => {
    this.onePostId = null;
    this.selectOption = 'shorts';
  };
  clickFollowers = () => {
    this.onePostId = null;
    this.selectOption = 'Followers';
  };
  clickFollowing = () => {
    this.onePostId = null;
    this.selectOption = 'Following';
  };
  clickSavePost = () => {
    this.onePostId = null;
    this.selectOption = 'SavedPost';
  };
  onPostCountChange(newPostCount: number) {
    this.postCount = newPostCount; // Update the parent's postCount
  }
}
