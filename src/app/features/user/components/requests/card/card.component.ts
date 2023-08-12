import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserApiServiceService } from '../../../services/user-api.service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data: any;
  @Output() deleteRequest: EventEmitter<string> = new EventEmitter<string>();
  @Output() acceptRequest: EventEmitter<string> = new EventEmitter<string>();

  
  constructor(private userApiServiceService: UserApiServiceService) {}
  goToAccount(userId: string): void {
    this.userApiServiceService.goToAccount(userId);
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
