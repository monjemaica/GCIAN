import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserChatroomComponent } from 'src/app/pages/user/user-chatroom/user-chatroom.component';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create-room',
  templateUrl: './user-create-room.component.html',
  styleUrls: ['./user-create-room.component.css']
})
export class UserCreateRoomComponent implements OnInit, OnDestroy {
  data:any;
  users: any;
  room:any
  message: Array<{user:String, message:String}> = [];
  currentUser: any;

  isPopupOpened = false;

  constructor(
    private dialogRef: MatDialogRef<UserCreateRoomComponent>,
    private _us: UserService,
    private _cs: ChatService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this._us.getUser()
    console.log('user:', this.currentUser.fname_fld);
  }

  ngOnDestroy() {
    this._cs.chatroom =  this.data
    console.log('data: ', this._cs.chatroom)
  }

  async createRoom(e){
    let room;
    let users;
    let data = {
      user : this.currentUser.fname_fld,
      room : e.target.room.value
    }
    this.data = data;
    this._cs.emit('join',data);
    this._cs.on('room-users',data => {
      room = data.room
      users = data.users
      console.log('room', this.room)
    });
    
    this.dialogRef.close();
    this.router.navigateByUrl('/user-chatroom')

  }
}
