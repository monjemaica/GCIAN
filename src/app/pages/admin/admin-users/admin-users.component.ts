import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminViewPostsComponent } from 'src/app/modal/admin/posts/admin-view-posts/admin-view-posts.component';
import { AdminRemoveUserComponent } from 'src/app/modal/admin/users/admin-remove-user/admin-remove-user.component';
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
  isPopupOpened: boolean = false
  
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

  removeUser(id){
    const dialogRef = this.dialog.open(AdminRemoveUserComponent,{
       data: id
     })
     dialogRef.afterClosed().subscribe((res) => {
       this.ngOnInit();
       this.isPopupOpened = false;
     });
   }

  logout() {
    this._us.setLoggedOut();
  }
}
