import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserChatroomComponent } from 'src/app/pages/user/user-chatroom/user-chatroom.component';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

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
    this._ds._httpGetRequest('rooms/members').subscribe((res: any) => {
      this.members = res;
      console.log("ALL ROOMS: ", this.members)
    });
  }

  async createRoom(e) {
    let rname_fld = e.target.room.value;
    let users;

    let checkRoom = this.room.filter((r) => r.rname_fld === rname_fld);


    if (checkRoom.length === 0) {
      this._ds._httpPostRequest('rooms/create_room', { rname_fld }).subscribe((res: any) => {
        
        let data = {
          room_uid: res.room_uid,
          studid_fld: this.currentUser.studid_fld,
          user: `${this.currentUser.fname_fld} ${this.currentUser.mname_fld} ${this.currentUser.lname_fld}`,
          rname_fld: e.target.room.value,
        };

        this.data = data;
        this.room_uid = data.room_uid;
        console.log("room_uid: ", this.room_uid)

        this._cs.emit('join', data);

        this._cs.on('room-users', (data) => {
          (rname_fld = data.room), (users = data.users);
        });

        let checkMembers = this.members.filter((r) => r.studid_fld === this.currentUser.studid_fld);
        console.log("CHECK MEMBERS: ", checkMembers);
        console.log("ALL ROOMS: ", this.members);

        if (checkMembers.length === 0) {
          console.log('data:', data);
          this._ds
            ._httpPostRequest('rooms/add_member', data)
            .subscribe((res: any) => {
              console.log('add new member ', res);
            });
        }

        this.dialogRef.afterClosed().subscribe((result) => {
          this.router.navigateByUrl('/user-chatroom/' + this.room_uid);
          console.log('The dialog was closed', this.room_uid);
        });
      });
      
    }else{
      this._ss.showNotification(`The '${rname_fld}' Room is already exist`, null, 'error');
    }
    
   
  }

  cancelClick(): void {
    this.dialogRef.close();
  }
}
