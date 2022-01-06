import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppInfoComponent } from './modal/app-info/app-info.component';
import { CreatePostComponent } from './modal/posts/create-post/create-post.component';
import { Role } from './models/role';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GCIAN-web';
  private role: string;
  isLoggedIn = false;

  constructor(
    private _us: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this._us.getUser();
  }

  get isAdmin() {
    const user = this._us.getUser();
    this.role = user.role_fld;
    return user && this.role === Role.Admin;
  }

  get isUser(){
    const user = this._us.getUser();
    this.role = user.role_fld;
    return user && this.role === Role.User;
  }

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }
  chart() {}

  logout() {
    this._us.setLoggedOut();
    // this.router.navigateByUrl('/user-login');
  }
  logoutAdmin() {
    this._us.setLoggedOut();
    // this.router.navigateByUrl('/admin-login');
  }
}
