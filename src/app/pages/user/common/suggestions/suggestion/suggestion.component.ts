import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interface';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent {
  @Input() user: User|null = null;
  sideBar=true

  constructor(private router: Router) {}

  getAccountPage(id: string): void {
    const userId = 'replace_with_actual_user_id'; // Get the user ID from your state
    if (userId === id) {
      this.router.navigate(['/myAccount']);
    } else {
      this.router.navigate(['/friendsAccount'], { state: { userId: id } });
    }
  }
}