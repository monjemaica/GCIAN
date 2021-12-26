import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { AdminEditFieldsComponent } from 'src/app/modal/admin-edit-fields/admin-edit-fields.component';
import { AdminViewPostsComponent } from 'src/app/modal/admin-view-posts/admin-view-posts.component';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css'],
})
export class AdminReportsComponent implements OnInit {
  reports=[];
  authors=[];
  parentSelector: boolean = false;
  term: any;

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
    // this.getStudent();
  }

  reloadData(){
    setTimeout(() => {
      this.getReports();
    }, 2000)
  }

  async getReports(){
    const find = await this._ds._httpGetRequest('reports').subscribe((res:any) => {
      this.reports=res
      console.log('report:', this.reports)
      // this.getStudent();
    });
  }

  // getStudent(){
  //   this.reports.map((x, index) => {
  //     this._ds._httpGetRequestById('students/', x[index].author).subscribe((res:any[]) => {
  //       this.authors.push(res)
  //       console.log('authors:', this.authors)
  //     })
  //   })
  // }

  isChecked(e){
    const id = e.target.value;
    const isViewed_fld = e.target.checked; //true or false
    
    this.reports.map((x) => {
      if(x.report_uid == id){
        this._ds._httpPostRequestById('reports/', x.report_uid, {isViewed_fld}).subscribe((res:any) => {
          console.log(res);
          this.ngOnInit();
        })
      }
      if(id == -1){
        const isViewed_fld = this.parentSelector;
        this._ds._httpPostRequestById('reports/', x.report_uid, {isViewed_fld}).subscribe((res:any) => {
          console.log(res);
          this.ngOnInit();
        })
      }
    })
  }

  logout() {
    this._us.setLoggedOut();
  }

  viewPost() {
    this.dialog.open(AdminViewPostsComponent);
  }
  
  // adminReportFields() {
  //   this.dialog.open(AdminEditFieldsComponent);
  // }
  
}
