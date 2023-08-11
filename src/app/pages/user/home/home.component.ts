import { Component, OnInit } from '@angular/core';
import { Post, User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
     if(allPost.length>0){
       this.posts = allPost.reverse();
     }
    });
  }
}
