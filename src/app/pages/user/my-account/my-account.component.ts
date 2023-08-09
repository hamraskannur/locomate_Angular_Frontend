import { Component } from '@angular/core';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  user !:User
  type=true
  constructor(private userApiServiceService:UserApiServiceService){}

 ngOnInit(): void {
   this.userApiServiceService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{    
        this.user=user
   })
 }
}
