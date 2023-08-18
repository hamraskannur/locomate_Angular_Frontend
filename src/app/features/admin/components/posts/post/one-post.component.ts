import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrServiceService } from 'src/app/features/user/services/toastr.service';


@Component({
  selector: 'app-admin-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css'],
})
export class AdminOnePostComponent implements OnInit {
  @Input() post: any;
  @Input() onePost: boolean = false;
  @Input() shorts:boolean=false

  dropdownOpen = false;
  currentUser = false;
  savedStatus = false;
  like = false;
  commentsOpen = false;
  likeCount = 0;
  count = 0;
  editPost = false;
  images: string[] = []; // Add your image URLs here
  currentIndex: number = 0;
  currentImage: string = '';
  alert = false;
  constructor(
    private router: Router,
    private toastrService: ToastrServiceService,
  ) {}

  ngOnInit() {
    this.showImage(this.currentIndex);
  }
 

  getAccountPage(userId: string) {
    this.router.navigate(['/admin/userAccount', userId]);

  }
 
  showImage(index: number): void {
    this.currentImage = this.images[index];
  }

  showNextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage(this.currentIndex);
    console.log(this.currentIndex);
  }

  showPreviousImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage(this.currentIndex);
  }
}
