import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { ChangePasswordComponent } from 'src/app/modal/change-password/change-password.component';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { DeletePostComponent } from 'src/app/modal/posts/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css'],
})
export class UserChatComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private router: Router
  ) {}

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

  ngOnInit(): void {}

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }

  logout() {
    this._us.setLoggedOut();
  }
}