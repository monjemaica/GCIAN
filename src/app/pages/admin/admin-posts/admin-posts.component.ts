import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminViewPostsComponent } from 'src/app/modal/admin-view-posts/admin-view-posts.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css'],
})
export class AdminPostsComponent implements OnInit {
  posts: any;
  term:any;
  constructor(
    public dialog: MatDialog,
    private _us: UserService,
    private _ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._ds._httpGetRequest('posts').subscribe((res:any) => {
      this.posts = res
      console.log('post', res);
    })
  }

  viewPost(id:number) {
    console.log('id:', id)
    let post = this.posts.find(x => x.post_uid === id);
    console.log('post', post)
    this.dialog.open(AdminViewPostsComponent,
      {data: post}  
    );
  }

  logout() {
    this._us.setLoggedOut();
  }
}
