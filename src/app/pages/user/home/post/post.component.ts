import { Component, OnInit } from '@angular/core';

import { Post, User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private userApiServiceService: UserApiServiceService) {}
  onePost=false
  posts: Post[] = [];
  userId: string | undefined;
  update: boolean = false;

  ngOnInit(): void {
    this.getPost();
  }
  getUser() {
    this.userApiServiceService
      .getUser()
      .subscribe(
        ({ user }: { success: boolean; message: string; user: User }) => {
          this.userId = user._id;
        }
      );
  }
  getPost(): void {
    this.userApiServiceService.getAllPost().subscribe((allPost:Post[]) => {      
      this.posts = allPost.reverse();
    });
  }
}
