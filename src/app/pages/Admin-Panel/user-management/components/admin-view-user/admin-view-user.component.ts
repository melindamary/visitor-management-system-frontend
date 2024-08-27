import { Component, TemplateRef } from '@angular/core';
import { TableComponent } from '../../../../../shared-components/table/table.component';
import { UserManagementServiceService } from '../../../../../core/services/user-management-service/user-management-service.service';
import { UserByIdOverview, UserOverview, UserOverviewTransformed } from '../../../../../core/models/user-overview-display.interface';
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
import { SharedService } from '../../../../../core/services/shared-service/shared-data.service.service';
import { DatePipe } from '@angular/common';
import { AdminViewUserModalComponent } from '../admin-view-user-modal/admin-view-user-modal.component';
import { TagModule } from 'primeng/tag';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-admin-view-user',
  standalone: true,
  imports: [TableComponent,ButtonModule,ConfirmDialogModule,IconFieldModule,ToolbarModule ,
    TooltipModule,ToastModule,InputIconModule, AdminViewUserModalComponent, TagModule,
    NgClass],
  providers: [ConfirmationService, MessageService, DatePipe],
  templateUrl: './admin-view-user.component.html',
  styleUrl: './admin-view-user.component.scss',
})
export class AdminViewUserComponent {

  DataSource: UserOverviewTransformed[] = [];
  columnsToDisplay: any[] = [
    { header: 'Username', field: 'username' },
    { header: 'Full Name', field: 'fullName' },
    { header: 'Role ', field: 'roleName' },
    { header: 'Location', field: 'location' },
    { header: 'Status', field: 'status' },
    { header: 'Actions', field: 'actions', width: '18%' }, // Assuming you have actions like edit/delete
  ];
  rows: number = 5;
  totalItems!: number;
  statusTemplate!: TemplateRef<any> | null;
  actionsTemplate!: TemplateRef<any> | null;
  summaryTemplate!: TemplateRef<any> | null;
  viewDetailsDialog: boolean = false;
  userDetails: any;

  constructor(
    private apiService: UserManagementServiceService,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private router: Router,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadAllUser();
  }

  loadAllUser(): void {
    const currentUserRole = this.sharedService.getRole();

    this.apiService.getAllUser().subscribe((users) => {
      // Filter out "SuperAdmin" users if the current user is an admin
      if (currentUserRole === 'Admin') {
        this.DataSource = users.filter(
          (user) => user.roleName !== 'SuperAdmin'
        );
      } else {
        this.DataSource = users; // SuperAdmin can see all users
      }

      this.totalItems = this.DataSource.length;
    });
  }

  viewOrEdit(user: UserOverview): void {
    const userId = user.userId; // Retrieve the user ID

    console.log('Viewing/Editing user with ID:', userId);
    this.userService.setUserId(userId);
    this.router.navigate(['/vms/admin-panel/edit-user']);
    // Implement the logic to view or edit the user details
  }

  view(user: UserByIdOverview): void {
    const userId = user.userId;
    
    this.apiService.getUserById(userId).subscribe({
      next: (response: UserByIdOverview) => {
        const isActive = response.isActive;
        const status = isActive == 1 ? 'Active' : 'Inactive';
        const formattedValidFrom = this.datePipe.transform(response.validFrom, 'MM/dd/yyyy');
        const fullName = `${response.firstName} ${response.lastName}`;

        this.userDetails = {
          ...response,
          fullName: fullName,
          status: status,
          formattedValidFrom: formattedValidFrom,
        };
        console.log("userdetails", this.userDetails);
        this.viewDetailsDialog = true;
      },
      error: (err) => {
        // Handle error scenario if needed
      }
    });
  }

  addUser() {
    this.router.navigate(['/vms/admin-panel/add-user']);
  }

  deleteUser(user: UserOverview, event: Event) {
    const userId = user.userId; // Retrieve the user ID
    console.log('delete user with ID:', userId);
    console.log(event);

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  handleDialogClose() {
    this.viewDetailsDialog = false;
  }

}
