import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  comment:any;
  comment_uid: any;

  constructor(private dialogRef: MatDialogRef<EditCommentComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ){
      this.comment = data
  }

  ngOnInit(): void {
    console.log(this.comment)
  }

  doEdit(e) {
    e.preventDefault();
    let content_fld = e.target.content.value;
    let comment_uid = this.comment.comment_uid;
    console.log('test edit: ', comment_uid, content_fld);
    
    this._ds._httpPostRequestById('comment/', comment_uid, {content_fld}).subscribe((res:any) => {
      this.comment = res
        this.dialogRef.close();
      }),(err:any) => {
        if(err.status == 401){
          this._us.setLoggedOut();
          this.router.navigateByUrl('/');
        }
      }
  }

}
