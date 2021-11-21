import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit {
  comment: any;

  constructor(
    private dialogRef: MatDialogRef<DeleteCommentComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.comment =data
   }

  ngOnInit(): void {
  }

  deleteComment(e) {
    e.preventDefault();
    let comment_id = this.comment.comment_uid;

    this._ds._httpDeleteById('comment/', comment_id).subscribe((res: any) => {
      this.comment = res;
      this.dialogRef.close();
    }),
      (err: any) => {
        if (err.status == 401) {
          this._us.setLoggedOut();
          this.router.navigateByUrl('/');
        }
      };
  }

}
