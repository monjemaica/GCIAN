import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-chatroom-leave',
  templateUrl: './user-chatroom-leave.component.html',
  styleUrls: ['./user-chatroom-leave.component.css'],
})
export class UserChatroomLeaveComponent implements OnInit {
  data: any;

  constructor(
    private dialogRef: MatDialogRef<UserChatroomLeaveComponent>,
    private _cs: ChatService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit(): void {}

  leaveRoom() {
    this._cs.emit('leave', this.data.data);

    this._ds._httpPostRequestNoData(`rooms/leave/${this.data.studid_fld}`).subscribe((res:any) => {
      console.log('leave the room')
    })
    this.dialogRef.close();
    this.router.navigateByUrl('/user-chat');
  }

}
