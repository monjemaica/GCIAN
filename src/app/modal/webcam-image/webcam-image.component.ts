import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-webcam-image',
  templateUrl: './webcam-image.component.html',
  styleUrls: ['./webcam-image.component.css']
})
export class WebcamImageComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WebcamImageComponent>) { 
  }

  ngOnInit(): void {
  }

  public webcamImage: WebcamImage = null;
   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();
   triggerSnapshot(): void {
    this.trigger.next();
   }
   handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
   }
  
   public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
   }
}
