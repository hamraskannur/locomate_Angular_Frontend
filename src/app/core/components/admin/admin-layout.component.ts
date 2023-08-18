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
    { name: 'Dashboard', link: '/admin/dashboard', icon: 'Home' },
    { name: 'Users', link: '/admin/users', icon: 'group' },
    { name: 'posts', link: '/admin/posts', icon: 'photo_library' },
  ];

  changeSidebar() {
    this.sideBar = !this.sideBar;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
