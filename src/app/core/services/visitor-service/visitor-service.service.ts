
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import {BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private visitorCountSource = new BehaviorSubject<number>(9); // Observable to track visitor count
  private scheduledVisitorsSource = new BehaviorSubject<number>(0); // Initialize with 0
  private totalVisitorsSource = new BehaviorSubject<number>(0); // Initialize with 0
  
  private locationStatisticsSource = new BehaviorSubject<any[]>([]); // Observable to track location statistics

  private locationStatisticssecurity = new BehaviorSubject<any[]>([]); // Observable to track location statistics
//Receive Report update
  private receiveReport=new BehaviorSubject<any[]>([]);// Observable to track ReceiveReport
  
  
  visitorCount$ = this.visitorCountSource.asObservable(); // Expose observable
  scheduledVisitors$ = this.scheduledVisitorsSource.asObservable(); // Expose observable
  totalVisitors$ = this.totalVisitorsSource.asObservable(); // Expose observable
//location based table
  locationStatistics$ = this.locationStatisticsSource.asObservable(); // Expose observable for location statistics of location based table

  locationStatisticssecurity$ = this.locationStatisticssecurity.asObservable(); // Expose observable for location statistics of locataion and security table
  receiveReport$ = this.receiveReport.asObservable(); // Expose observable for ReceiveReport 

  public reloadVisitorLog = new Subject<void>();
  public reloadLocationListDropdown = new Subject<void>();
  private baseUrl = environment.apiUrl;
  
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/VisitorHub`)
      .build();

      this.hubConnection.on('ReloadVisitorLog', () => {
        this.reloadVisitorLog.next();
      });
      
      this.hubConnection.on('LocationAdded', () => {
        this.reloadLocationListDropdown.next();
      });

      this.hubConnection.on('ReceiveVisitorCount', (count: number) => {
        this.visitorCountSource.next(count); // Update the observable
        console.log(`Updated visitor count: ${count}`);

  
      });
      this.hubConnection.on('ReceiveScheduledVisitorsCount', (count: number) => {
        this.scheduledVisitorsSource.next(count); // Update the observable
        console.log(`Updated scheduled visitors count: ${count}`);
      });
  
      this.hubConnection.on('ReceiveTotalVisitorsCount', (count: number) => {
        this.totalVisitorsSource.next(count); // Update the observable
        console.log(`Updated total visitors count: ${count}`);
      });
      this.hubConnection.on('ReceiveLocationStatistics', (locationStats: any[]) => {
        this.locationStatisticsSource.next(locationStats); // Update the observable for location statistics
        console.log(`Updated location statistics: `, locationStats);
      });
      this.hubConnection.on('ReceiveLocationStatisticsecurity', (locationStatisticssecurity: any[]) => {
        this.locationStatisticssecurity.next(locationStatisticssecurity); // Update the observable for location statistics
        console.log(`Updated location statistics: `, locationStatisticssecurity);
      });
      this.hubConnection.on('ReceiveReport', (ReceiveReport: any[]) => {
        this.receiveReport.next(ReceiveReport); // Update the observable for location statistics
        console.log(`Updated ReceiveReport :`, ReceiveReport);
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

      this.hubConnection.invoke('SendInitialScheduledVisitorsCount')
      .catch(err => console.error('Error requesting initial scheduled visitors count:', err));

    this.hubConnection.invoke('SendInitialTotalVisitorsCount')
      .catch(err => console.error('Error requesting initial total visitors count:', err));
      
    this.hubConnection.invoke('SendInitialLocationStatistics',1)
      .catch(err => console.error('Error requesting initial location statistics:', err)); // Request initial location statistics
    this.hubConnection.invoke('SendInitialLocationStatisticsecurity',1)
      .catch(err => console.error('Error requesting initial location statistics:', err)); // Request initial location security statistics
      this.hubConnection.invoke('SendInitialReports')
      .catch(err => console.error('Error requesting initial location statistics:', err)); // Request initial ReceiveReport statistics
     }
  
  ngOnDestroy() {
    this.hubConnection.stop()
      .then(() => console.log('SignalR disconnected'))
      .catch(err => console.error('Error disconnecting from SignalR hub:', err));
  }

  
}
