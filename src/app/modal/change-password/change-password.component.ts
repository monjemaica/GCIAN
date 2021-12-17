import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}


// import { Component, Inject, OnInit } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { DataService } from 'src/app/services/data.service';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-change-password',
//   templateUrl: './change-password.component.html',
//   styleUrls: ['./change-password.component.css']
// })
// export class ChangePasswordComponent implements OnInit {
//   student: any;
//   alert_msg: string;

//   constructor(
//     private dialogRef: MatDialogRef<ChangePasswordComponent>,
//     private _us: UserService,
//     private _ds: DataService,
//     private router: Router,
//     @Inject(MAT_DIALOG_DATA) data
//     ) {
//       this.student = data;
//       dialogRef.disableClose = true; 
//   }

//   ngOnInit(): void {
//     console.log('test student: ',this.student);
//   }

//   doChangePass(e){
//     e.preventDefault();
//     let password_fld = e.target.password.value;
//     let n_password_fld = e.target.n_password.value;
//     let c_password = e.target.c_password.value;
//     let studid_fld = this.student.studid_fld;

//     console.log('test npass: ',n_password_fld);
//     console.log('test npass: ',c_password);
//     if(n_password_fld != c_password){
//       this.alert_msg = "Please make sure your passwords match."
//     }else{
//       this._ds._httpPostRequest(`students/${studid_fld}/check_pass`, {password_fld, n_password_fld}).subscribe((res:any) => {
//         console.log('test changepass: ', res);
//         this.alert_msg = 'Password Updated!'
//       },(err:any) => {
//         if(err.status == 401){
//           this._us.setLoggedOut();
//           this.router.navigateByUrl('/');
//         }
//       });
//     }
//   }

// }
