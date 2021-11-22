import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  posts: any;
  studid: any;

  constructor(private dialogRef: MatDialogRef<CreatePostComponent>, private _ds: DataService, private _us: UserService, private router:Router) {}

  ngOnInit(): void {
    this.studid = this._us.getUser();
  }

  doCompose(e){
    let content_fld = e.target.content.value;
    let studid_fld = this.studid.studid_fld
    e.preventDefault();

    this._ds._httpPostRequest('posts/compose', {content_fld, studid_fld}).subscribe((res: any) => {
      this.posts = res;
      this.dialogRef.close()
    })
  } 
   
}
