import { Component } from '@angular/core';

import { SideNavComponent } from "./layout/side-nav/side-nav.component";
import { LoginFormComponent } from "./pages/login/components/login-form/login-form.component";
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'visitor-management-system';
}
