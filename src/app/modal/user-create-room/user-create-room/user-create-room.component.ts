import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserChatroomComponent } from 'src/app/pages/user/user-chatroom/user-chatroom.component';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { UserRequestRoomSuccessComponent } from '../../chat/user-request-room-success/user-request-room-success.component';

@Component({
  selector: 'app-user-create-room',
  templateUrl: './user-create-room.component.html',
  styleUrls: ['./user-create-room.component.css'],
})
export class UserCreateRoomComponent implements OnInit, OnDestroy {
  data: any;
  users: any;
  room: any;
  message: Array<{ user: String; message: String }> = [];
  currentUser: any;
  room_uid: any;
  members: any;

  isPopupOpened = false;

  constructor(
    private dialogRef: MatDialogRef<UserCreateRoomComponent>,
    private dialog: MatDialog,
    private _us: UserService,
    private _cs: ChatService,
    private _ds: DataService,
    private _ss: SnackBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this._us.getUser();
    this.getRooms();
    this.getMembers();
  }

  ngOnDestroy() {
    this._cs.chatroom = this.data;
  }

  getRooms() {
    this._ds._httpGetRequest('rooms').subscribe((res: any) => {
      this.room = res;
    });
  }

  getMembers(){
    this._ds._httpPostRequestNoData('rooms/members').subscribe((res: any) => {
      this.members = res;
      console.log("ALL ROOMS: ", this.members)
    });
  }

  async createRoom(e) {

    if(!this.currentUser.mname_fld){
      this.currentUser.mname_fld = ""
    }

    let rname = e.target.room.value
    
    let data = {
      rname_fld : rname.toLowerCase(),
      objective_fld : e.target.objective.value,
      requested_by_fld : `${this.currentUser.fname_fld} ${this.currentUser.mname_fld} ${this.currentUser.lname_fld}`
    }
    console.log('rname:', data.rname_fld)
    let room = await this.room

    if(this.room){
      let checkRoom = room.filter((r) => r.rname_fld === data.rname_fld);
  
      console.log('check room', checkRoom);
  
      if (checkRoom.length === 0 || !this.room) {
        this._ds
          ._httpPostRequest('rooms/create_room', data)
          .subscribe((res: any) => {
            let checkMembers = this.members.filter(
              (r) => r.studid_fld === this.currentUser.studid_fld
            );
            console.log('CHECK MEMBERS: ', checkMembers);
            console.log('ALL ROOMS: ', this.members);
            });
            // create dialog
            const dialogRef = this.dialog.open(UserRequestRoomSuccessComponent,
              {width: '850px', height:'650px', data: data  }
              );
            
            dialogRef.afterClosed().subscribe(res => {
              this.ngOnInit();
              this.isPopupOpened = false;
            });
      
  
      } else {
        this._ss.showNotification(`The '${data.rname_fld}' Room is already exist`, null, 'error');
      }
    }
  }

  cancelClick(): void {
    this.dialogRef.close();
  }
}
