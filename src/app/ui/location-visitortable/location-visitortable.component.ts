import { Component } from '@angular/core'
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
interface LbTable {
  location: string;
  NumberOfSecurity: string;
  PassesGenerated: string;
  TotalVisitors: number;
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

  showSearch = false;
  constructor(private http: HttpClient) {}






  ngOnInit() {
        
          this.fetchlbTable();

     
  }

  fetchlbTable() {
    this.http

      .get<LbTable[]>('https://localhost:7082/LocationTable/GetTable')
      .subscribe((res) => {
        console.log(res);
        this.lbTables = res;
        this.filteredLbTables = res;  // Initialize filteredLbTables with all data

      });
  }

    onSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.lbTables = this.filteredLbTables.filter(table => 
        table.location.toLowerCase().includes(searchTerm)
      );
    }
  
  }

