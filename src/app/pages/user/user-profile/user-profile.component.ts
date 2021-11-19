import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/modal/change-password/change-password.component';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { DeletePostComponent } from 'src/app/modal/posts/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  posts: any;
  student:any;

  isPopupOpened = false;

  constructor(public dialog: MatDialog, private _us: UserService, private _ds:DataService , private router: Router) {}
  
  ngOnInit(): void {
    this.student = this._us.getUser();
    this.getUsersPosts();
  }

  getUsersPosts(){
    let studid_fld = this.student.studid_fld
    this._ds._httpGetRequestById('posts/', studid_fld).subscribe((res:any) =>{
      console.log('test: ',res);
      this.posts = res;
      console.log(this.posts);
    },(err:any) => {
      if(err.status == 401){
        this._us.setLoggedOut();
        this.router.navigateByUrl('/login');
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


  editPost(id: number) {
    this.isPopupOpened = true;
    let post = this.posts.find(post => post.post_uid === id);

    const dialogRef = this.dialog.open(EditPostComponent, {
      data: post
    });

    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    });
  }
  
  deletePost(id: number) {
    this.isPopupOpened = true;
    let post = this.posts.find(post => post.post_uid === id);

    const dialogRef = this.dialog.open(DeletePostComponent, {
      data: post
    });

    dialogRef.afterClosed().subscribe(res => {
      this.isPopupOpened = false;
    });
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }


  test() {
    window.location.href="/"
  }

  logout(){
    this._us.setLoggedin();
  }

}
