import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post: any;
  post_uid: any;
  comments:any;

  constructor(
    private dialogRef: MatDialogRef<EditPostComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.post = data;
  }

  ngOnInit(): void {
    // this.getPostId(this.route.snapshot.params.id);
    // console.log('id: ', this.route.snapshot.params.id)
    console.log(this.post);
  }

  doEdit(e) {
    e.preventDefault();
    let content_fld = e.target.content.value;
    let post_id = this.post.post_uid;
    console.log('test edit: ', post_id, content_fld);

      this._ds._httpPostRequestById('posts/', post_id, {content_fld}).subscribe((res:any) => {
        this.post = res
        this.dialogRef.close();
      }),(err:any) => {
        if(err.status == 401){
          this._us.setLoggedOut();
          this.router.navigateByUrl('/');
        }
      }
  }
}
