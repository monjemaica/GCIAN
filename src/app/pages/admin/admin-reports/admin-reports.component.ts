import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor(public dialog: MatDialog, private _us: UserService, private router: Router) {}

  showShortDesciption = true

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
}

  ngOnInit(): void {
  }

  logout(){
    this._us.setLoggedOut();
  }
}
