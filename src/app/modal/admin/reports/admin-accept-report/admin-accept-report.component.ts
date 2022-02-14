import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-accept-report',
  templateUrl: './admin-accept-report.component.html',
  styleUrls: ['./admin-accept-report.component.css'],
})
export class AdminAcceptReportComponent implements OnInit {
  selectedItemsList: any;
  unselectedItemsList: any;
  currentUser: any;
  isPopupOpened = false;

  constructor(
    private dialogRef: MatDialogRef<AdminAcceptReportComponent>,
    private _us: UserService,
    private _cs: ChatService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedItemsList = data.selected;
    this.unselectedItemsList = data.unselected;
  }

  ngOnInit() {
    this.currentUser = this._us.getUser();
  }

  async updateChatroom(e) {
    if (this.selectedItemsList) {
      this.selectedItemsList.map((x) => {
        let isViewed_fld = x.isViewed_fld;

        this._ds
          ._httpPostRequestById('reports/', x.report_uid, { isViewed_fld })
          .subscribe((res: any) => {
            console.log(res);
            this.ngOnInit();
          });
      });
      this.dialogRef.close();
    }
    if (this.unselectedItemsList) {
      this.unselectedItemsList.map((x) => {
        let isViewed_fld = x.isViewed_fld;

        this._ds
          ._httpPostRequestById('noticed_reports/', x.report_uid, {
            isViewed_fld,
          })
          .subscribe((res: any) => {
            console.log(res);
            this.ngOnInit();
          });
      });
      this.dialogRef.close();
    }
  }

  cancelClick(): void {
    this.dialogRef.close();
  }
}
