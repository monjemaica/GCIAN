import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { AdminUpdateChatroomRequestComponent } from 'src/app/modal/admin/users/admin-update-chatroom-request/admin-update-chatroom-request.component';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css'],
})
export class AdminRequestsComponent implements OnInit {
  selectedItemsList = [];
  unselectedItemsList = [];
  checkUnselect = [];
  checkSelect = [];
  parentSelector: boolean = false;
  parentSelectorAuth: boolean = true;

  rooms = [];
  unauthorized = [];
  authorized = [];
  term:any;

  isPopupOpened = false;

  constructor(
    private _us: UserService,
    private _ds: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.getAuthorized();
    this.getUnauthorized();
    // setTimeout(() => {
    //   this.fetchSeletedUnauthorized();
    //   this.fetchSeletedAuthorized();
      // this.fetchCheckedIDs();
    // }, 5000);
  }

  getRooms() {
    this._ds._httpGetRequest('rooms').subscribe((res: any) => {
      this.rooms = res;
    });
  }

  getUnauthorized() {
    this._ds._httpGetRequest('unauthorized').subscribe((res: any) => {
      this.unauthorized = res;
    });
  }

  getAuthorized() {
    this._ds._httpGetRequest('authorized').subscribe((res: any) => {
      this.authorized = res;
    });
  }

  //unauthorized
  changeSelection() {
     this.fetchSeletedUnauthorized();
  }

  fetchSeletedUnauthorized() {
    this.unselectedItemsList = [];
    this.checkUnselect = this.unauthorized.filter((r) => {
      if (!!r.is_unauthorized_fld === false) {
        this.unselectedItemsList.push(r);
      }

      return !!r.is_unauthorized_fld;
    });
    console.table(this.unselectedItemsList);
  }
  
  // authorized
  changeSelectionAuth() {
    this.fetchSeletedAuthorized();
  }
  
  fetchSeletedAuthorized() {
  this.selectedItemsList = [];
    this.checkSelect = this.authorized.filter((r) => {
      if(!!r.is_unauthorized_fld === true){
        this.selectedItemsList.push(r);
      }
      return this.checkSelect;
    });
    console.table(this.selectedItemsList);
  }
  
  doUpdate() {
    const dialogRef = this.dialog.open(AdminUpdateChatroomRequestComponent, {
      data: {
        selected: this.selectedItemsList,
        unselected: this.unselectedItemsList,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.reload();
      console.log('CLOSE'); 
      this.isPopupOpened = false;
    });
  }

  reload(){
    this.selectedItemsList = [];
    this.unselectedItemsList = [];
    this.ngOnInit();
  }

  logout() {
    this._us.setLoggedOut();
  }

  // isChecked(e) {
  //   console.log('check :', this.selectedItemsList)
  //   const id = e.target.value;
  //   if (this.unauthorized)
  //   this.selectedItemsList = this.unauthorized.map((x) => {
  //     if (id == -1) {
  //       x.is_unauthorized_fld = this.parentSelector;
  //       return x;
  //     } 
  //   });
  // }
}
