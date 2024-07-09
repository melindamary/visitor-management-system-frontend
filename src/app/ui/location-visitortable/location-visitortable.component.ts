import { Component } from '@angular/core'
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
interface Product {
  Location: string;
  secutityNo: string;
  passes: string;
  TotalVisitors: number;
}
@Component({
  selector: 'app-location-visitortable',
  standalone: true,
  imports: [TableModule, CommonModule],  templateUrl: './location-visitortable.component.html',
  styleUrl: './location-visitortable.component.scss'
})
export class LocationVisitortableComponent {
  products!: Product[];
  showSearch = false;


  originalProducts!: Product[]; // New property to hold the original products



  constructor() {}

  ngOnInit() {
          this.products = [
            { Location: 'gayatri', secutityNo: '1', passes: '12', TotalVisitors: 10 },
            { Location: 'tejswini', secutityNo: '2', passes: '22', TotalVisitors: 20 },
            { Location: 'amritha', secutityNo: '3', passes: '34', TotalVisitors: 30 },
            { Location: 'bagloor', secutityNo: '2', passes: '47', TotalVisitors: 40 }
          ];

          this.originalProducts = [...this.products]; // Make a copy of the products

     
  }
  onSearch(event: any) {

    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.products = this.originalProducts.filter(product => product.Location.toLowerCase().includes(searchTerm));
    } else {
      this.products = [...this.originalProducts]; // Reset to the original products when search term is empty
    }
  }



    // const searchTerm = event.target.value.toLowerCase();
    // this.products = this.products.filter(product => product.Location.toLowerCase().includes(searchTerm));
  }

