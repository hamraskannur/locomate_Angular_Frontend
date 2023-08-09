import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  switchChecked = false;
  constructor(private userApiServiceService:UserApiServiceService,private router: Router){}

  ngOnInit(): void {
    this.userApiServiceService.getUser().subscribe(({user}:{ success: boolean; message: string; user: User })=>{         
         this.switchChecked=!user.public
    })
  }


  handleSwitchChange(): void {    
    this.userApiServiceService.changeToPrivate(!this.switchChecked).subscribe((user: {message:string,success:boolean}) => {
      console.log(user);
    });
  }
  handleLogout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
