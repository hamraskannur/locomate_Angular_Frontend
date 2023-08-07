import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  showModal = false;
  addPost = false;
  shortsModal = false;
  showToggle = false;
  user = {}; // Replace with your user data

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
