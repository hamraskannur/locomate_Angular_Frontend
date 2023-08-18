import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  sideBar = true;
  constructor(private router: Router) {}
  menus = [
    { name: 'Dashboard', link: '/', icon: 'Home' },
    { name: 'Users', link: '/users', icon: 'group' },
    { name: 'report', link: '/reports', icon: 'report' },
    { name: 'posts', link: '/posts', icon: 'photo_library' },
  ];

  changeSidebar() {
    this.sideBar = !this.sideBar;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
