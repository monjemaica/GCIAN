import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { ChangePasswordComponent } from 'src/app/modal/change-password/change-password.component';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { DeletePostComponent } from 'src/app/modal/posts/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { WebcamImageComponent } from 'src/app/modal/webcam-image/webcam-image.component';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  posts: any;
  student: any;

  displayImg: any;
  filename: any;

  isPopupOpened = false;

  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private _sb: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student = this._us.getUser();
  }

  webcam() {
    this.dialog.open(WebcamImageComponent);
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  async selectedFile(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.displayImg = file;
      this.filename = file.name;
      console.log(this.filename);
    }

    let studid_fld = await this.student.studid_fld;
    const formData = new FormData();

    if (this.displayImg) {
      formData.append('avatar_fld', this.displayImg);
    }

    console.log(':TESTIMG: ', this.displayImg);

    this._ds._httpPutRequestById(`students/${studid_fld}/upload`, formData).subscribe((res:any) => {
      this._sb.showNotification('Uploaded Profile Photo!', null, 'success');
      this._ds._httpGetRequest(`students/${studid_fld}`).subscribe((res:any) => {
        console.log('student: ',res);
        this._us.saveUser(res);
        this.ngOnInit();
      })
      this.ngOnInit();
    })
  }

  logout() {
    this._us.setLoggedOut();
  }
}