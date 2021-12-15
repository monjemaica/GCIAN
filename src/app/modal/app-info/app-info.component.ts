import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AppInfoComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}