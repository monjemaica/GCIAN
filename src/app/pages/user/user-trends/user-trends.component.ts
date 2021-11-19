import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-trends',
  templateUrl: './user-trends.component.html',
  styleUrls: ['./user-trends.component.css']
})
export class UserTrendsComponent implements OnInit {
  isPopupOpened = false;

  constructor(public dialog: MatDialog, private _us: UserService, private router: Router) {}

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    })
  }

  ngOnInit(): void {
  }

  logout(){
    this._us.setLoggedOut();
  }

}