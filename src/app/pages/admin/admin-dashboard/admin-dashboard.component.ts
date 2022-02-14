import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: any;
  totalPosts: any;
  totalReports: any;
  trends=[];
  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  showShortDesciption = true;

  
  ngOnInit() {
    this.chart();
    this.countUsers();
    this.countPosts();
    this.countReports();
    this.getTrends();
  }
  
  alterDescriptionText(id) {
    this.trends.map((x) => {
      if(x.post_uid == id){
        
        this.showShortDesciption = !this.showShortDesciption;
      }
    
      
    })
  }

  getTrends() {
    this._ds._httpPostRequestNoData('post/trends').subscribe((res: any[]) => {
      res.forEach((e, i) => this.trends.push(res[i]));
    });
  }


  countUsers(){
    this._ds._httpGetRequest('total_students').subscribe((res:any) => {
      this.totalUsers = res
    })
  }
  countPosts(){
    this._ds._httpGetRequest('total_posts').subscribe((res:any) => {
      this.totalPosts = res
    })
  }
  countReports(){
    this._ds._httpGetRequest('total_reports').subscribe((res:any) => {
      this.totalReports = res      
    })
  }

  chart() {
    const MONTHS = [ "Nov", "Dec","Jan", "Feb"];
      const myLinechart = new Chart('myChart', {
        type: "line",
        data: {
          labels: MONTHS,
          datasets: [
            {
              label: "CEAS",
              data: [0, 0, 0, 0],
              fill: false,
              borderColor: "rgb(3, 16, 247)",
              tension: 0.1,
            },
            {
              label: "CCS",
              data: [0, 1, 0, 0],
              fill: false,
              borderColor: "rgb(255, 138, 0)",
              tension: 0.1,
            },
            {
              label: "CBA",
              data: [0, 1, 0, 2],
              fill: false,
              borderColor: "rgb(253, 251, 0)",
              tension: 0.1,
            },
            {
              label: "CAHS",
              data: [0, 0, 0, 0],
              fill: false,
              borderColor: "rgb(252, 0, 0)",
              tension: 0.1,
            },
            {
              label: "CHTM",
              data: [1, 0, 1, 2],
              fill: false,
              borderColor: "rgb(255, 0, 128)",
              tension: 0.1,
            },
          ],
        },
        options: {
         
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      }); 
  }



  logout() {
    this._us.setLoggedOut();
  }
}
