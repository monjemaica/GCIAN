import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditPostComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
