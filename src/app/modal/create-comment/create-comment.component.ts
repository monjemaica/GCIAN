import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateCommentComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}