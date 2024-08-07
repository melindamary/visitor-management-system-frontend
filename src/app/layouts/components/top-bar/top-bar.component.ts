import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MenuModule} from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { isPlatformBrowser, NgIf,} from '@angular/common';
import { SharedService } from '../../../core/services/shared-service/shared-data.service.service';
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

  constructor(public authService: AuthService, @Inject(PLATFORM_ID) private platformId: any,
    private sharedService: SharedService) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('authUser');
    }
  }

  username:string = this.sharedService.getUsername();
  userRole: string = this.sharedService.getRole();
  location:string = this.sharedService.getLocation();
  ngOnInit(): void {
    this.items = [
      {
          label: "Account: " + this.userRole,
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
