import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  showModal = false;
  addPost = false;
  shortsModal = false;
  showToggle = false;
  user :User|null = null;

  constructor(private userApiServiceService:UserApiServiceService){}

 ngOnInit(): void {
   this.userApiServiceService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{    
        this.user=user
   })
 }
  toggleAddPost() {
    this.addPost = !this.addPost;
  }

  toggleShowToggle() {
    this.showToggle = !this.showToggle;
  }

  toggleShortsModal() {
    this.shortsModal = !this.shortsModal;
  }

  outsideClickHandlerShowToggle() {
    this.showToggle = false;
  }

  outsideClickHandlerAddPost() {
    this.addPost = false;
  }



}
