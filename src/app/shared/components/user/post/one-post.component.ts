import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  User } from 'src/app/core/models/interface';
import { ToastrServiceService } from 'src/app/features/user/services/toastr.service';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

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
  editPost = false;
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  constructor(
    private userApiServiceService: UserApiServiceService,
    private router: Router,
    private toastrService: ToastrServiceService
    ,private store: Store<{ user: UserState }>
  ) {}

  ngOnInit() {
      this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
        if(user){
          this.currentUser = user._id === this.post?.userId?._id;
          this.savedStatus = user?.saved?.includes(this.post?._id);
          this.like = this.post?.likes?.includes(user._id);
          this.likeCount = this.post?.likes?.length;
          this.user = user;
        }
      });
  }
  onDescriptionChange(newDescription: string): void {
    this.post.description = newDescription;
    this.post.edit=true
  }

  getAccountPage(id: string) {
    if (this.currentUser) {
      this.router.navigate(['/myAccount']);
    } else {
      this.router.navigate(['/friendAccount', id]);
    }
  }

  submit(id: string) {}

  setEditPost() {
    this.editPost = true;
  }
  handleSetCount(value:number){
  }

  setReport() {}

  likePost(id: string) {
    this.userApiServiceService
      .likePost(id)
      .subscribe(({ success }: { success: boolean; message: string }) => {
        if (success) {
          if (this.like) {
            this.likeCount--;
            this.like = false;
          } else {
            this.likeCount++;
            this.like = true;
          }
        }
      });
  }

  handleSavePost(postId: string) {
    this.userApiServiceService
      .savePost({ postId })
      .subscribe((response: { success: boolean; message: string }) => {
        if (response.success) {
          this.savedStatus = !this.savedStatus;
          if (this.savedStatus) {
            this.toastrService.showSuccess('Post saved successfully');
          } else {
            this.toastrService.showSuccess('Post unsaved successfully');
          }
        }
      });
  }
  setDropdownOpen() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setCommentsOpen(state: boolean) {
    this.commentsOpen=state
  }

  onSetEditPost(value: boolean) {
    this.editPost = false;
  }
}
