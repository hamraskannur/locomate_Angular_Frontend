import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
 
})
export class SideBarComponent  {
constructor(private router: Router){}

  sideBar=true;

  menus = [
    { name: 'Home', link: '/', icon: "Home" },
    { name: 'search', link: '/search', icon: "Search" },
    { name: 'Messages', link: '/messages', icon: "chat" },
    { name: 'shorts', link: '/shorts', icon: "play_circle" },
    { name: 'settings', link: '/settings', icon: "settings" }
  ];


  
  changeSidebar(){
    this.sideBar=!this.sideBar
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 
}
