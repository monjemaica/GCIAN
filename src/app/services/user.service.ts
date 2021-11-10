import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn: boolean = false;

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    this.loggedIn = window.sessionStorage.getItem('user-login') == 'true' ? true : false;
    return this.loggedIn;
  }

  setLoggedin() {
    window.sessionStorage.setItem('user-login', 'true');
  }
  
  setLoggedOut() {
    window.sessionStorage.setItem('user-login', 'false');
  }
}
