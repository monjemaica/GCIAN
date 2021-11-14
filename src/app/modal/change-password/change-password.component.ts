import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
