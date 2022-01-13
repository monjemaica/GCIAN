import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserChatroomLeaveComponent } from 'src/app/modal/chat/user-chatroom-leave/user-chatroom-leave.component';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-chatroom',
  templateUrl: './user-chatroom.component.html',
  styleUrls: ['./user-chatroom.component.css']
})
export class UserChatroomComponent implements OnInit {
  messages: Array<{user:String, message:String, date:Date}> = []
  members: Array<{room:String, user:String}> = []

  currentUser :any ;
  data: any;
  room:any
  users:any
  newMsg = '';



  constructor(private _cs: ChatService, private _us: UserService, public dialog: MatDialog) 
  {}

  ngOnInit() {
    this.currentUser = this._us.getUser()
    this.getMessage();
    this.data = this._cs.chatroom

    console.log('room:', this.room);
    console.log('chatroom:', this.data);
  }


  getMessage(){
    this._cs.listen('new-user-joined').subscribe((res:any) => {
      this.messages.push(res)
      console.log('message: ', res)
    })
    this._cs.listen('left-room').subscribe((res:any)=> {
      this.messages.push(res)
      console.log('message: ', res)
    })
    this._cs.listen('new-message').subscribe((res:any)=> {
      this.messages.push(res)
      console.log('message: ', res)
    })
    this._cs.listen('room-users').subscribe((res:any)=> {
      this.members.push(res)
      console.log('members: ', this.members)
    })

    //get room
    let data = {
      user: this.data.user,
      room: this.data.room,
    }
    this._cs.on('room-users',({data}) => {
      this.users = data.user
      this.room = data.room
      console.log('room', this.room)
    });

  }


  sendMessage(e){
    console.log("chatroom", this.data)
    let data = {
      user: this.members[0].user,
      room: this.members[0].room,
      message: e.target.message.value
    }
    console.log('message: ', data);
    this._cs.emit('message', data);
  }
 
  leaveRoom(){
    this.dialog.open(UserChatroomLeaveComponent, {
      data: this.members[0]
    });
  }
}
