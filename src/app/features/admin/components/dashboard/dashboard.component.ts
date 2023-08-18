import { Component } from '@angular/core';
import { adminService } from '../../services/admin-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private adminService: adminService) {}

  postCount = 0;
  shortsCount = 0;
  userCount = 0;

  ngOnInit(): void {
    this.adminService.getChart().subscribe((data) => {
      this.postCount = data.postCount;
      this.userCount = data.userCount;
      this.shortsCount = data.shortsCount;
    });

    
  }
}
