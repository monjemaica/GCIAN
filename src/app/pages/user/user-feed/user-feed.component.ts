import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateCommentComponent } from 'src/app/modal/create-comment/create-comment.component';
import { CreatePostComponent } from 'src/app/modal/create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent {

  // constructor(public dialog: MatDialog) { }

  // open() {
  //   const dialogRef = this.dialog.open(EditComponent);
  // }

  constructor(public dialog: MatDialog, private _us: UserService, private router: Router) {}

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  comment() {
    this.dialog.open(CreateCommentComponent);
  }

  ngOnInit(): void {
  }
  
  logout(){
    this._us.setLoggedOut();
  }

}