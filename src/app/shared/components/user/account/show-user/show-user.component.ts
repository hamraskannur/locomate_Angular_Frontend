import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html', // Adjust the template URL
  styleUrls: ['./show-user.component.css'], // Adjust the styles URL
})
export class ShowUserComponent implements OnInit, OnChanges {
  @Input() type!: string;
  @Input() userId!: string;

  currentUser: User | null = null;
  users: any[] | undefined;

  constructor(
    private userApiService: UserApiServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      const newType = changes['type'].currentValue;
      this.getUserData(newType);
    }
  }

  ngOnInit(): void {
    this.getUserData(this.type);
   
  }

  getUserData(type: string): void {
    if (type === 'Following') {
      this.userApiService
        .getFollowingUser(this.userId)
        .subscribe(({ user }: { message: string; user: any[] }) => {
          this.users = user;
        });
    } else if (type === 'Followers') {
      this.userApiService
        .getFollowersUser(this.userId)
        .subscribe(({ user }: { message: string; user: any[] }) => {
          this.users = user;
        });
    }
  }

  goToAccountPage(userId: string): void {
    this.userApiService.goToAccount(userId);
  }
}
