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
import { DeletePostComponent } from 'src/app/modal/posts/delete-post/delete-post.component';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css'],
})
export class UserFeedComponent implements OnInit {
  posts: any;
  trends = [];
  student: any;
  isPopupOpened = false;
  total_comments: any;
  total_likes: any;
  countLikes=1;
  like_clicked: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  showShortDesciption = true;

  ngOnInit() {
    this.student = this._us.getUser();
    this.getUsersPosts();
    this.getTrends();
    this.getTotalComments();
    this.getTotalLikes();
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  getUsersPosts() {
    this._ds._httpGetRequest('posts').subscribe(
      (res: any) => {
        console.log('test: ', res);
        this.posts = res;
      },
      (err: any) => {
        if (err.status == 401) {
          this._us.setLoggedOut();
          this.router.navigateByUrl('/user-login');
        }
      }
    );
  }

  getTrends() {
    this._ds._httpPostRequestNoData('post/trends').subscribe((res: any[]) => {
      res.forEach((e, i) => this.trends.push(res[i]));
    });
  }

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe((res) => {
      this.isPopupOpened = false;
    });
  }

  comment(id: number) {
    this.router.navigateByUrl('details-post/' + id);
  }

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  logout() {
    this._us.setLoggedOut();
  }

  editPost(id) {
    let post = this.posts.find(post => post.post_uid === id);
    
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: post
    });
    
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
      this.isPopupOpened = false;
    });
  }

  deletePost(id) {
    this.ngOnInit();
    this.dialog.open(DeletePostComponent, {
      data: id
    });
  }

  reportPost(id) {
    let post = this.posts.find(post => post.post_uid === id);
    
    const dialogRef = this.dialog.open(ReportPostComponent, {
      data: post
    });
    
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
      this.isPopupOpened = false;
    });
  }

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }

  // likes
  getTotalComments(){
    this._ds._httpPostRequestNoData('post/total_comments').subscribe((res:any) => {
      this.total_comments = res
      console.log('total_comments: ', this.total_comments);
  
    })
  }

  getTotalLikes(){
    this._ds._httpPostRequestNoData('post/total_likes').subscribe((res:any) => {
      this.total_likes = res
    })
  }

  filterComments(id:any){
    return this.total_comments.filter(x => x.post_uid === id);
  }

  filterLikes(id:any){
    return this.total_likes.filter(x => x.post_uid === id);
  }

  async doLIke(id: number){
    let studid_fld = await this.student.studid_fld;
    let post_uid = id;
    console.log('studidid:', studid_fld);
    this._ds._httpPutRequestById(`posts/${post_uid}/likes`, {studid_fld}).subscribe((res:any) => {
      console.log(res)      
    })
    console.log('post_uid:', post_uid);
    if(this.like_clicked == false){
      this.like_clicked = true;
      this.countLikes++;
    }else{
      this.like_clicked = false;
    }
  }
}
