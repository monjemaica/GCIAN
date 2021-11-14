import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // loggedIn: boolean = false;
  loggedIn: boolean = true;

  constructor() {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedin() {
    this.loggedIn = true;
  }

  setLoggedOut() {
    this.loggedIn = false;
  }
}
