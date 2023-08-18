import { Component, OnInit } from '@angular/core';

import { adminService } from '../../services/admin-api.service';
import { User } from 'src/app/core/models/interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];
  constructor(private adminService: adminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  unblockUser(user: User) {
    this.adminService
    .blockUser(false, user._id)
    .subscribe(({status}: { status: boolean }) => {
      console.log(status);
      if (status) {
        user.status = false;
      }
    });
  }

  blockUser(user: User) {
    this.adminService
      .blockUser(true, user._id)
      .subscribe(({status}: { status: boolean }) => {
        console.log(status);
        if (status) {
          
          user.status = true;
        }
      });
  }

  getUserPage(id: string) {}
}
