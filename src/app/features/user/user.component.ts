import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/stores/loading/loading.selectors';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="loding" *ngIf="isLoading; else content">
      <app-loading></app-loading>
    </div>

    <ng-template #content>
      <router-outlet ></router-outlet>
    </ng-template>
  `,
  })
export class UserComponent implements OnInit {

  isLoading = false

  isLoading$ = this.store.select(selectIsLoading);
  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.isLoading$.subscribe((isLoading) => {
    //   console.log(isLoading);
      
    //   this.isLoading=isLoading
    // });
  }
}

// isLoading$ = this.store.select(selectIsLoading);

// constructor(private store: Store) {}
// this.isLoading$.subscribe((isLoading) => {
//   const newLoadingValue = !isLoading;
//   this.store.dispatch(updateLoading({ isLoading: newLoadingValue }));
// });