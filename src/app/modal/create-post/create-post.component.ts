import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreatePostComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
