import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  JOIN_CHATROOM_KEY = 'auth-chatroom';
  userData: any;
  loggedIn: boolean = true;


  constructor() {}


  isLoggedIn(): boolean {
    this.loggedIn = window.sessionStorage.getItem('user-login') == 'true' ? true : false;
    return this.loggedIn;
  }

  setLoggedin() {
    window.sessionStorage.setItem('user-login', 'true');
  }
  
  setLoggedOut() {
    window.sessionStorage.setItem('user-login', 'false');
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY,JSON.stringify(user));

  }

  saveJoinedUser(user: any): void {
    window.sessionStorage.removeItem(this.JOIN_CHATROOM_KEY);
    window.sessionStorage.setItem(this.JOIN_CHATROOM_KEY,JSON.stringify(user));
  }

  refreshUser(){
    window.sessionStorage.clear();
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if(user){
      return JSON.parse(user);
    }
    return {};
  }

  getUserChatRoom(): any {
    const user = window.sessionStorage.getItem(this.JOIN_CHATROOM_KEY);
    if(user){
      return JSON.parse(user);
    }
    return {};
  }

}
