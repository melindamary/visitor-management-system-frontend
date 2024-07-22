import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgModel } from '@angular/forms';

interface ApiResponse {
  $id: string;
  $values: Array<{
    $id: string;
    location:String;
    securityFirstName:String; 
    status:boolean; 
    phoneNumber:String; 
    visitorsApproved:Number;
  }>;
}
interface lbSecurityTable {
  location:String;
  securityFirstName:String; 
  status:boolean; 
  phoneNumber:String; 
  visitorsApproved:Number;
}
type TagSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast';
@Component({
  selector: 'app-location-security-table',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule,IconFieldModule, InputIconModule, 
    CommonModule, MultiSelectModule, InputTextModule, DropdownModule ,FormsModule],  templateUrl: './location-security-table.component.html',
  styleUrl: './location-security-table.component.scss'
})
export class LocationSecurityTableComponent {
  lbSecurityTables: lbSecurityTable[] = [];
  filteredLbsecurityTables: lbSecurityTable[] = [];

  showSearch = true;


  // statuses: any[] = [];
  // selectedStatuses: any[] = [];
  statuses: Array<{label: string, value: boolean, severity: TagSeverity}> = [
    { label: 'Available', value: true, severity: 'success' },
    { label: 'Away', value: false, severity: 'warning' }
  ];
  constructor(private http: HttpClient) {


  }






  ngOnInit() {

          this.fetchlbTable();

     
  }

  fetchlbTable() {
    this.http

      .get<ApiResponse>('https://localhost:7121/Statistics/GetSecurityStatistics/security')
      .subscribe((res) => {
        console.log(res);
        this.lbSecurityTables=res.$values.map(value=>({
          location:value.location,
          securityFirstName:value.securityFirstName, 
          status:value.status, 
          phoneNumber:value.phoneNumber, 
          visitorsApproved:value.visitorsApproved
        
        }));
        this.filteredLbsecurityTables=[...this.lbSecurityTables]
      });
  }

    onSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.lbSecurityTables = this.filteredLbsecurityTables.filter(table => 
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
