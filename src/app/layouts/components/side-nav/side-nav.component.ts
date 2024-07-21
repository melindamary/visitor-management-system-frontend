import { Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authServices/auth.service';

@Component({
    selector: 'app-side-nav',
    standalone: true,
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
    imports: [MatIconModule, MatButtonModule, MatToolbarModule,
       MatSidenavModule, MatListModule, NgIf, NgFor, NgClass,
       RouterOutlet, RouterLink, RouterLinkActive
      ]
})
export class SideNavComponent {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  menuItems:any;

  constructor(private observer: BreakpointObserver, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = this.authService.getMenuItems();
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      this.isCollapsed = this.isMobile; // Make sure it starts as collapsed on mobile
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.open();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.isCollapsed = !this.isCollapsed; // Toggle the collapsed state on mobile
    } else {
      this.isCollapsed = !this.isCollapsed; // Toggle the collapsed state on desktop
      this.sidenav.open();
    }
  }
}
