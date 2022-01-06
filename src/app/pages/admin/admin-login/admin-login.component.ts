import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
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
    if(this.role == "admin"){
      this.isLoggedIn = true;
    }else if(this.role == "user"){
      this.router.navigateByUrl('/user-login');
    }

    if(this.isLoggedIn){
      this.router.navigateByUrl('/admin-dashboard');
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
    // let password_fld = e.target.password.value;
    let password_fld = 'GC_12345678';
    const user = this._us.getUser()
    


      this._ds._httpPostRequest('students/login', { email_fld, password_fld }).subscribe(
          (res: any) => {
            this._us.saveToken(res.token);
            this._us.saveUser(res.data);
            
            this.isLoggedIn = true;
  
            this._us.userData = res;
            this._us.setLoggedin();
            this.router.navigateByUrl('/admin-dashboard');
          },
          (err) => {
            this.errorMessage = err.error.message;
            this._as.error('Authentication Error: You are not authorized to access the admin page', 'options.autoClose');
            this.isLoginFailed = true;
          }
        );
   
    }
}
