import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-update-chatroom-request',
  templateUrl: './admin-update-chatroom-request.component.html',
  styleUrls: ['./admin-update-chatroom-request.component.css'],
})
export class AdminUpdateChatroomRequestComponent implements OnInit {
  selectedItemsList: any;
  unselectedItemsList: any;
  currentUser: any;
  isPopupOpened = false;

  constructor(
    private dialogRef: MatDialogRef<AdminUpdateChatroomRequestComponent>,
    private _us: UserService,
    private _cs: ChatService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectedItemsList = data.selected;
    this.unselectedItemsList = data.unselected;
  }

  ngOnInit() {
    this.currentUser = this._us.getUser();
  }

  async updateChatroom(e) {
    console.log('SELECTED ', this.selectedItemsList)
    console.log('UNSELECTED ', this.unselectedItemsList)
    if(this.selectedItemsList){
      this.selectedItemsList.map((x) => {
        let is_unauthorized_fld = x.is_unauthorized_fld;
    
        this._ds
          ._httpPutRequestById(`auth/${x.room_uid}`, { is_unauthorized_fld })
          .subscribe((res: any) => {
            this.ngOnInit();
          });
      });
      this.dialogRef.close();
    }

    if(this.unselectedItemsList){
      this.unselectedItemsList.map((x) => {
        let is_unauthorized_fld = x.is_unauthorized_fld;

        this._ds
          ._httpPutRequestById(`unauth/${x.room_uid}`, { is_unauthorized_fld })
          .subscribe((res: any) => {
            this.ngOnInit();
          });
      });

      this.dialogRef.close();
    }

  }



  cancelClick(): void {
    this.dialogRef.close();
  }
}
