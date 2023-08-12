import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interface';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent  {
  @Input() user!: User;
  sideBar=true
  followers=0
  following=0
  constructor(private router: Router) {}



  getAccountPage(id: string): void {
    const userId = 'replace_with_actual_user_id'; // Get the user ID from your state
    if (userId === id) {
      this.router.navigate(['/myAccount']);
    } else {
      this.router.navigate(['/friendAccount',id]);
    }
  }
}
