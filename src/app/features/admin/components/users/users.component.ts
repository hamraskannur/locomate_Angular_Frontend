import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { adminService } from '../../services/admin-api.service';
import { User } from 'src/app/core/models/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnDestroy {
  users!: User[];
  constructor(private adminService: adminService ,private router: Router) {}
  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;
  ngOnInit(): void {
    this.subscription1=this.adminService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  unblockUser(user: User) {
    this.subscription2=this.adminService
    .blockUser(false, user._id)
    .subscribe(({status}: { status: boolean }) => {
      console.log(status);
      if (status) {
        user.status = false;
      }
    });
  }

  blockUser(user: User) {
    this.subscription3=this.adminService
      .blockUser(true, user._id)
      .subscribe(({status}: { status: boolean }) => {
        console.log(status);
        if (status) {
          
          user.status = true;
        }
      });
  }


  getUserPage(userId: string): void {
    
    this.router.navigate(['/admin/userAccount', userId]);
  }

ngOnDestroy(): void {
  this.subscription1?.unsubscribe()
  this.subscription2?.unsubscribe()
  this.subscription3?.unsubscribe()
}
}
