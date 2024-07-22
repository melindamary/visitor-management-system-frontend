import { Component } from '@angular/core';
import { VisitorLogTableComponent } from "./components/visitor-log-table/visitor-log-table.component";

@Component({
  selector: 'app-security-visitor-log',
  standalone: true,
  imports: [VisitorLogTableComponent],
  templateUrl: './security-visitor-log.component.html',
  styleUrl: './security-visitor-log.component.scss'
})
export class SecurityVisitorLogComponent {

}
