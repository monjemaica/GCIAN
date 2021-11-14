import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/modal/change-password/change-password.component';
import { CreatePostComponent } from 'src/app/modal/create-post/create-post.component';
import { DeletePostComponent } from 'src/app/modal/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/modal/edit-post/edit-post.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog, private _us: UserService, private router: Router) {}

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  editPost() {
    this.dialog.open(EditPostComponent);
  }
  
  deletePost() {
    this.dialog.open(DeletePostComponent);
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  ngOnInit(): void {
  }

  test() {
    window.location.href="/"
  }

  logout(){
    this._us.setLoggedOut();
  }

}
