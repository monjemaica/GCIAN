import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-request-room-success',
  templateUrl: './user-request-room-success.component.html',
  styleUrls: ['./user-request-room-success.component.css']
})
export class UserRequestRoomSuccessComponent implements OnInit {
  
  constructor(
    private dialogRef: MatDialogRef<UserRequestRoomSuccessComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
  
   }

  ngOnInit(): void {
    
  }

}
