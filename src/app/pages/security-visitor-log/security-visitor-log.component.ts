import { Component } from '@angular/core';
import { TabViewComponent } from "./components/tab-view/tab-view.component";
import { TilesComponent } from "../../ui/tiles/tiles.component";

@Component({
  selector: 'app-security-visitor-log',
  standalone: true,
  imports: [TabViewComponent, TilesComponent],
  templateUrl: './security-visitor-log.component.html',
  styleUrl: './security-visitor-log.component.scss'
})
export class SecurityVisitorLogComponent {
  activeVisitors: number = 10;
  ScheduledVisitors: number = 25;
  totalVisitors: number = 100;
}
