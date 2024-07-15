import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ActiveVisitorTableComponent } from "../active-visitor-table/active-visitor-table.component";
import { UpcomingVisitorTableComponent } from "../upcoming-visitor-table/upcoming-visitor-table.component";

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [TabViewModule, BadgeModule, ActiveVisitorTableComponent, UpcomingVisitorTableComponent],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.scss'
})
export class TabViewComponent {

}
