import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-view-posts',
  templateUrl: './admin-view-posts.component.html',
  styleUrls: ['./admin-view-posts.component.css'],
})
export class AdminViewPostsComponent implements OnInit {
  post: any;
  isPopupOpened = false;

  constructor(
    private dialogRef: MatDialogRef<AdminViewPostsComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.post = data;
  }

  showShortDesciption = true;

  ngOnInit() {
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

 
}
