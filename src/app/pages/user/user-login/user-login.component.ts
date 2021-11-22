import { HttpHeaders } from '@angular/common/http';
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
  userData: any;

  form: any = {
    email_fld: null,
    password_fld: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private _ds: DataService,
    private _us: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const hasToken = (token) => {
      token = this._us.getToken()
        ? this.isLoggedIn == true
        : this.isLoggedIn == true;
    };
  }


  login(e) {
    e.preventDefault();
    let email_fld = e.target.email.value;
    let password_fld = e.target.password.value;

    this._ds._httpPostRequest('students/login', { email_fld, password_fld }).subscribe(
        (res: any) => {
          this._us.saveToken(res.token);
          this._us.saveUser(res.data);

          this.isLoggedIn = true;
          this.isLoginFailed = false;

          this._us.userData = res;
          this._us.setLoggedin();
          this.router.navigateByUrl('/');
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }
}
