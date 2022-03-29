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
  totalNewUsers: any;
  totalCCSPost: any;
  totalCBAPost: any;
  totalCAHSPost: any;
  totalCHTMPost: any;
  totalCEASPost: any;
  trends=[];
  months=[];
  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  showShortDesciption = true;

  
  ngOnInit() {
    this.countUsers();
    this.countPosts();
    this.countReports();
    this.getTrends();
    this.countNewUsers();
    this.countCCSPost();
    this.countCBAPost();
    this.countCAHSPost();
    this.countCHTMPost();
    this.countCEASPost();
    setTimeout(() => {
      this.chart();
    }, 3000);

    
  }
  
  alterDescriptionText(id) {
    this.trends.map((x) => {
      if(x.post_uid == id){
        
        this.showShortDesciption = !this.showShortDesciption;
      }
    
      
    })
  }

  getTrends() {
    this._ds._httpGetRequest('total_trends').subscribe((res:any) => {
      this.trends = res
    })
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
  countNewUsers(){
    this._ds._httpGetRequest('num_new_users').subscribe((res:any) => {
      this.totalNewUsers = res    
    })
  }
 
  countCCSPost(){
    //new Date("2021-02-24T21:57:36.000Z").getMonth() + 1

    this._ds._httpGetRequest('total_CCS_post').subscribe((res:any) => {
      const ccs = res    
      this.totalCCSPost = ccs.map(ccs => {
        if(ccs.date_posted){
          const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = new Date(`${ccs.date_posted}`).getMonth();
          this.months.push(months[month]);
        }
        return ccs.num_posts
      })
      console.log('TEST CCS', this.totalCCSPost)
      console.log('=MONTS=', this.months)
    })
  } 
  countCBAPost(){
    this._ds._httpGetRequest('total_CBA_post').subscribe((res:any) => {
      const cba = res    
      this.totalCBAPost = cba.map(cba => {
        if(cba.date_posted){
          const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = new Date(`${cba.date_posted}`).getMonth();
          this.months.push(months[month]);
        }
        return cba.num_posts
      }) 
    })
  }
  countCAHSPost(){
    this._ds._httpGetRequest('total_CAHS_post').subscribe((res:any) => {
      const cahs = res    
      this.totalCAHSPost = cahs.map(cahs => {
        let date = cahs.date_posted
        console.log('total cahs', date)
        if(cahs.date_posted){
          const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = new Date(`${date}`).getMonth();
          this.months.push(months[month]);
        }
        return cahs.num_posts
      })
    })
  }
  countCHTMPost(){
    this._ds._httpGetRequest('total_CHTM_post').subscribe((res:any) => {
      const chtm = res    
      this.totalCHTMPost = chtm.map(chtm => {
        if(chtm.date_posted){
          const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = new Date(`${chtm.date_posted}`).getMonth();
          this.months.push(months[month]);
        }
        return chtm.num_posts
      }) 
    })
  }
  countCEASPost(){
    this._ds._httpGetRequest('total_CEAS_post').subscribe((res:any) => {
      const ceas = res    
      this.totalCEASPost = ceas.map(ceas => {
        if(ceas.date_posted){
          const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = new Date(`${ceas.date_posted}`).getMonth();
          this.months.push(months[month]);
        }
        return ceas.num_posts
      }) 
    })
  }



  chart() {
      const myLinechart = new Chart('myChart', {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "CEAS",
              data: this.totalCEASPost,
              fill: false,
              borderColor: "rgb(3, 16, 247)",
              tension: 0.1,
            },
            
            {
              label: "CCS",
              data: this.totalCCSPost,
              fill: false,
              borderColor: "rgb(255, 138, 0)",
              tension: 0.1,
            },
            {
              label: "CBA",
              data: this.totalCBAPost,
              fill: false,
              borderColor: "rgb(253, 251, 0)",
              tension: 0.1,
            },
            {
              label: "CAHS",
              data: this.totalCAHSPost,
              fill: false,
              borderColor: "rgb(252, 0, 0)",
              tension: 0.1,
            },
            {
              label: "CHTM",
              data: this.totalCHTMPost,
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
