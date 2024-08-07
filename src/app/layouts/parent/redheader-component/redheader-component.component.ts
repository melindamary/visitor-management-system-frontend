import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-redheader-component',
  standalone: true,
  imports: [],
  templateUrl: './redheader-component.component.html',
  styleUrl: './redheader-component.component.scss'
})
export class RedheaderComponentComponent {
  currentDate!: string;
  currentTime!:string;


  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.updateDate();
    setInterval(() => this.updateDate(), 1000); // Update every second
  }

  updateDate() {
    this.currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy')!;
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss')!;
  }
}
