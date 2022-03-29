import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-remove-user',
  templateUrl: './admin-remove-user.component.html',
  styleUrls: ['./admin-remove-user.component.css']
})
export class AdminRemoveUserComponent implements OnInit {
  studid: any;
  constructor(
    private dialogRef: MatDialogRef<AdminRemoveUserComponent>,
    private _us: UserService,
    private _ds: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.studid = data;
  }

  ngOnInit(): void {
    
  }

  removeUser() {
    console.log('studid', this.studid)
    this._ds._httpDeleteById('students/', this.studid).subscribe((res: any) => {
      this.dialogRef.close();
    }),
      (err: any) => {
        if (err.status == 401) {
          this._us.setLoggedOut();
          this.router.navigateByUrl('/');
        }
      };
  }
}
