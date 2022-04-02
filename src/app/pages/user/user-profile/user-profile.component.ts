import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { ChangePasswordComponent } from 'src/app/modal/change-password/change-password.component';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { DeletePostComponent } from 'src/app/modal/posts/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { WebcamImageComponent } from 'src/app/modal/webcam-image/webcam-image.component';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  posts: any;
  student: any;
  total_comments: any;
  
  
  liked_posts: any;
  likes: any[];
  like_uid: number;
  likesArr=[];

  currentPost:any;

  displayImg: any;
  filename: any;

  isPopupOpened = false;

  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private _sb: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student = this._us.getUser();
    this.getUsersPosts();
    this.getTotalComments();
    this.getAllLikes();
    // this.getAllLikedPost(); fix bugs
  }

  getUsersPosts() {
    let studid_fld = this.student.studid_fld;
    this._ds._httpGetRequestById('posts/', studid_fld).subscribe(
      (res: any) => {
        this.posts = res;
        if(this.posts?.length === 0){
          this.currentPost == 0
        }
        
      },
      (err: any) => {
        if (err.status == 401) {
          this._us.setLoggedOut();
          this.router.navigateByUrl('/user-login');
        }
      }
    );
  }

  getAllLikes() {
    this._ds._httpPostRequestNoData('posts/likes').subscribe((res: any[]) => {
      this.likes = res;
      console.log('All Likes: ', this.likes);
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

  async getAllLikedPost(){
    let studid_fld = this.student.studid_fld 
    console.log('studid_fld: ', studid_fld);
    const find = await this._ds._httpGetRequest(`posts/likes/${studid_fld}`).subscribe((res:any) => {
      this.liked_posts = res
      console.log('likes posts', this.liked_posts)
      if(this.liked_posts){
        this.liked_posts.map(x => {
          this._ds._httpGetRequestById('students/', x.studid_fld).subscribe((res:any[]) => {
            this.likesArr.push(res);
          })
        }
          );
      }
    })
    
  }

 //filter red hearts
 filterLikeStatus(id: number, studid_fld: any) {
  let post_uid = id;
  let currentPost = this.likes?.filter(
    (like) =>
      parseInt(like.post_uid) === post_uid && like.studid_fld === studid_fld
  );
  // console.log('currentPost', currentPost)

  if (currentPost?.length > 0 && currentPost[0]?.isLiked_fld === 1) {
    return true;
  }
  return false;
}

async doLIke(id: number, studid_fld:any) {
  let post_uid = id;

  let currentPost = await this.likes.filter(
    (like) =>
      parseInt(like.post_uid) === post_uid && like.studid_fld === studid_fld
  );

  console.log('currentpost', currentPost)
  
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

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe((res) => {
      this.isPopupOpened = false;
    });
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
    const dialogRef =this.dialog.open(DeletePostComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
      this.isPopupOpened = false;
    })
  }

  comment(id: number) {
    this.router.navigateByUrl('details-post/' + id);
  }

  webcam() {
    this.dialog.open(WebcamImageComponent);
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  async selectedFile(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.displayImg = file;
      this.filename = file.name;
      console.log(this.filename);
    }

    let studid_fld = await this.student.studid_fld;
    const formData = new FormData();

    if (this.displayImg) {
      formData.append('avatar_fld', this.displayImg);
    }

    console.log(':TESTIMG: ', this.displayImg);

    this._ds._httpPutRequestById(`students/${studid_fld}/upload`, formData).subscribe((res:any) => {
      this._sb.showNotification('Uploaded Profile Photo!', null, 'success');
      this._ds._httpGetRequest(`students/${studid_fld}`).subscribe((res:any) => {
        console.log('student: ',res);
        this._us.saveUser(res);
        this.ngOnInit();
      })
      this.ngOnInit();
    })


  }
}
