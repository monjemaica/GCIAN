import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-join-room',
  templateUrl: './user-join-room.component.html',
  styleUrls: ['./user-join-room.component.css'],
})
export class UserJoinRoomComponent implements OnInit {
  data: any;
  users: any;
  room: any;
  message: Array<{ user: String; message: String }> = [];
  currentUser: any;
  room_uid: any;
  members: any;
  left_members: any;

  isPopupOpened = false;

  constructor(
    private dialogRef: MatDialogRef<UserJoinRoomComponent>,
    private _us: UserService,
    private _cs: ChatService,
    private _ds: DataService,
    private _ss: SnackBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this._us.getUser();
    this.getMembers();
    this.getRooms();
  }

  ngOnDestroy() {
    this._cs.chatroom = this.data;
  }

  getMembers() {
    this._ds._httpPostRequestNoData('rooms/members').subscribe((res: any) => {
      this.members = res;
    });
  }

  getRooms() {
    this._ds._httpGetRequest('rooms').subscribe((res: any) => {
      this.room = res;
    });
  }

  async joinRoom(e) {
    let rname_fld = e.target.room.value;
    let users;
    let mname_fld = '';

    if (!this.currentUser.mname_fld && this.currentUser.mname_fld == null) {
      mname_fld = '';
    }

    this._ds._httpPostRequest('rooms', { rname_fld }).subscribe(
      (res: any) => {
        this.room_uid = res[0].room_uid;

        let data = {
          room_uid: this.room_uid,
          studid_fld: this.currentUser.studid_fld,
          user: `${this.currentUser.fname_fld} ${mname_fld} ${this.currentUser.lname_fld}`,
          rname_fld: e.target.room.value,
          avatar_fld: this.currentUser.avatar_fld,
        };

        this.data = data;

        // this._cs.emit('join',data);

        // save to local storage
        this._us.saveJoinedUser(data);

        this._cs.on('room-users', (data) => {
          (rname_fld = data.rname_fld), (users = data.users);
        });

        // check if it is authorized to join room
        let checkAuth = this.room.filter(
          (r) => r.room_uid === this.room_uid && r.is_unauthorized_fld === 1
        );

        if (checkAuth.length === 0) {
          this._ss.showNotification(
            'You are not yet authorized to enter the room. Please wait for the approval of admin.',
            null,
            'error'
          );
        } else {
          // check if duplicate added members
          let checkMembers = this.members.filter(
            (r) =>
              parseInt(r.room_uid) === this.room_uid &&
              r.studid_fld === this.currentUser.studid_fld
          );

          if (checkMembers.length === 0) {
            this._ds
              ._httpPostRequest('rooms/add_member', data)
              .subscribe((res: any) => {
                this._ds
                  ._httpPutRequestByIdNoData(
                    `rooms/join/${this.currentUser.studid_fld}`
                  )
                  .subscribe((res: any) => {
                    console.log('join Room');
                    this._cs.emit('join', data);
                    this.router.navigateByUrl('/chatroom/' + this.room_uid);
                    this._ss.showNotification('Enter room', null, 'success');
                  });
              });
          } else {
            console.log('already joined');
            this._ds
              ._httpPutRequestByIdNoData(
                `rooms/join/${this.currentUser.studid_fld}`
              )
              .subscribe((res: any) => {
                console.log('join Room');
                this._cs.emit('join', data);
                  this.router.navigateByUrl('/user-chatroom/'+ this.room_uid)
                this._ss.showNotification('Enter room', null, 'success');
              });
          }
        }
      },
      (err: any) => {
        this._ss.showNotification(
          'You have entered an invalid Room Name.',
          null,
          'error'
        );
      }
    );
  }

  // check if already joined

  //     let checkJoined = this.members.filter(
  //       (r) =>
  //         r.studid_fld === this.currentUser.studid_fld && r.is_left_fld === 1
  //     );

  //   }

  // check if duplicate added members
  // let checkMembers = this.members.filter((r) => r.studid_fld === this.currentUser.studid_fld);

  // if(checkMembers.length === 0){

  //   this._ds._httpPostRequest('rooms/add_member', data).subscribe((res:any) => {
  //     console.log('add new member ', res)
  //   })
  // }

  //check i the user has been joined to the group
  // let checkJoinedMembers = this.left_members.filter((r) => r.studid_fld === this.currentUser.studid_fld);
  // console.log('CHECK MEMBERS', checkJoinedMembers);
  // })

  // this.dialogRef.afterClosed().subscribe(result => {
  //   this.router.navigateByUrl('/user-chatroom/'+ this.room_uid)
  // });

  cancelClick(): void {
    this.dialogRef.close();
  }
}
