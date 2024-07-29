import { Component } from '@angular/core';
import { ReportService } from '../../../../core/services/report-services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {

  visitorId!: number;
  visitorDetails!: any;
  constructor(private reportService: ReportService, private router: Router) { }

  getVisitorDetailsById(id: number): void {
    this.reportService.getVisitorDetailsById(id).subscribe((response) => {
      this.visitorDetails = response.result;
      console.log(this.visitorDetails[0].name);
    });
  }

  ngOnInit(): void {
    this.visitorId = history.state.visitorId;
    if (this.visitorId) {
      this.getVisitorDetailsById(this.visitorId);
    } else {
      console.log('No state parameter found');
    }
}
}
