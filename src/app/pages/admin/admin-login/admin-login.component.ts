import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email: string = 'admin@gmail.com';
  password: string = '123';

  constructor(
    private _ds: DataService,
    private _us: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login(e) {
    let ue = e.target.email.value;
    let up = e.target.password.value;

    if (ue == this.email && up == this.password) {
      this._us.setLoggedin();
      this.router.navigateByUrl('admin-dashboard');
      
    }
  }
}
