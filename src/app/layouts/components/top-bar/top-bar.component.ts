import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/authServices/auth.service';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatIconModule, NgIf, MenuModule, ButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
 
  items: any | undefined;
  isLoggedIn: boolean;
  constructor(public authService: AuthService) {
    this.isLoggedIn = !!localStorage.getItem('authUser');
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
