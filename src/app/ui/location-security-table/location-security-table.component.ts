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


interface lbSecurityTable {
  location:String;
  securityName:String; 
  securityStatus:boolean; 
  PhoneNumber:String; 
  visitorsApproved:Number;
}
@Component({
  selector: 'app-location-security-table',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule,IconFieldModule, InputIconModule, 
    CommonModule, MultiSelectModule, InputTextModule, DropdownModule ,FormsModule],  templateUrl: './location-security-table.component.html',
  styleUrl: './location-security-table.component.scss'
})
export class LocationSecurityTableComponent {
  lbSecurityTables: lbSecurityTable[] = [];
  filteredLbTables: lbSecurityTable[] = [];

  showSearch = false;


  // statuses: any[] = [];
  // selectedStatuses: any[] = [];
  statuses: any[] = [
    { label: 'Available', value: true },
    { label: 'Away', value: false }
  ];

  constructor(private http: HttpClient) {


  }






  ngOnInit() {

          this.fetchlbTable();

     
  }

  fetchlbTable() {
    this.http

      .get<lbSecurityTable[]>('https://localhost:7082/LocationSecurityTable/GetTable')
      .subscribe((res) => {
        console.log(res);
        this.lbSecurityTables = res;        
        this.filteredLbTables = res;  // Initialize filteredLbTables with all data

      });
  }

    onSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.lbSecurityTables = this.filteredLbTables.filter(table => 
        table.location.toLowerCase().includes(searchTerm)
      );
    }
    getSeverity(status: boolean): 'success' | 'warning' {
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
