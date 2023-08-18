import { Component,OnDestroy } from '@angular/core';
import { adminService } from '../../services/admin-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  constructor(private adminService: adminService) {}

  postCount = 0;
  shortsCount = 0;
  userCount = 0;
  subscription1: Subscription | undefined;


  ngOnInit(): void {
   this.subscription1= this.adminService.getChart().subscribe((data) => {
      this.postCount = data.postCount;
      this.userCount = data.userCount;
      this.shortsCount = data.shortsCount;
    });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe()
  }
}
