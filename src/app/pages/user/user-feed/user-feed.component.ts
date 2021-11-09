import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';

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

  constructor() { }

  ngOnInit(): void {
  }
}

