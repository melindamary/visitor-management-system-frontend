import { Component } from '@angular/core'
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

interface LbTable {
  location: string;
  numberOfSecurity: number;
  passesGenerated: number;
  totalVisitors: number;
}


@Component({
  selector: 'app-location-visitortable',
  standalone: true,
  imports: [TableModule, CommonModule], 
   templateUrl: './location-visitortable.component.html',
  styleUrl: './location-visitortable.component.scss'
})
export class LocationVisitortableComponent {
  lbTables: LbTable[] = [];
  filteredLbTables: LbTable[] = [];

  showSearch = true;
  constructor(private http: HttpClient) {}






  ngOnInit() {
        
          this.fetchlbTable();

     
  }

  fetchlbTable() {
    this.http
      .get<ApiResponse>('https://localhost:7121/Statistics/GetLocationStatistics')
      .subscribe((res) => {
        console.log(res);
        // Map the API response to the LbTable format
        this.lbTables = res.$values.map(value => ({
          location: value.location,
          numberOfSecurity: value.numberOfSecurity,
          passesGenerated: value.passesGenerated,
          totalVisitors: value.totalVisitors
        }));
        this.filteredLbTables = [...this.lbTables];  // Initialize filteredLbTables with all data
      });
  }

    onSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.lbTables = this.filteredLbTables.filter(table => 
        table.location.toLowerCase().includes(searchTerm)
      );
    }
  
  }

