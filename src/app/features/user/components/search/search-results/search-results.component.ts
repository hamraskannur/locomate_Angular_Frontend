import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../../services/user-api.service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  @Input() searchResults: User[]=[] 

  constructor(private userApiServiceService:UserApiServiceService) {}

  goToAccount(userId: string): void {
 
    this.userApiServiceService.goToAccount(userId)
  }
}
