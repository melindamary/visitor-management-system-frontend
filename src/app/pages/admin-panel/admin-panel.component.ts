import { Component } from '@angular/core';
import { AdminVisitPurposeTableComponent } from './visit-purpose-management/admin-visit-purpose-table/admin-visit-purpose-table.component';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AdminVisitPurposeTableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
