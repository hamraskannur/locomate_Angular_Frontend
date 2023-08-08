import { Component, Input, OnInit } from '@angular/core';
import { Post, User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css'],
})
export class OnePostComponent implements OnInit {
  @Input() post: any;
  @Input() onePost: boolean = false;
  dropdownOpen = false;
  currentUser = false;
  savedStatus = false;
  like = false;
  commentsOpen = false;
  likeCount = 0;
  count = 0;
  user: User | null = null;
  constructor(private userApiServiceService: UserApiServiceService) {}

  ngOnInit() {
    this.userApiServiceService
      .getUser()
      .subscribe(
        ({ user }: { success: boolean; message: string; user: User }) => {
          this.currentUser = user._id === this.post?.userId?._id;
          this.savedStatus = user?.saved?.includes(this.post?._id);
          this.like = this.post?.likes?.includes(user._id);
          this.likeCount = this.post?.likes?.length;
          this.user=user
        }
      );
  }

  getAccountPage(id: string) {}

  submit(id: string) {}

  setEditPost() {}

  setReport() {}

  likePost(id: string) {}
  handleSavePost(id: string) {}
  setDropdownOpen() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setCommentsOpen(state: boolean) {}
}
