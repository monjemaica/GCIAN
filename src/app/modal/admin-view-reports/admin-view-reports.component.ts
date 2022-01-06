import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-view-reports',
  templateUrl: './admin-view-reports.component.html',
  styleUrls: ['./admin-view-reports.component.css']
})
export class AdminViewReportsComponent implements OnInit {
  post:any;

  constructor(
    private dialogRef: MatDialogRef<AdminViewReportsComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.post = data;
   }


  ngOnInit(): void {
    console.log('postid', this.post.post_uid)
  }

  

}
