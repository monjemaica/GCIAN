import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/modal/pop-up/pop-up.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  constructor(public dialog: MatDialog, private _us: UserService, private router: Router) {}

  openDialog() {
    this.dialog.open(PopUpComponent);
  }

  ngOnInit(): void {
  }
  
  logout(){
    this._us.setLoggedOut();
  }

}
