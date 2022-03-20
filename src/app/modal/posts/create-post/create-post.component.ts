import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { WebcamImageComponent } from 'src/app/modal/webcam-image/webcam-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  posts: any;
  studid: any;
  trends: any;
  trend: any;
  displayImg: any;
  filename: any;

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    public dialog: MatDialog,
    private _ds: DataService,
    private _us: UserService,
    private _sb: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studid = this._us.getUser();
    this.getTrends();
    console.log('img', this.displayImg);
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

  async doCompose(e) {
    e.preventDefault();
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
      ._httpPostRequest('posts/compose', formData)
      .toPromise()
      .then((res: any) => {
        this.posts = res;
        this._sb.showNotification('Posted Successfully!', null, 'success');
      });
    console.log(':post:', getPost);

    //find hashtag
    const result = content_fld
      .toLowerCase()
      .match(/#\w+/g)
      .map((v) => v.replace('#', ''));
    if (result) {
      result.forEach((content_fld) => {
        // check duplicate hashtag
        const checkHash = trends.filter((h) => h.content_fld === content_fld);
        console.log('chechHash', checkHash);
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
          console.log('TESTING DUPLICATE HASHTAG', hashtag_uid, post_uid);
          this._ds
            ._httpPostRequest('hashtag_relation', { hashtag_uid, post_uid })
            .subscribe((res) => {
              console.log(res);
            });
        }
      });
    }

    this.dialogRef.close();
  }

}
