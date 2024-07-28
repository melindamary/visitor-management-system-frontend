import { Component } from '@angular/core';
import { AdminViewUserComponent } from "./admin-view-user/admin-view-user.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [AdminViewUserComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

}
