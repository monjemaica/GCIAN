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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-cares',
  templateUrl: './user-profile-cares.component.html',
  styleUrls: ['./user-profile-cares.component.css'],
})
export class UserProfileCaresComponent implements OnInit {
  student: any;
  total_comments: any;
  total_likes: any;
  countLikes=0;
  liked_posts: any;
  likes=[];

  isPopupOpened = false;

  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student = this._us.getUser();
    this.getTotalComments();
    this.getTotalLikes()
    this.getAllLikes();
  }


  getTotalComments(){
    this._ds._httpPostRequestNoData('post/total_comments').subscribe((res:any) => {
      this.total_comments = res
    })
  }

  getTotalLikes(){
    this._ds._httpPostRequestNoData('post/total_likes').subscribe((res:any) => {
      this.total_likes = res
    })
  }

  filterComments(id:any){
    return this.total_comments.filter(x => x.post_uid === parseInt(id));
  }

  filterLikes(id:any){
    return this.total_likes.filter(x => x.post_uid === parseInt(id));
  }

  async getAllLikes(){
    let studid_fld = this.student.studid_fld 
    console.log('studid_fld: ', studid_fld);
    const find = await this._ds._httpGetRequest(`posts/likes/${studid_fld}`).subscribe((res:any) => {
      this.liked_posts = res
      if(this.liked_posts){
        this.liked_posts.map(x => {
          this._ds._httpGetRequestById('students/', x.studid_fld).subscribe((res:any[]) => {
            this.likes.push(res);
          })
        }
          );
      }
    })
    
  }

  async doLIke(id){
    let studid_fld = await this.student.studid_fld;
    let post_uid = id;

    this._ds._httpPutRequestById(`posts/${post_uid}/likes`, {studid_fld}).subscribe((res:any) => {
      console.log(res)      
      this.countLikes++;
    })
  }

  editPost(id) {
    let post = this.liked_posts.find(post => post.post_uid === id);
    
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

  comment(id: number) {
    this.router.navigateByUrl('details-post/' + id);
  }


  webcam() {
    this.dialog.open(WebcamImageComponent);
  }


  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }
}
