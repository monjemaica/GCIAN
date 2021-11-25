import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})

export class UserFeedComponent implements OnInit{
  posts: any;
  isPopupOpened = false;

  constructor(public dialog: MatDialog, private _us: UserService,private _ds: DataService, private router: Router) {}
  ngOnInit(){
    this.getUsersPosts();
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

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    })
  } 

  comment(id:number) {
    // this.dialog.open(CreateCommentComponent);
    this.router.navigateByUrl('details-post/' + id);
  }

  logout(){
    this._us.setLoggedOut();
  }

}