
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import {BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private visitorCountSource = new BehaviorSubject<number>(9); // Observable to track visitor count
  visitorCount$ = this.visitorCountSource.asObservable(); // Expose observable

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7121/VisitorHub')
      .build();
      this.hubConnection.on('ReceiveVisitorCount', (count: number) => {
        this.visitorCountSource.next(count); // Update the observable
        console.log(`Updated visitor count: ${count}`);

  
      });
    this.hubConnection.start()     
     .then(() => {
      console.log('SignalR connected',this.visitorCountSource);
     this.requestInitialCount();
     setInterval(() => {}, 1000);

    })
     .catch(err => console.error('Error connecting to SignalR hub:', err));
  }
  private requestInitialCount() {
    this.hubConnection.invoke('SendInitialVisitorCount')
      .catch(err => console.error('Error requesting initial visitor count:', err));
      setInterval(() => {}, 1000);

  }
  ngOnDestroy() {
    this.hubConnection.stop()
      .then(() => console.log('SignalR disconnected'))
      .catch(err => console.error('Error disconnecting from SignalR hub:', err));
  }

  
}
