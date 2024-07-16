import { Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass, NgIf } from '@angular/common';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-side-nav',
    standalone: true,
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
    imports: [MatIconModule, MatButtonModule, MatToolbarModule,
       MatSidenavModule, MatListModule, NgIf, NgClass,
       RouterOutlet, RouterLink, RouterLinkActive
      ]
})
export class SideNavComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
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
