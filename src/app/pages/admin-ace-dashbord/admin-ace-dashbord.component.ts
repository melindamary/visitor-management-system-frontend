import { Component } from '@angular/core';
import { TilesComponent } from '../../ui/tiles/tiles.component';
import { LocationChartComponent } from "../../ui/location-chart/location-chart.component";
import { LocationVisitortableComponent } from "../../ui/location-visitortable/location-visitortable.component";
import { PurposePieComponent } from "../../ui/purpose-pie/purpose-pie.component";
import { LocationSecurityTableComponent } from "../../ui/location-security-table/location-security-table.component";
import { SignalRService } from '../../core/services/visitor-service/visitor-service.service';
import { HttpClient } from '@microsoft/signalr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-admin-ace-dashbord',
    standalone: true,
    templateUrl: './admin-ace-dashbord.component.html',
    styleUrl: './admin-ace-dashbord.component.scss',
    imports: [TilesComponent, LocationChartComponent, LocationVisitortableComponent, PurposePieComponent, LocationSecurityTableComponent]
})
export class AdminACEDashbordComponent {
  visitorCount:number=0;
  ScheduledVisitors: number = 25;
  totalVisitors: number = 100;

  constructor(private signalRService: SignalRService) { }
  ngOnInit() {
    this.signalRService.visitorCount$.subscribe(count => {
      this.visitorCount = count;
    });
    this.signalRService.scheduledVisitors$.subscribe(count => {
      this.ScheduledVisitors = count;
    });
    this.signalRService.totalVisitors$.subscribe(count => {
      this.totalVisitors = count;
    });
  }
  

}
