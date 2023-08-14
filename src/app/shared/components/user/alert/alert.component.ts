import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();


  confirm(value:boolean){
    this.confirmed.emit(value)
  }

  
}
