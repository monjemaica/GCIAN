import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminProfileComponent } from 'src/app/modal/admin-profile/admin-profile.component';
import { UserService } from 'src/app/services/user.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private router: Router
  ) {}

  showShortDesciption = true;

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  ngOnInit() {
      const MONTHS = ["2018", "2019", "2020", "2021"];
      const myLinechart = new Chart('myChart', {
        type: "line",
        data: {
          labels: MONTHS,
          datasets: [
            {
              label: "Earnings Per Year Dataset",
              data: [65, 59, 80, 40],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
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

  chart() {}

  profile() {
    this.dialog.open(AdminProfileComponent);
  }

  logout() {
    this._us.setLoggedOut();
  }
}
