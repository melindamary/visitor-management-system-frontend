import { Component } from '@angular/core';
import { VisitorLogComponent } from "./components/visitor-log/visitor-log.component";

@Component({
  selector: 'app-security-visitor-log',
  standalone: true,
  imports: [VisitorLogComponent],
  templateUrl: './security-visitor-log.component.html',
  styleUrl: './security-visitor-log.component.scss'
})
export class SecurityVisitorLogComponent {

}
