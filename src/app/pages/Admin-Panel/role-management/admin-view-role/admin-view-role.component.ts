import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RoleService } from '../../../../services/role.service'; 
import { NgFor, CommonModule } from '@angular/common';
import { Page,PagesResponse } from '../../../../Models/page.interface';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../../../../shared-components/table/table.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-admin-view-role',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    DialogModule,
    ButtonModule,
    TableComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-view-role.component.html',
  styleUrls: ['./admin-view-role.component.scss']
})
export class AdminViewRoleComponent implements OnInit {
  roleForm: FormGroup;
  roleDataSource: any[] = [];
  columnsToDisplay: any[] = [
    { header: 'Role Name', field: 'name' },
    { header: 'Created Date', field: 'createdDate' },
    { header: 'Actions', field: 'actions' }
  ];
  rows: number = 5;
  totalItems!: number;  
  addRoleDialogVisible: boolean = false;
  editRoleDialogVisible: boolean = false;
  selectedRoleId!: number;
  pages: Page[] = [];
  private router = inject(Router);
  private roleService = inject(RoleService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
  }

  ngOnInit() {
    this.loadAllRoles();
    this.loadPages();
  }

  loadAllRoles() {
    // Replace with actual role fetching logic
    this.roleService.getAllRoles().subscribe((roles: any) => {
      console.log(roles);
      
      this.roleDataSource = roles.$values;
      this.totalItems = roles.$values.length;
    });
  }

  loadPages() {
    this.roleService.getPages().subscribe({
      next: (response: any) => {
        if (response && response.$values) {
          this.pages = response.$values;
          const permissionsGroup: { [key: number]: [boolean] } = {};
          this.pages.forEach(page => {
            if (page.id != null) {
              permissionsGroup[page.id] = [false];
            }
          });
          this.roleForm.setControl('permissions', this.fb.group(permissionsGroup));
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: error => console.error('Error fetching pages:', error)
    });
  }

  openAddRoleDialog() {
    this.roleForm.reset();
    this.addRoleDialogVisible = true;
  }

  openEditRoleDialog(role: any) {
    this.selectedRoleId = role.id;
    this.roleForm.reset();
    this.loadRoleData(this.selectedRoleId);
    this.editRoleDialogVisible = true;
  }

  loadRoleData(roleId: number) {
    this.roleService.getRoleById(roleId).subscribe(
      role => {
        this.roleForm.patchValue({ role: role.name });
        this.roleService.getPagesByRoleId(roleId).subscribe((response: any) => {
          if (response && response.$values && Array.isArray(response.$values)) {
            const rolePages = response.$values;
            const permissionsControl = this.roleForm.get('permissions') as FormGroup;
            rolePages.forEach((page: { id: { toString: () => any; } | null; }) => {
              if (page.id != null) {
                permissionsControl.get(page.id.toString())?.setValue(true);
              }
            });
          } else {
            console.error('rolePages is not an array:', response);
          }
        });
      },
      error => console.error('Error fetching role:', error)
    );
  }

  createRole() {
    const roleData = {
      Name: this.roleForm.get('role')?.value,
      CreatedBy: 1, // Replace with actual user ID
      UpdatedBy: 1, // Replace with actual user ID
      Permissions: this.roleForm.get('permissions')?.value
    };
    this.roleService.createRole(roleData).subscribe({
      next: (response: any) => {
        if (response && response.id) {
          const pageControls = Object.entries(roleData.Permissions)
            .filter(([_, isSelected]) => isSelected)
            .map(([pageId, _]) => ({ pageId: parseInt(pageId) }));
          this.createPageControls(response.id, pageControls, roleData.Name);
        } else {
          console.error('Invalid response from createRole:', response);
        }
      },
      error: error => console.error('Error creating role:', error)
    });
  }

  createPageControls(roleId: number, pageControls: any, roleName: string) {
    this.roleService.createPageControls(roleId, pageControls).subscribe(
      response => {
          console.log("Role has been added successful",response);
        this.addRoleDialogVisible = false;
        this.loadAllRoles();
      },
      error => {
        console.error('Error creating page controls:', error);
        this.showErrorMessage('Error creating page controls');
      }
    );
  }

  updateRole() {
    const permissionsControl = this.roleForm.get('permissions') as FormGroup;
    const pageIds = Object.keys(permissionsControl.value)
      .filter(key => permissionsControl.get(key)?.value)
      .map(key => parseInt(key));
    const roleData = {
      roleId: this.selectedRoleId,
      pageIds: pageIds
    };

    this.roleService.updateRolePages(roleData).subscribe({
      next: response => {
        console.log("Role has been added successful updated",response);

        this.editRoleDialogVisible = false;
        this.loadAllRoles();
      },
      error: error => console.error('Error updating role:', error)
    });
  }

  deleteRole(role: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this role?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Perform the deletion
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role deleted successfully' });
        this.loadAllRoles();
      },
      reject: () => {
        // Handle the rejection
      }
    });
  }

  showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  onAddRoleSave() {
    this.addRoleDialogVisible = false;
    this.loadAllRoles();
  }

  onAddRoleCancel() {
    this.addRoleDialogVisible = false;
  }

  onEditRoleSave() {
    this.editRoleDialogVisible = false;
    this.loadAllRoles();
  }

  onEditRoleCancel() {
    this.editRoleDialogVisible = false;
  }
}
