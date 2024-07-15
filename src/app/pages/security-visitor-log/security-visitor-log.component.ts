import { Component } from '@angular/core';
import { TabViewComponent } from "./components/tab-view/tab-view.component";

@Component({
  selector: 'app-security-visitor-log',
  standalone: true,
  imports: [TabViewComponent],
  templateUrl: './security-visitor-log.component.html',
  styleUrl: './security-visitor-log.component.scss'
})
export class SecurityVisitorLogComponent {

}
