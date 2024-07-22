import { Component } from '@angular/core';
import { TilesComponent } from '../../ui/tiles/tiles.component';
import { LocationChartComponent } from "../../ui/location-chart/location-chart.component";
import { LocationVisitortableComponent } from "../../ui/location-visitortable/location-visitortable.component";
import { PurposePieComponent } from "../../ui/purpose-pie/purpose-pie.component";
import { LocationSecurityTableComponent } from "../../ui/location-security-table/location-security-table.component";

@Component({
    selector: 'app-admin-ace-dashbord',
    standalone: true,
    templateUrl: './admin-ace-dashbord.component.html',
    styleUrl: './admin-ace-dashbord.component.scss',
    imports: [TilesComponent, LocationChartComponent, LocationVisitortableComponent, PurposePieComponent, LocationSecurityTableComponent]
})
export class AdminACEDashbordComponent {
  activeVisitors: number = 10;
  ScheduledVisitors: number = 25;
  totalVisitors: number = 100;

  updateActiveVisitors(value: number) {
    this.activeVisitors = value;
  }

}
