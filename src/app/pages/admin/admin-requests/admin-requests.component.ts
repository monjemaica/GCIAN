import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminProfileComponent } from 'src/app/modal/admin-profile/admin-profile.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  constructor(public dialog: MatDialog, private _us: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  profile() {
    this.dialog.open(AdminProfileComponent);
  }

  logout(){
    this._us.setLoggedOut();
  }

}
