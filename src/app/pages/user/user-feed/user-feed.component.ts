
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { ReportPostComponent } from 'src/app/modal/posts/report-post/report-post.component';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { DataService } from 'src/app/services/data.service';
import { CreateCommentComponent } from 'src/app/modal/comments/create-comment/create-comment.component';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})

export class UserFeedComponent implements OnInit{
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

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  // comment() {
  //   this.dialog.open(CreateCommentComponent);
  // }
  
  logout(){
    this._us.setLoggedOut();
  }

  editPost() {
    this.dialog.open(EditPostComponent);
  }
  
  reportPost() {
    this.dialog.open(ReportPostComponent);
  }

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }


}
