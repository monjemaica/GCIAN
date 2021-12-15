import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReportPostComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}