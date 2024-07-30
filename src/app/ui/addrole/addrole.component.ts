import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule ,FormControl} from '@angular/forms';
import { RoleService } from '../../core/services/role-service/role.service';
import { NgFor } from '@angular/common';
import { Page, PagesResponse } from '../../core/models/page.interface';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-addrole',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  providers: [ConfirmationService, MessageService],

  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.scss'
})
export class AddroleComponent {
  roleForm: FormGroup;

  private router = inject(Router);

  constructor(private fb: FormBuilder, private roleService: RoleService,    private messageService: MessageService
  ) {
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
  }
  pages: Page[] = [];

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
        console.log('Page controls created successfully', response);
        const navigationExtras: NavigationExtras = {
          state: { message: `Role "${roleName}" has been added successfully` }
        };
        this.router.navigate(['/sharedtable'], navigationExtras);        
        // Handle the response as needed
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
    this.router.navigate(['/sharedtable'])
  }
}

