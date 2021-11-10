import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
import { PopUpComponent } from 'src/app/modal/pop-up/pop-up.component';
=======
import { EditComponent } from './edit/edit.component';
>>>>>>> 8589012075d6d71bfa6285d424e3de168aaf77eb

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

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PopUpComponent);
  }

  ngOnInit(): void {
  }
}

