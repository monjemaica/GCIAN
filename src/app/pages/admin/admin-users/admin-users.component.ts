import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminViewPostsComponent } from 'src/app/modal/admin/posts/admin-view-posts/admin-view-posts.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  students: any;
  term:any;
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

  viewPost() {
    this.dialog.open(AdminViewPostsComponent);
  }

  logout() {
    this._us.setLoggedOut();
  }
}
