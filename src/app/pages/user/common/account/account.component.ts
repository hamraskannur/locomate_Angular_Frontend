import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

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

  constructor(
    private userApiServiceService: UserApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userApiServiceService
      .getUser()
      .subscribe(
        ({ user }: { success: boolean; message: string; user: User }) => {
          this.follow = this.user?.Followers.includes(user._id);
          this.Requested = this.user?.Requests.includes(user._id);

          this.followersCount = this.user?.Followers?.length || 0;
          this.followingCount = this.user?.Following?.length || 0;
          console.log(this.user.ProfileImg);
          
        }
      );
  }
  onePost(post: Post) {
    this.onePostId = post;
  }

  editUser = () => {
    this.router.navigate(['/editProfile']);
  };

  followUserHandler(id: string | undefined) {}

  createMessage(id: string | undefined) {}
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
