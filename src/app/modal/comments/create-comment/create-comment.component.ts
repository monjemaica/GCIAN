import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent{

  constructor(private ds: DataService, private dialogRef: MatDialogRef<CreateCommentComponent>) { 
    dialogRef.disableClose = true;
  }

  getPosts(){
    this.ds._httpGetRequest('post').subscribe((res:any) => {
      console.log(res);
    })
  }

  doComment(e){
    console.log('test: ', e)
  }


}
