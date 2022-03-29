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

  selectedItemsList = [];
  checkSelect = [];
  unselectedItemsList = [];
  checkUnselect = [];
  close: boolean;
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
        console.table(this.ignored);
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

  //ignored
  changeSelectionIgnored(){
    this.fetchSelectedIgnored();
  }

  fetchSelectedIgnored(){
    this.selectedItemsList = [];
    this.checkSelect = this.ignored.filter((r) => {
      if(!!r.isViewed_fld === true){
        this.selectedItemsList.push(r);
        console.log('=TESTING= ', r)
      }
      return this.checkSelect;
    });
  }

  //noticed
  changeSelectionNoticed() {
     this.fetchSeletedUnauthorized();
  }

  fetchSeletedUnauthorized() {
    this.unselectedItemsList = [];
    this.checkUnselect = this.noticed.filter((r) => {
      if (!!r.isViewed_fld === false) {
        this.unselectedItemsList.push(r);
      }

      return this.checkUnselect;
    });
    console.table(this.unselectedItemsList);
  }

  doUpdate() {
    const dialogRef = this.dialog.open(AdminAcceptReportComponent, {
      data: {selected: this.selectedItemsList, unselected: this.unselectedItemsList}
      ,
    });
    dialogRef.afterClosed().subscribe((res) => {
      
      this.reload();
      this.isPopupOpened = false;
    });
  }

  reload(){
    this.unselectedItemsList = [];
    this.selectedItemsList = [];
    this.ngOnInit();
  }

  logout() {
    this._us.setLoggedOut();
  }
}
