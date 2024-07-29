import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../../../services/role.service';
import { Page,PagesResponse } from '../../../../Models/page.interface';
import { MessageService } from 'primeng/api';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-admin-add-role',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  providers: [MessageService],
  templateUrl: './admin-add-role.component.html',
  styleUrl: './admin-add-role.component.scss'
})
export class AdminAddRoleComponent {

  roleForm: FormGroup;
  pages: Page[] = [];

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private roleService: RoleService, private messageService: MessageService){
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
  }

  ngOnInit() {

    this.roleService.getPages().subscribe({
      next: (response: PagesResponse) => {
        console.log('Role created successfully', response);

        if (response && response.$values) {
          this.pages = response.$values;
          const permissionsGroup: { [key: number]: [boolean] } = {};

          this.pages.forEach(page => {
            if (page.id != null) {
              permissionsGroup[page.id] = [false];
            }
          });

          this.roleForm = this.fb.group({
            role: [''],
            permissions: this.fb.group(permissionsGroup)
          });
        } else {
          console.error('Invalid response format:', response);
        }

      },
      error: error => console.error('Error fetching pages:', error)
    });

  }
  createRole() {
    const roleData = {
      Name: this.roleForm.get('role')?.value,
      CreatedBy: 1, // Replace with actual user ID
      UpdatedBy: 1, // Replace with actual user ID
      Permissions: this.roleForm.get('permissions')?.value // Include permissions data
    };

    this.roleService.createRole(roleData).subscribe({
      next: (response: any) => {
        console.log('Role created successfully', response);

        if (response && response.id) {
          const pageControls = Object.entries(roleData.Permissions)
            .filter(([_, isSelected]) => isSelected)
            .map(([pageId, _]) => ({ pageId: parseInt(pageId) }));

          this.createPageControls(response.id, pageControls,roleData.Name);
        } else {
          console.error('Invalid response from createRole:', response);
        }
      },
      error: error => console.error('Error creating role:', error)
    });
  }
  createPageControls(roleId: number, pageControls: any,roleName: string) {
    this.roleService.createPageControls(roleId, pageControls).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Role "${roleName}" has been added successfully`
        });
        this.save.emit(); // Emit save event
      },
      error => {
        console.error('Error creating page controls:', error);
        this.showErrorMessage('Error creating page controls');      }
    );
  }

  showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
  onCancel() {
    this.cancel.emit(); // Emit cancel event
  }
}

