import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const config: SocketIoConfig = { url: 'http://localhost:YOUR_PORT/webSocketServer', options: {} };

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  // private socket: Socket;

  // constructor(private socketService: Socket) {
  //   this.socket = socketService.connect(config);
  // }

  // public getVisitorDataStream(): Observable<any> {
  //   return this.socket.fromEvent('visitorData')
  //     .pipe(map(data => JSON.parse(data))); // Parse received JSON data
  // }
}
