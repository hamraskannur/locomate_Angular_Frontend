


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/interface';
import { UserApiServiceService } from 'src/app/services/user-api.service.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  users:User[]=[]
  constructor(private router: Router,private userApiServiceService:UserApiServiceService) {  }

  ngOnInit(): void {
    this.getUser()
    this.fetchSuggestions();
  }


  fetchSuggestions(): void {
      this.userApiServiceService.getSuggestionUsers().subscribe(({notFollowedUsers}:{status:boolean,notFollowedUsers:User[]})=>{
        this.users=notFollowedUsers
      })
  }


  
  getUser(){
    this.userApiServiceService.getUser().subscribe((data:{success:boolean,message:string,user:User}) => {
      console.log(data);
    });
  }
}
