import { Component, Input, OnInit, SimpleChanges ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post, User } from 'src/app/core/models/interface';

import { adminService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AdminAccountComponent implements OnInit ,OnDestroy{
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
  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  constructor(private adminService: adminService) {}

  ngOnInit(): void {    
    this.userCheck()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.userCheck();
    }
  }

  userCheck(){
     this.followersCount = this.user?.Followers?.length 
      this.followingCount = this.user?.Following?.length  
  }


  onePost(post: Post) {
    this.onePostId = post;
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
  blockUser(user:User):void {
   this.subscription1= this.adminService
    .blockUser(true, user._id)
    .subscribe(({status}: { status: boolean }) => {
      console.log(status);
      if (status) {
        
        user.status = true;
      }
    });
  }
unBlockUser(user:User){
 this.subscription2= this.adminService
  .blockUser(false, user._id)
  .subscribe(({status}: { status: boolean }) => {
    if (status) {
      user.status = false;
    }
  });
}
ngOnDestroy(): void {
  this.subscription1?.unsubscribe()
  this.subscription2?.unsubscribe()
}
}
