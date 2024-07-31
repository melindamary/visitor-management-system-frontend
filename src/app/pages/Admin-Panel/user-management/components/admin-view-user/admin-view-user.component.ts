import { Component, TemplateRef } from '@angular/core';
import { TableComponent } from "../../../../../shared-components/table/table.component";
import { UserManagementServiceService } from '../../../../../core/services/user-management-service/user-management-service.service';
import { UserOverview, UserOverviewTransformed } from '../../../../../core/models/user-overview-display.interface';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { UserService } from '../../../../../core/services/user-management-service/User.service';

@Component({
  selector: 'app-admin-view-user',
  standalone: true,
  imports: [TableComponent,ButtonModule,ConfirmDialogModule,IconFieldModule,ToolbarModule ,
    TooltipModule,ToastModule,InputIconModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-view-user.component.html',
  styleUrl: './admin-view-user.component.scss'
})

export class AdminViewUserComponent {


DataSource: UserOverviewTransformed[] = [];;
columnsToDisplay: any[] = [
  { header: 'Username', field: 'username'},
  { header: 'Full Name', field: 'fullName' },
  { header: 'Role ', field: 'roleName' },
  { header: 'Location', field: 'location' },
  { header: 'Status', field: 'isActive' },
  { header: 'Actions', field: 'actions', width: "18%" } // Assuming you have actions like edit/delete
];
rows: number = 5;
totalItems!: number;
actionsTemplate!: TemplateRef<any>|null;
summaryTemplate!: TemplateRef<any>|null;



constructor(private apiService: UserManagementServiceService,private router: Router,private userService: UserService,
  private confirmationService: ConfirmationService, private messageService: MessageService) {
  
  
}

ngOnInit(){

  this.loadAllUser();
}

// this.userService.getAllUser().subscribe(users => {
//   this.users = users;
// });
// }
loadAllUser(): void {
  this.apiService.getAllUser().subscribe(users => {
    this.DataSource = users;
    this.totalItems = users.length;
  });
    
}

viewOrEdit(user: UserOverview): void {
  const userId = user.userId;  // Retrieve the user ID
  
  console.log('Viewing/Editing user with ID:', userId);
  this.userService.setUserId(userId);
  this.router.navigate(['/vms/edit-user']);
  // Implement the logic to view or edit the user details
}
view(user: UserOverview): void {
  const userId = user.userId;  // Retrieve the user ID
  
  console.log('Viewing/Editing user with ID:', userId);
  this.userService.setUserId(userId);
  this.router.navigate(['/vms/view-user']);
  // Implement the logic to view or edit the user details
}

addUser(){
  this.router.navigate(['/vms/add-user']);
}

deleteUser(user: UserOverview,event:Event) {
  const userId = user.userId;  // Retrieve the user ID
  console.log('delete user with ID:', userId);
  // Implement the logic to view or edit the user details
  console.log(event);
  
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptButtonStyleClass:"p-button-danger p-button-text",
    rejectButtonStyleClass:"p-button-text p-button-text",
    acceptIcon:"none",
    rejectIcon:"none",

    accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
    },
    reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
});
}


}
