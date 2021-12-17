import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppInfoComponent } from 'src/app/modal/app-info/app-info.component';
import { ChangePasswordComponent } from 'src/app/modal/change-password/change-password.component';
import { CreatePostComponent } from 'src/app/modal/posts/create-post/create-post.component';
import { DeletePostComponent } from 'src/app/modal/posts/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/modal/posts/edit-post/edit-post.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  posts: any;
  student: any;

  isPopupOpened = false;

  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student = this._us.getUser();
    this.getUsersPosts();
  }

  getUsersPosts() {
    let studid_fld = this.student.studid_fld;
    this._ds._httpGetRequestById('posts/', studid_fld).subscribe(
      (res: any) => {
        this.posts = res;
        console.log(this.posts);
      },
      (err: any) => {
        if (err.status == 401) {
          this._us.setLoggedOut();
          this.router.navigateByUrl('/user-login');
        }
      }
    );
  }

  addPost() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CreatePostComponent);

    dialogRef.afterClosed().subscribe((res) => {
      this.isPopupOpened = false;
    });
  }

  // editPost(id: number) {
  //   this.isPopupOpened = true;

  //   let post = this.posts.find(post => post.post_uid === id);
  //   console.log('post_uid: ', this.posts.post_uid)
  //   const dialogRef = this.dialog.open(EditPostComponent, {
  //     data: post
  //   });

  //   dialogRef.afterClosed().subscribe(res => {
  //     this.isPopupOpened = false;
  //   });
  // }

  // deletePost(id: number) {
  //   this.isPopupOpened = true;
  //   let post = this.posts.find(post => post.post_uid === id);

  //   const dialogRef = this.dialog.open(DeletePostComponent, {
  //     data: post
  //   });

  //   dialogRef.afterClosed().subscribe(res => {
  //     this.isPopupOpened = false;
  //   });

  // }
  deletePost() {
    this.dialog.open(DeletePostComponent);
  }

  editPost() {
    this.dialog.open(EditPostComponent);
  }

  // changePassword(id: number) {
  //   this.isPopupOpened = true;
  //   console.log(this.student);
  //   if (this.student.studid_fld !== id) {
  //     console.log('invalid studid_fld');
  //   } else {
  //     let student = this.student;

  //     const dialogRef = this.dialog.open(ChangePasswordComponent, {
  //       data: student,
  //     });

  //     dialogRef.afterClosed().subscribe((res) => {
  //       this.isPopupOpened = false;
  //     });
  //   }
  // }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  test() {
    window.location.href = '/';
  }

  openDialog() {
    this.dialog.open(CreatePostComponent);
  }

  appInfo() {
    this.dialog.open(AppInfoComponent);
  }

  logout() {
    this._us.setLoggedOut();
  }

  segPosts() {
    this.router.navigate(['/user-feed']);
  }
}
