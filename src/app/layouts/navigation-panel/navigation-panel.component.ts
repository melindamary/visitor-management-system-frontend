import { Component } from '@angular/core';
import { TopBarComponent } from "../components/top-bar/top-bar.component";
import { SideNavComponent } from "../components/side-nav/side-nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  standalone: true,
  imports: [TopBarComponent, SideNavComponent, RouterOutlet],
  templateUrl: './navigation-panel.component.html',
  styleUrl: './navigation-panel.component.scss'
})
export class NavigationPanelComponent {

}
