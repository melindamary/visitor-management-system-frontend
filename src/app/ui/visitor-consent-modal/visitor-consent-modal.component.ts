import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-visitor-consent-modal',
  standalone: true,
  imports: [FormsModule,NgIf,ButtonModule],
  templateUrl: './visitor-consent-modal.component.html',
  styleUrl: './visitor-consent-modal.component.scss'
})
export class VisitorConsentModalComponent {
  currentDate: string;
  location:string="Thejaswini";
  constructor(private router: Router) {
    this.currentDate = new Date().toISOString().split('T')[0];
  }
  closeAndNavigate(): void {
    this.router.navigate(['/shared-table']);
  }
}
