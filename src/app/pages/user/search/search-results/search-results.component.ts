import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  @Input() searchResults: User[]=[] 

  constructor(private router: Router,private userApiServiceService:UserApiServiceService) {}

  goToAccount(userId: string): void {

    this.userApiServiceService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{    
     const currentUserId=user._id
      if (userId === currentUserId) {
        this.router.navigate(['/myAccount']);
      } else {
        this.router.navigate(['/friendAccount',currentUserId]);
      }
 })
  }
}
