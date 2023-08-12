import { Component } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  user!:User[]
  constructor(private UserApiServiceService: UserApiServiceService) {}

  handleSetSearchInput(input: string): void {
    this.UserApiServiceService.searchUser(input).subscribe((data) => {
         this.user=data
    });
  }
}
