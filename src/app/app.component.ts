import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileComponent } from './modal/admin-profile/admin-profile.component';
import { AppInfoComponent } from './modal/app-info/app-info.component';
import { CreatePostComponent } from './modal/posts/create-post/create-post.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GCIAN-web';
  private role: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;

  constructor(private _us:UserService, public dialog: MatDialog) { }

  ngOnInit():void{
    this.isLoggedIn = !!this._us.getUser();
    
    if(this.isLoggedIn){
      const user = this._us.getUser();
      this.role = user.role_fld;
      console.log('role test:', user.role_fld)
      this.showAdminBoard = this.role.includes('admin');
      this.showUserBoard = this.role.includes('user');
    }
  }

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }
  chart() {}

  profile() {
    this.dialog.open(AdminProfileComponent);
  }

  logout(){
    this._us.setLoggedOut();
  }

}
