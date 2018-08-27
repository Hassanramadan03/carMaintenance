import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatService {
 response = null;
  constructor(private socket: Socket) { }

    sendMessage(msg: string){
        this.socket.emit("message", msg);
    }
    
    getMessage() {
        return this.socket
            .fromEvent("message")
            .map( data => {
            this.response = data 
            console.log(this.response.msg);
            });
    }

}
