
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteCommentComponent } from '../../../modal/comments/delete-comment/delete-comment.component';
import { EditCommentComponent } from '../../../modal/comments/edit-comment/edit-comment.component';
import { CreatePostComponent } from '../../../modal/posts/create-post/create-post.component';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent implements OnInit {
  post: any;
  post_uid: any;
  comments:any;
  


  isPopupOpened = false;
  constructor(public dialog: MatDialog, private _ds: DataService, private _us: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.post_uid = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.getPost();
    },1000)
    setTimeout(() => {
      this.getAllComments();
    },2000)
  }

  getPost(){
    let post_uid = this.post_uid;
    this._ds._httpGetRequestById('post/', post_uid).subscribe((res:any) => {
      console.log('post: ', res)
      this.post=res
    }),((err:any) => {
      if(err.status == 401){
        this._us.setLoggedOut();
        this.router.navigateByUrl('/user-login');
      }
    })
  }
  
  doComment(e){
    let post_uid = this.post_uid;
    let content_fld = e.target.content.value;
    let studid_fld = this.post[0].studid_fld
    e.preventDefault();

    this._ds._httpPostRequest( `posts/${post_uid}/comments`, {studid_fld, content_fld}).subscribe((res:any) => {
      console.log(res)
    }),(err:any) => {
      if(err.status == 401){
        this._us.setLoggedOut();
        this.router.navigateByUrl('/user-login');
      }
    };
  }

  getAllComments(){
    let post_uid = this.post_uid;
    

    this._ds._httpGetRequest(`posts/${post_uid}/comments`).subscribe((res:any) => {
      this.comments = res
      console.log('comments: ', res)

    }),((err:any) => {
      if(err.status == 401){
        this._us.setLoggedOut();
        this.router.navigateByUrl('/user-login');
      }
    })
    
  }

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    })
  } 

  editComment(id: number) {
    this.isPopupOpened = true;
    let comment = this.comments.find(comment => comment.comment_uid === id);

    const dialogRef = this.dialog.open(EditCommentComponent, {
      data: comment
    });
 
    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    });
  }
  
  deleteComment(id: number) {
    this.isPopupOpened = true;
    let comment = this.comments.find(comment => comment.comment_uid === id);

    const dialogRef = this.dialog.open(DeleteCommentComponent, {
      data: comment
    });

    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    });
  }
 
  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }

  logout(){
    this._us.setLoggedOut();
  }

}