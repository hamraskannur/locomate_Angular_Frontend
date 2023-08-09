import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() setSearchInput: EventEmitter<string> = new EventEmitter<string>();
  searchInput=''

  handleInputChange(newValue: string): void {
    this.setSearchInput.emit(newValue); // Call the passed function
  }
}
