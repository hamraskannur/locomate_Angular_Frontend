import { Component, Input, OnInit, SimpleChanges,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post, User, chat } from 'src/app/core/models/interface';
import { ToastrServiceService } from 'src/app/features/user/services/toastr.service';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit,OnDestroy {
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
  userId!:string
  constructor(
    private userApiServiceService: UserApiServiceService,
    private ToastrServiceService:ToastrServiceService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  userDataSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit(): void {    
    this.userCheck()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.userCheck();
    }
  }

  userCheck(){
     this.userDataSubscription= this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
        if(user){
          this.follow = this.user?.Followers.includes(user._id);
          this.Requested = this.user?.Requests.includes(user._id);
          this.followersCount = this.user?.Followers?.length 
          this.followingCount = this.user?.Following?.length  
          this.follow= this.user?.Followers.includes(user._id)     
          this.userId=user._id
        }
      });
  }


  onePost(post: Post) {
    this.onePostId = post;
  }

  editUser = () => {
    this.router.navigate(['/editProfile']);
  };

  followUserHandler(followId: string ) {
    this.loading=true
   this.subscription2= this.userApiServiceService.followUser({followId}).subscribe(({success,message}:{message:string,success:boolean})=>{
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

  createMessage(senderId: string ) {

    this.subscription3= this.userApiServiceService.createChat({ senderId, receiverId: this.userId }).subscribe((data:chat)=>{
     this.ToastrServiceService.showSuccess("Successfully created message")
      this.router.navigate(['/message']);
      
    })
  }
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
  deletePost(id:string):void {
    this.onePostId = null;
    this.selectOption = 'post';
  }

  createChat(id:string):void {
    this.onePostId = null;
    this.selectOption = 'post';
  }

  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe()
    this.subscription2?.unsubscribe()
    this.subscription3?.unsubscribe()
  }
}
