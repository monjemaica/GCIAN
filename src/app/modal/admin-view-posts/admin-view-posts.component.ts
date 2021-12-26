import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-view-posts',
  templateUrl: './admin-view-posts.component.html',
  styleUrls: ['./admin-view-posts.component.css']
})
export class AdminViewPostsComponent implements OnInit {
  posts: any;
  isPopupOpened = false;

  constructor(public dialog: MatDialog, private _us: UserService,private _ds: DataService, private router: Router) {}

  showShortDesciption = true

  ngOnInit(){
    this.getUsersPosts();
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
}
  
  getUsersPosts(){
    this._ds._httpGetRequest('posts').subscribe((res:any) =>{
      console.log('test: ',res);
      this.posts = res;
    },(err:any) => {
      if(err.status == 401){
        this._us.setLoggedOut();
        this.router.navigateByUrl('/user-login');
      }
    });
  }
}
