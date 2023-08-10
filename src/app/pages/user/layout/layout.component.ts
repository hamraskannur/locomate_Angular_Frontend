import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent  {
  constructor(private router: Router,private userApiServiceService:UserApiServiceService){}
  count=1
  sideBar=true;

  ngOnInit(): void {
    this.userApiServiceService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{    
         this.count=user.Requests.length
    })
  }

  menus = [
    { name: 'Home', link: '/', icon: "Home" },
    { name: 'Search', link: '/search', icon: "Search" },
    { name: 'Messages', link: '/messages', icon: "chat" },
    { name: 'Shorts', link: '/shorts', icon: "play_circle" },
    { name: 'Settings', link: '/settings', icon: "settings" }
  ];


  
  changeSidebar(){
    this.sideBar=!this.sideBar
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
