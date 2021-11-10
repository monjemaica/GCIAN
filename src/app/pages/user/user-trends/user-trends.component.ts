import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/modal/pop-up/pop-up.component';

@Component({
  selector: 'app-user-trends',
  templateUrl: './user-trends.component.html',
  styleUrls: ['./user-trends.component.css']
})
export class UserTrendsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PopUpComponent);
  }

  ngOnInit(): void {
  }

}