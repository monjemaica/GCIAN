import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css'],
})
export class ReportPostComponent implements OnInit {
  student: any;
  post: any;
  concern: any;
  constructor(
    private dialogRef: MatDialogRef<ReportPostComponent>,
    private _us: UserService,
    private _ds: DataService,
    private _ss: SnackBarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    dialogRef.disableClose = true;
    this.post = data;
  }

  ngOnInit(): void {
    this.student = this._us.getUser();
    console.log(this.post);
  }

  async doReport(e) {
    let post_uid = await this.post.post_uid;
    let data = {
      studid_fld: this.student.studid_fld,
      concern_fld: this.concern,
      content_fld: e.target.content.value,
    };
    console.log('report: ', data);
    this._ds
      ._httpPostRequest(`reports/create/${post_uid}`, data)
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigateByUrl('/');
        this.dialogRef.close();
        this._ss.showNotification( `${this.post.fname_fld} ${this.post.mname_fld} ${this.post.lname_fld}'s Post Reported \n Thank you for letting us know.`, 'OK', 'success');
      }),(err:any) => {
        if(err.status == 401){
          this._us.setLoggedOut();
          this.router.navigateByUrl('/');
        }
      }
  }
}
