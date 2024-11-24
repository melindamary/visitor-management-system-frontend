import { Component } from '@angular/core'
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgModel } from '@angular/forms';
import { SignalRService } from '../../core/services/visitor-service/visitor-service.service';
import { Subscription } from 'rxjs';
// Define the new interface for the API response
interface ApiResponse {
  $id: string;
  $values: Array<{
    $id: string;
    location: string;
    numberOfSecurity: number;
    passesGenerated: number;
    totalVisitors: number;
  }>;
}
interface TimePeriod {
  label: string;
  value: number;
}
interface LbTable {
  location: string;
  numberOfSecurity: number;
  passesGenerated: number;
  totalVisitors: number;
}


@Component({
  selector: 'app-location-visitortable',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule,IconFieldModule, InputIconModule, 
    CommonModule, MultiSelectModule, InputTextModule, DropdownModule ,FormsModule], 
   templateUrl: './location-visitortable.component.html',
  styleUrl: './location-visitortable.component.scss'
})
export class LocationVisitortableComponent {
  lbTables: LbTable[] = [];
  filteredLbTables: LbTable[] = [];

  showSearch = true;


  // private hubConnection!: signalR.HubConnection;
  timePeriods: TimePeriod[] = [
    { label: 'Daily', value: 1 },
    { label: 'Weekly', value: 7 },
    { label: 'Monthly', value: 30 }
  ];

  selectedTimePeriod: TimePeriod = this.timePeriods[1];  // Default to Daily

  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient,private signalRService:SignalRService) {}






  ngOnInit() {
        
    this.selectedTimePeriod = this.timePeriods[0];  // Set to Daily
    console.log('Initial selected period:', this.selectedTimePeriod);
    this.fetchlbTable();
    this.subscriptions.push(
      this.signalRService.visitorCount$.subscribe(count => {
        console.log('Real-time visitor count:', count);
        this.fetchlbTable(); // Optionally refetch the table if your API is not pushing full data
      })
    );
  }
  fetchlbTable() {
    console.log('Selected time period:', this.selectedTimePeriod);
    const days = this.selectedTimePeriod.value;
    let params = new HttpParams().set('days', days.toString());
    console.log('Params:', params.toString());
    

    this.http
      .get<ApiResponse>('https://localhost:7121/Statistics/GetLocationStatistics/location', { params })
      .subscribe((res) => {
         console.log(res);
         // Map the API response to the LbTable format
         this.lbTables = res.$values.map(value => ({
           location: value.location,
           numberOfSecurity: value.numberOfSecurity,
           passesGenerated: value.passesGenerated,
           totalVisitors: value.totalVisitors
         }));
         this.filteredLbTables = [...this.lbTables]; 
      });
  }
  // fetchlbTable() {
  //   this.http
  //     .get<ApiResponse>('https://localhost:7121/Statistics/GetLocationStatistics')
  //     .subscribe((res) => {
  //       console.log(res);
  //       // Map the API response to the LbTable format
  //       this.lbTables = res.$values.map(value => ({
  //         location: value.location,
  //         numberOfSecurity: value.numberOfSecurity,
  //         passesGenerated: value.passesGenerated,
  //         totalVisitors: value.totalVisitors
  //       }));
  //       this.filteredLbTables = [...this.lbTables];  // Initialize filteredLbTables with all data
  //     });
  // }
  onTimePeriodChange(event: any) {
    console.log('Time period changed:', event.value);
    this.selectedTimePeriod = event.value;
    this.fetchlbTable();
    
    
    this.fetchlbTable();
  }
    onSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.lbTables = this.filteredLbTables.filter(table => 
        table.location.toLowerCase().includes(searchTerm)
      );
    }
    // startSignalRConnection() {
    //   this.hubConnection = new signalR.HubConnectionBuilder()
    //     .withUrl('https://localhost:7121/statisticsHub')
    //     .build();
  
    //   this.hubConnection.on('ReceiveLocationStatistics', (data: LbTable[]) => {
    //     this.lbTables = data;
    //     this.filteredLbTables = [...this.lbTables];  // Update filteredLbTables with new data
    //   });
  
    //   this.hubConnection
    //     .start()
    //     .then(() => console.log('SignalR connection established.'))
    //     .catch(err => console.error('Error establishing SignalR connection: ', err));
    // }
  
  
  }

