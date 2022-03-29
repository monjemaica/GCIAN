import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { WebcamImageComponent } from '../../webcam-image/webcam-image.component';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post: any;
  posts: any;
  post_uid: any;
  comments:any;
  studid: any;
  trends: any;
  trend: any;
  displayImg: any;
  filename: any;

  constructor(
    private dialogRef: MatDialogRef<EditPostComponent>,
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private _sb: SnackBarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    dialogRef.disableClose = true;
    this.post = data;
  }

  ngOnInit(): void {
    this.studid = this._us.getUser();
    this.getTrends();
    console.log(this.post);
  }
  webcam() {
    this.dialog.open(WebcamImageComponent);
  }

  selectedFile(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.displayImg = file;
      this.filename = file.name;
      console.log(this.filename);
    }
  }

  getTrends() {
    this._ds._httpGetRequest('trends').subscribe((res: any) => {
      this.trends = res;
    });
  }

 async doEdit(e) {
    e.preventDefault();
    let post_uid = this.post.post_uid
    let content_fld = e.target.content.value;
    let studid_fld = await this.studid.studid_fld;
    let trends = await this.trends;
    let img_fld = await this.displayImg;
    const formData = new FormData();

    formData.append('studid_fld', studid_fld);
    formData.append('content_fld', content_fld);

    if (this.displayImg) {
      formData.append('img_fld', this.displayImg);
    }

    const getPost = await this._ds
      ._httpPutRequestById(`posts/${post_uid}`, formData)
      .toPromise()
      .then((res: any) => {
        this.posts = res;
        this._sb.showNotification('Post Updated!', null, 'success');
        this.dialogRef.close();
      });
    

    //find hashtag
    const result = content_fld
      .toLowerCase()
      .match(/#\w+/g)
      .map((v) => v.replace('#', ''));
    if (result) {
      result.forEach((content_fld) => {
        // check duplicate hashtag
        const checkHash = trends.filter((h) => h.content_fld === content_fld);
        
        if (checkHash.length === 0) {
          this._ds
            ._httpPostRequest('hashtag', { content_fld })
            .subscribe((res) => {
              this.trend = res;

              let hashtag_uid = this.trend.hashtag_uid;
              let post_uid = this.posts.post_uid;
              console.log('TEST', hashtag_uid, post_uid);
              this._ds
                ._httpPostRequest('hashtag_relation', { hashtag_uid, post_uid })
                .subscribe((res) => {
                  console.log(res);
                });
            });
        } else {
          let hashtag_uid = checkHash[0].hashtag_uid;
          let post_uid = this.posts.post_uid;
          
          this._ds
            ._httpPostRequest('hashtag_relation', { hashtag_uid, post_uid })
            .subscribe((res) => {
              console.log(res);
            });
        }
      })
    }
  }
}
