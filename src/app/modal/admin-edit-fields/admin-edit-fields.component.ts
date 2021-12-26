import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-edit-fields',
  templateUrl: './admin-edit-fields.component.html',
  styleUrls: ['./admin-edit-fields.component.css']
})
export class AdminEditFieldsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AdminEditFieldsComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
