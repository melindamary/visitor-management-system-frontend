import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { SignalRService } from '../../core/services/visitor-service/visitor-service.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
interface TimePeriod {
  label: string;
  value: number;
}
interface ApiResponse {
  $id: string;
  $values: Array<{
    $id: string;
    location: String;
    securityFirstName: String;
    status: boolean;
    phoneNumber: String;
    visitorsApproved: Number;
  }>;
}
interface lbSecurityTable {
  location: String;
  securityFirstName: String;
  status: boolean;
  phoneNumber: String;
  visitorsApproved: Number;
}
type TagSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'contrast';
@Component({
  selector: 'app-location-security-table',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './location-security-table.component.html',
  styleUrl: './location-security-table.component.scss',
})
export class LocationSecurityTableComponent {
  lbSecurityTables: lbSecurityTable[] = [];
  filteredLbsecurityTables: lbSecurityTable[] = [];

  showSearch = true;

  // statuses: any[] = [];
  // selectedStatuses: any[] = [];
  statuses: Array<{ label: string; value: boolean; severity: TagSeverity }> = [
    { label: 'Available', value: true, severity: 'success' },
    { label: 'Away', value: false, severity: 'warning' },
  ];

  timePeriods: TimePeriod[] = [
    { label: 'Daily', value: 1 },
    { label: 'Weekly', value: 7 },
    { label: 'Monthly', value: 30 },
  ];
  selectedTimePeriod: TimePeriod = this.timePeriods[1]; // Default to Daily

  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private signalRService: SignalRService
  ) {}

  ngOnInit() {
    this.selectedTimePeriod = this.timePeriods[0]; // Set to Daily
    console.log('Initial selected period:', this.selectedTimePeriod);
    this.fetchlbTable();//location based tabel 
    this.subscriptions.push(
      this.signalRService.locationStatisticssecurity$.subscribe((count) => {
        console.log('Real-time security:', count);
        this.fetchlbTable(); // Optionally refetch the table if your API is not pushing full data
      })
    );
  }

  // fetchlbTable() {
  //   this.http

  //     .get<ApiResponse>('https://localhost:7121/Statistics/GetSecurityStatistics/security')
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.lbSecurityTables=res.$values.map(value=>({
  //         location:value.location,
  //         securityFirstName:value.securityFirstName,
  //         status:value.status,
  //         phoneNumber:value.phoneNumber,
  //         visitorsApproved:value.visitorsApproved

  //       }));
  //       this.filteredLbsecurityTables=[...this.lbSecurityTables]
  //     });
  // }
  fetchlbTable() {
    console.log('Selected time period:', this.selectedTimePeriod);
    const days = this.selectedTimePeriod.value;
    let params = new HttpParams().set('days', days.toString());
    console.log('Params:', params.toString());

    this.http
      .get<ApiResponse>(
        'https://localhost:7121/Statistics/GetSecurityStatistics/security',
        { params }
      )
      .subscribe((res) => {
        console.log(res);
        this.lbSecurityTables = res.$values.map((value) => ({
          location: value.location,
          securityFirstName: value.securityFirstName,
          status: value.status,
          phoneNumber: value.phoneNumber,
          visitorsApproved: value.visitorsApproved,
        }));
        this.filteredLbsecurityTables = [...this.lbSecurityTables];
      });
  }
  onTimePeriodChange(event: any) {
    console.log('Time period changed:', event.value);
    this.selectedTimePeriod = event.value;
    this.fetchlbTable();

    this.fetchlbTable();
  }
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.lbSecurityTables = this.filteredLbsecurityTables.filter((table) =>
      table.location.toLowerCase().includes(searchTerm)
    );
  }
  getSeverity(status: boolean): TagSeverity {
    return status ? 'success' : 'warning';
  }

  getStatusText(status: boolean): string {
    return status ? 'Available' : 'Away';
  }

  // getStatusText(status: boolean): string {
  //   return status ? 'Avalilable' : 'Away';
  // }

  // getStatusClass(status: boolean): string {
  //   return status ? 'status-active' : 'status-away';
  // }
  // onStatusFilterChange(event: any) {
  //   this.selectedStatuses = event.value;
  // }
}
