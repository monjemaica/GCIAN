import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css'],
})
export class DeletePostComponent implements OnInit {
  post: any;
  constructor(
    private dialogRef: MatDialogRef<DeletePostComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.post = data;
  }

  ngOnInit(): void {
    console.log(this.post);
  }

  deletePost(e) {
    e.preventDefault();
    let post_id = this.post;

    this._ds._httpDeleteById('posts/', post_id).subscribe((res: any) => {
      this.post = res;
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
