import { Component ,OnDestroy} from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy{
  user!:User[]
  constructor(private UserApiServiceService: UserApiServiceService) {}
  subscription1: Subscription | undefined;

  handleSetSearchInput(input: string): void {
    this.UserApiServiceService.searchUser(input).subscribe((data) => {
         this.user=data
    });
  }


  ngOnDestroy(): void {
    this.subscription1?.unsubscribe()
  }
}
