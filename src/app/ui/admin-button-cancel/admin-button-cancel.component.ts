import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-button-cancel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-button-cancel.component.html',
  styleUrl: './admin-button-cancel.component.scss'
})
export class AdminButtonCancelComponent {
  /**
   *
   */
  constructor(private router: Router) {
   
    
  }
onClick(){
  this.router.navigate(['/vms/admin-panel']);
}
}
