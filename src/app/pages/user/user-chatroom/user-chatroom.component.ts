import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserChatroomLeaveComponent } from 'src/app/modal/chat/user-chatroom-leave/user-chatroom-leave.component';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-chatroom',
  templateUrl: './user-chatroom.component.html',
  styleUrls: ['./user-chatroom.component.css'],
})
export class UserChatroomComponent implements OnInit {
  messages: any[] = [];
  message_notif: any[] = [];
  members: any;
  currentUser: any;
  data: any;
  room: any;
  users: any;
  newMsg: any;
  room_uid: any;
  groups: any;
  roomName: any;

  constructor(
    private _cs: ChatService,
    private _us: UserService,
    private _ds: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.data = this._cs.chatroom;
    this.room_uid = this.route.snapshot.paramMap.get('id');
    this.currentUser = this._us.getUser();
    console.log("TESTING CHATROOM DATA", this.data)
    this.getMessage();
    this.getMembers();
    this.getGroups();
    this.getRoomName();
  }

  async getRoomName(){
    let room_uid = await this.room_uid;
    this._ds._httpGetRequest(`rooms/${room_uid}`).subscribe((res:any) => {
      this.roomName = res
      console.log('TEST ROOMNAME', res);
    })
  }

  async getGroups(){
    let data = await {
      studid_fld :  this.currentUser.studid_fld
    }
    console.log('studid:', data)
    this._ds._httpPostRequest(`rooms/groups/${this.room_uid}`, data).subscribe((res:any) => {
      this.groups = res;
    })
  }

  async getMembers() {
    let room_uid = await this.room_uid
    this._ds
      ._httpGetRequestById('rooms/members/', room_uid)
      .subscribe((res: any) => {
        this.members = res;
      });
  }

  getMessage() {
    this._cs.listen('new-user-joined').subscribe((res: any) => {
      this.messages.push(res);
      console.log('new user joined: ', res);
    });
    this._cs.listen('left-room').subscribe((res: any) => {
      this.messages.push(res);
      console.log('left room: ', res);
    });
    this._cs.listen('new-message').subscribe((res: any) => {
      this.messages.push(res);
      console.log('MESSGAGE TESTING: ', res);
    });

    //get room
    let data = {
      user: this.data.user,
      room: this.data.rname_fld,
    };

    this._cs.on('room-users', ({ data }) => {
      this.users = data.user;
      this.room = data.rname_fld;
      console.log('room', this.room);
    });
  }

  sendMessage(e) {
    let data = {
      studid_fld: this.currentUser.studid_fld,
      room_uid: this.data.room_uid,
      user: this.data.user,
      room: this.data.rname_fld,
      message_fld: e.target.message.value
    };

    let rname_fld = this.data.rname_fld;

    console.log('message: ', data);
    this._cs.emit('message', data);


    // let data2 = {
    //   studid_fld: this.currentUser.studid_fld,
    //   message_fld: e.target.message.value
    // }

    // this._ds._httpPostRequest(`rooms/message/${this.room_uid}`, data2).subscribe((res: any) => {
    //   this.newMsg.push(res);
    //   console.log('=test= ', res)
    // })
    console.log('MESSAGE',this.messages)

  }

  // showMembers(){
  //   let data = {
  //     room: this.data.room,
  //     data: this.members[0]
  //   }
  //   this._cs.emit('members', data);

  // }

  leaveRoom() {
    this.dialog.open(UserChatroomLeaveComponent, {
      data: { data: this.data, studid_fld: this.currentUser.studid_fld },
    });
  }
}
