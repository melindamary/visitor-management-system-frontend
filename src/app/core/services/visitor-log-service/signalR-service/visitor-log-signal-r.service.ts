import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogSignalRService {

  private hubConnection: signalR.HubConnection;
  public reloadVisitorLog = new Subject<void>();
  private baseUrl: string = environment.apiUrl
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/VisitorHub`)
      .build();

    this.hubConnection.on('ReloadVisitorLog', () => {
      this.reloadVisitorLog.next();
    });

    this.hubConnection.start().catch(err => console.error('Error starting SignalR connection:', err));
  }
}
