import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatroom: Array<{user:String, room:String}> = [];

  private url = 'http://gordoncollegeccs.edu.ph:4230';
  socket: any;

  constructor(){
    this.socket = io(this.url);
  }

  listen(eventName:string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
        console.log('data listen', data)
      })
    })
  }

  getMessage(){
    let observable = new Observable<{user:String, message:String, date:Date}>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      })
      return() => {}
    });
    return observable;
  }

  emit(eventName: string, data:any){
    this.socket.emit(eventName, data);
    console.log('event',eventName)
    console.log('data chatservice',data)
  }
  
  on(eventName: string, data:any){
    this.socket.on(eventName,data);
  }

  getUserRoom(): any {
    
    return {};
  }
}
