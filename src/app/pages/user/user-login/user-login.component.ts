import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  registrationForm: FormGroup;
  currentPassword: boolean;
  userData: any;
  role: any;

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
    private _as: AlertService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initRegForm();

    const user = this._us.getUser();
    this.role = user.role_fld;
    if(this.role == "user"){
      this.isLoggedIn = true;
    }else if(this.role == "admin"){
      this.router.navigateByUrl('/admin-login');
    }

    if(this.isLoggedIn){
      this.router.navigateByUrl('/user-feed');
    }
    console.log(this.isLoggedIn)
  }
  

  initRegForm() {
    this.registrationForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required],
    });
  }

  togglecurrentPassword() {
    this.currentPassword = !this.currentPassword;
  }

  login(e) {
    e.preventDefault();
    let email_fld = e.target.email.value;
    let password_fld = "GC_123456789";

    

      this._ds._httpPostRequest('students/login', { email_fld, password_fld }).subscribe(
          (res: any) => {
            this._us.saveToken(res.token);
            this._us.saveUser(res.data);
  
            this.isLoggedIn = true;
  
            this._us.userData = res;
            this._us.setLoggedin();
            this.router.navigateByUrl('/');
          },
          (err) => {
            this.errorMessage = err.error.message;
            this._as.error(this.errorMessage);
            this.isLoginFailed = true;
          }
        );
    }
   
}
