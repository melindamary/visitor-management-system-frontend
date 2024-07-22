import { Component, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser, NgFor } from '@angular/common';
// import { ButtonModule } from 'primeng/button';
import { MatIcon } from '@angular/material/icon';
import {MenuModule} from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/authServices/auth.service';
import { isPlatformBrowser, NgIf,} from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatIcon,MenuModule,ButtonModule,NgIf],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
 
  items: any | undefined;
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('authUser');
    }
  }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Account',
          items: [
              {
                  label: 'Logout',
                  icon: 'pi pi-power-off',
                  command: () => {
                    this.authService.logout()
                  }
              },
          ]
      }
  ];
  }
}
