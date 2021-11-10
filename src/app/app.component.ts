import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './pages/user/user-feed/edit/edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GCIAN-web';

  constructor(public dialog: MatDialog) { }

  open() {
    const dialogRef = this.dialog.open(EditComponent);
  }

}
