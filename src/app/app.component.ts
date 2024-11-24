import { Component } from '@angular/core';

import { SideNavComponent } from "./layouts/components/side-nav/side-nav.component";
import { LoginFormComponent } from "./pages/login/components/login-form/login-form.component";
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { NavigationPanelComponent } from "./layouts/navigation-panel/navigation-panel.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'visitor-management-system';
}
