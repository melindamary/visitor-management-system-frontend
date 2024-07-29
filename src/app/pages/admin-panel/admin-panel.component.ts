import { Component } from '@angular/core';
import { AdminVisitPurposeTableComponent } from './components/admin-visit-purpose-table/admin-visit-purpose-table.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AdminVisitPurposeTableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
