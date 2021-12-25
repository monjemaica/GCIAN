import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  students: any;
  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._ds._httpGetRequest('students').subscribe((res:any) => {
      this.students = res;
      console.log('students', res)
    })
  }

  logout() {
    this._us.setLoggedOut();
  }
}
