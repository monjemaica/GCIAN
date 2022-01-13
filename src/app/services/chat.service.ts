import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatroom: Array<{user:String, room:String}> = [];

  private url = 'http://localhost:5000';
  socket: any;

  constructor(){
    this.socket = io(this.url);
  }

  listen(eventName:string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data:any){
    this.socket.emit(eventName, data);
  }
  on(eventName: string, data:any){
    this.socket.on(eventName,data);
  }

  getUserRoom(): any {
    
    return {};
  }
}
