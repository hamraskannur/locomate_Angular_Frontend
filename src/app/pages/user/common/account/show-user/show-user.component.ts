import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html', // Adjust the template URL
  styleUrls: ['./show-user.component.css'], // Adjust the styles URL
})
export class ShowUserComponent implements OnInit,OnChanges {
  @Input() type!: string;
  @Input() userId!: string;

  currentUser:User|null = null;  
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
   this.userApiService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{
    
      this.currentUser=user
    })

  }

  getUserData(type: string): void {
    if (type === 'Following') {
      this.userApiService.getFollowingUser(this.userId).subscribe(({user}:{message:string,user:any[]}) => {
        this.users=user

      });
    } else if (type === 'Followers') {
      this.userApiService.getFollowersUser(this.userId).subscribe(({user}:{message:string,user:any[]}) => {
        this.users=user

      });
    }
  }

  goToAccountPage(userId: string): void {

    if (this.currentUser && userId === this.currentUser._id) {
      this.router.navigate(['/myAccount']);
    } else {
      this.router.navigate(['/friendAccount',userId]);
    }
  }
}
