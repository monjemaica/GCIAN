import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { AdminViewPostsComponent } from 'src/app/modal/admin/posts/admin-view-posts/admin-view-posts.component';
import { AdminViewReportsComponent } from 'src/app/modal/admin/reports/admin-view-reports/admin-view-reports.component';
import { AdminAcceptReportComponent } from 'src/app/modal/admin/reports/admin-accept-report/admin-accept-report.component';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css'],
})
export class AdminReportsComponent implements OnInit {
  reports = [];
  noticed = [];
  ignored = [];
  authors = [];
  uniqueNoticed = [];
  uniqueIgnored = [];
  selectedReports = [];
  parentSelector: boolean = false;
  term: any;
  isPopupOpened = false;


  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  showShortDesciption = true;

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  ngOnInit(): void {
    this.getReports();
    this.getNoticed();
    this.getIgnored();
  }

  async getReports() {
    const find = await this._ds
      ._httpGetRequest('reports')
      .subscribe((res: any) => {
        this.reports = res;
      });
  }

  async getIgnored() {
    const find = await this._ds
      ._httpGetRequest('ignored_reports')
      .subscribe((res: any) => {
        this.ignored = res;
      });
  }

  async getNoticed() {
    const find = await this._ds
      ._httpGetRequest('noticed_reports')
      .subscribe((res: any) => {
        this.noticed = res;
      });
  }

  viewPost(id: number) {
    console.log('id:', id);
    let post = this.reports.find((x) => x.report_uid === id);
    console.log('post', post);
    this.dialog.open(AdminViewReportsComponent, {
      data: post,
      width: '800px',
      height: '500px',
    });
  }

  isCheckedG(e) {
    const id = e.target.value;
    const isViewed_fld = e.target.checked; //true or false
    this.uniqueIgnored = [...new Set(this.selectedReports)];

    this.ignored.map((x) => {
      if (x.report_uid == id) {
        this.selectedReports.push(x);
        console.log('test:', this.selectedReports);
        console.log('test:', this.uniqueIgnored);
        
      }

      if (id == -1) {
        const isViewed_fld = this.parentSelector;
        this._ds
          ._httpPostRequestById('reports/', x.report_uid, { isViewed_fld })
          .subscribe((res: any) => {
            console.log(res);
            this.ngOnInit();
          });
      }
    });
  }

  isChecked(e) {
    const id = e.target.value;
    const isViewed_fld = e.target.checked; //true or false
    this.uniqueNoticed = [...new Set(this.selectedReports)];
    this.noticed.map((x) => {
      if (x.report_uid == id) {
        this.selectedReports.push(x);
        console.log('test:', this.selectedReports);
        console.log('test:', this.uniqueNoticed);
        // this._ds._httpPostRequestById('reports/', x.report_uid, {isViewed_fld}).subscribe((res:any) => {
        //   console.log(res);
        //   this.ngOnInit();
        // })
        return x;
      }

      if (id == -1) {
        const isViewed_fld = this.parentSelector;
        this._ds
          ._httpPostRequestById('noticed_reports/', x.report_uid, { isViewed_fld })
          .subscribe((res: any) => {
            console.log(res);
            this.ngOnInit();
          });
      }
    });
  }

  doUpdate() {
    const dialogRef = this.dialog.open(AdminAcceptReportComponent, {
      data: {selected: this.uniqueIgnored, unselected: this.uniqueNoticed}
      ,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
      this.isPopupOpened = false;
    });
  }
  logout() {
    this._us.setLoggedOut();
  }
}
