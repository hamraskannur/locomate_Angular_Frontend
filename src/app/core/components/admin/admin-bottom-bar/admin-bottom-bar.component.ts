import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-bottom-bar',
  templateUrl: './admin-bottom-bar.component.html',
  styleUrls: ['./admin-bottom-bar.component.css'],
})
export class AdminBottomBarComponent {
  constructor(private router: Router) {}
  menus = [
    { name: 'Users', link: '/users', icon: 'group' },
    { name: 'report', link: '/reports', icon: 'report' },
    { name: 'posts', link: '/posts', icon: 'photo_library' },
  ];
  logOut() {
    localStorage.clear();
    this.router.navigate(['/admin/login']);
  }
}
