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
  oldMsg: any[] = [];
  newMsg: any[] = [];
  message_notif: any[] = [];

  members: any;
  currentUser: any;
  data: any;
  room: any;
  users: any;
  room_uid: any;
  groups: any;
  roomName: any;

  chatHead: string;
  countMembers: any;

  constructor(
    private _cs: ChatService,
    private _us: UserService,
    private _ds: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.data = this._us.getUserChatRoom();
    this.room_uid = this.route.snapshot.paramMap.get('id');
    this.currentUser = this._us.getUser();
    console.log("TESTING CHATROOM DATA", this.data)

    this.getMessage();
    this.getMembers();
    this.getGroups();
    this.getRoomName();
    // this.joinRoom();
    this.getInitialMessage();
  }


  async getInitialMessage(){
    let room_uid = await this.room_uid;

    this._ds._httpPostRequestNoData(`room/message?room_uid=${room_uid}`).subscribe((res: any) => {
      this.oldMsg = res
      console.log('MESSGAGE TESTING OLD: ', this.oldMsg);
    })
  }

  async getRoomName(){
    let room_uid = await this.room_uid;
    this._ds._httpGetRequest(`rooms/${room_uid}`).subscribe((res:any) => {
      this.roomName = res.rname_fld
      this.chatHead= this.roomName.charAt(0);
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
        this.countMembers = this.members.length
      });
  }

  // async joinRoom(){
  //   let rname_fld = await this.roomName;

  //     let data ={
  //       room_uid: this.data.room_uid,
  //       studid_fld: this.currentUser.studid_fld,
  //       user: `${this.currentUser.fname_fld} ${this.currentUser.mname_fld} ${this.currentUser.lname_fld}`,
  //       rname_fld: this.data.rname_fld,
  //       avatar_fld: this.data.avatar_fld
  //     }

      // this._cs.emit('join',data);
      
  // }

  getMessage() {
    this._cs.listen('new-user-joined').subscribe((res: any) => {
      this.newMsg.push(res);
      console.log('new user joined: ', res);
    });
    this._cs.listen('left-room').subscribe((res: any) => {
      this.newMsg.push(res);
      console.log('left room: ', res);
    });
    this._cs.listen('new-message').subscribe((res: any) => {
      this.newMsg.push(res);
      console.log('MESSGAGE TESTING: ', res);
    });
  }

  sendMessage(e) {
    let data = {
      studid_fld: this.currentUser.studid_fld,
      room_uid: this.data.room_uid,
      user: this.data.user,
      room: this.data.rname_fld,
      message_fld: e.target.message.value,
      avatar_fld: this.data.avatar_fld
    };

    console.log('message: ', data);
    this._cs.emit('message', data);


    let data2 = {
      studid_fld: this.currentUser.studid_fld,
      message_fld: e.target.message.value
    }

    this._ds._httpPostRequest(`rooms/message/${this.room_uid}`, data2).subscribe((res: any) => {
      console.log('=test= ', res)
    })
    console.log('MESSAGE',this.newMsg)

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
