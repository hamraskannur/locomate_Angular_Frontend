import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserApiServiceService } from '../../../services/user-api.service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/stores/user/user.reducer';
import { User } from 'src/app/core/models/interface';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data: any;
  @Output() deleteRequest: EventEmitter<string> = new EventEmitter<string>();
  @Output() acceptRequest: EventEmitter<string> = new EventEmitter<string>();

  
  constructor(private userApiServiceService: UserApiServiceService, private router: Router,private store: Store<{ user: UserState }>) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);


  goToAccount(userId: string): void {
    this.userDataAndOptions$.subscribe(({user}:{user:User|null}) => {
      if(user){
        const currentUserId = user._id;
        if (userId === currentUserId) {
          this.router.navigate(['/myAccount']);
        } else {
          this.router.navigate(['/friendAccount', userId]);
        }
      }
    });

  }

  deleteReq(id: string) {
    this.userApiServiceService.deleteRequests(id).subscribe(() => {
      this.deleteRequest.emit(id); 
    });
  }

  acceptReq(acceptId: string): void {
    this.userApiServiceService.acceptRequest({acceptId}).subscribe((data) => {
      console.log(data,'acceptReq');
      this.acceptRequest.emit(acceptId); 
    });
  }
}
