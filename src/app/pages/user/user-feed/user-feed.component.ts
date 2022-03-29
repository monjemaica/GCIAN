import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { ReportPostComponent } from 'src/app/modal/posts/report-post/report-post.component';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { DataService } from 'src/app/services/data.service';
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

  likes: any[];
  like_uid: number;

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
    this.getAllLikes();
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  getUsersPosts() {
    this._ds._httpGetRequest('posts').subscribe(
      (res: any) => {
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
   this._ds._httpGetRequest('total_trends').subscribe((res:any) => {
     this.trends = res
   })
  }

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
      this.isPopupOpened = false;
    });
  }

  comment(id: number) {
    this.router.navigateByUrl('details-post/' + id);
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
    const dialogRef = this.dialog.open(DeletePostComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
      this.isPopupOpened = false;
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
  getAllLikes() {
    this._ds._httpPostRequestNoData('posts/likes').subscribe((res: any[]) => {
      this.likes = res;
    });
  }

  getTotalComments(){
    this._ds._httpPostRequestNoData('post/total_comments').subscribe((res:any) => {
      this.total_comments = res
    })
  }

  filterComments(id:any){
    return this.total_comments.filter(x => x.post_uid === id);
  }

  //filter red hearts
  filterLikeStatus(id: number, studid_fld:any) {
    let post_uid = id;
    let currentPost = this.likes?.filter((like) => parseInt(like.post_uid) === post_uid && like.studid_fld === studid_fld);
    
    if(currentPost?.length > 0 && currentPost[0]?.isLiked_fld === 1) {
      console.log('currentPost: ',currentPost);
      return true
    }
    return false;
  }

  async doLIke(id: number, studid_fld:any) {
    let post_uid = id;

    let currentPost = await this.likes.filter(
      (like) =>
        parseInt(like.post_uid) === post_uid && like.studid_fld === studid_fld
    );
    
    this.like_uid = await currentPost[0]?.like_uid

   if (currentPost.length !== 0 && currentPost[0].isLiked_fld === 1) {
      this._ds._httpPutRequestByIdNoData(`posts/${this.like_uid}/${post_uid}/dislikes` ).subscribe((res: any) => {
        this.ngOnInit();
      })
    } else {
      this._ds._httpPutRequestById(`posts/${post_uid}/likes`, { studid_fld }).subscribe((res: any) => {
        this.ngOnInit();
      });
    }
    
  }

}
