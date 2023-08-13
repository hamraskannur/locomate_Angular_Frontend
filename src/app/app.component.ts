import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from './stores/loading/loading.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'client';
  
}
