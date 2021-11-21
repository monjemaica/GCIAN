import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AdminProfileComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
