import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor( private router: Router) { }
  canActivate() {
    const isLoggedIn =localStorage.getItem("token")
    
    if (isLoggedIn) {
      console.log(isLoggedIn);
      
      return this.router.navigate(['/']);
    } else {
      return true;
    }
  }

}
