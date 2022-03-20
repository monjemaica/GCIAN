import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  registrationForm: FormGroup;
  currentPassword: boolean;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  currentUser: any;
  oldPass: boolean = false;
  oldPassMsg: boolean = false;
  err:any;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _ds: DataService,
    private _us: UserService,
    private _as: AlertService,
    private _sb: SnackBarService,
    private fb: FormBuilder
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.currentUser = this._us.getUser();
    this.initRegForm();
  }

  initRegForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      n_password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  togglecurrentPassword() {
    this.currentPassword = !this.currentPassword;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  doChangePass(e) {
    const studid_fld = this.currentUser.studid_fld;
    let password_fld = e.target.password.value;

    console.log('pass', password_fld);
    if (password_fld) {
      this._ds
        ._httpPostRequest(`students/${studid_fld}/check_pass`, { password_fld })
        .toPromise()
        .then((res: any) => {
          this.oldPass = true;

          let n_password = e.target.n_password.value;
          let c_password = e.target.c_password.value;
          if(n_password !== c_password){
            this._as.error('Password mismatch, please try again.', 'options.autoClose');
          }else{
            let password_fld = n_password
           this._ds._httpPutRequestById(`students/${studid_fld}/change_pass`, {password_fld}).toPromise().then((res:any) => {
            this._sb.showNotification('Password changed successfully!', null, "success");
            this.dialogRef.close();
           })

          }
         
        })
        .catch((err) => {
          this.err = err.error.message
          console.log(this.err)
          this._as.error('Invalid Password, please try again.', 'options.autoClose');
        });
        
    }
  }
}
