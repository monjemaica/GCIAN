import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  email: string = 'test';
  password: string = '123';

  constructor(
    private _ds: DataService,
    private _us: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (this._us.isLoggedIn()) {
    //   this.router.navigateByUrl('/');
    // }
  }

  login(e) {
    let ue = e.target.email.value;
    let up = e.target.password.value;

    if (ue == this.email && up == this.password) {
      this._us.setLoggedin();
      this.router.navigateByUrl('/');
      
    }
  }
}
