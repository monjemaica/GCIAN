import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeletePostComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
