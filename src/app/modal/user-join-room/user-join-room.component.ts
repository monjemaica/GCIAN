import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-join-room',
  templateUrl: './user-join-room.component.html',
  styleUrls: ['./user-join-room.component.css']
})
export class UserJoinRoomComponent implements OnInit {
  data:any;
  users: any;
  room:any
  message: Array<{user:String, message:String}> = [];
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
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this._us.getUser()
    this.getMembers();
    this.getLeftMembers();
  }

  ngOnDestroy() {
    this._cs.chatroom =  this.data
  }

  getMembers(){
    this._ds._httpPostRequestNoData('rooms/members').subscribe((res: any) => {
      this.members = res;
    });
  }
  getLeftMembers(){
    this._ds._httpPostRequestNoData('rooms/left_members').subscribe((res: any) => {
      this.left_members = res;
    });
  }

  

  async joinRoom(e){
    let rname_fld = e.target.room.value;
    let users;

   

    
    this._ds._httpPostRequest('rooms', { rname_fld }).subscribe((res: any) => {
      this.room_uid = res[0].room_uid

      let data = {
        room_uid: this.room_uid,
        studid_fld: this.currentUser.studid_fld,
        user: `${this.currentUser.fname_fld} ${this.currentUser.mname_fld} ${this.currentUser.lname_fld}`,
        rname_fld: e.target.room.value,
        avatar_fld: this.currentUser.avatar_fld
      };
  
      this.data = data;
  
      this._cs.emit('join',data);
  
      // save to local storage
      this._us.saveJoinedUser(data);

      this._cs.on('room-users',data => {
        (rname_fld = data.rname_fld), 
        (users = data.users)
      });

      // check if duplicate added members
      let checkMembers = this.members.filter((r) => r.studid_fld === this.currentUser.studid_fld);
    
      if(checkMembers.length === 0){
        
        this._ds._httpPostRequest('rooms/add_member', data).subscribe((res:any) => {
          console.log('add new member ', res)
        })
      }

      //check i the user has been joined to the group
      // let checkJoinedMembers = this.left_members.filter((r) => r.studid_fld === this.currentUser.studid_fld);
      // console.log('CHECK MEMBERS', checkJoinedMembers);
    })
    
    this.dialogRef.afterClosed().subscribe(result => {      
      this.router.navigateByUrl('/user-chatroom/'+ this.room_uid)
    });

  }

  cancelClick(): void {
    this.dialogRef.close();
  }
}