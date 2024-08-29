import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule ,FormControl, Validators} from '@angular/forms';
import { RoleService } from '../../../../core/services/role-service/role.service';
import { NgFor, NgIf } from '@angular/common';
import { Page, PagesResponse } from '../../../../core/models/page.interface';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-addrole',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,NgIf,Button,MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule],
  providers: [ConfirmationService, MessageService],

  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.scss'
})
export class AddroleComponent {
  roleForm: FormGroup;
  formSubmitted = false;


  private router = inject(Router);

  constructor(private fb: FormBuilder, private roleService: RoleService,    private messageService: MessageService
  ) {
    this.roleForm = this.fb.group({
      role: ['',Validators.required],
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
          this.roleForm.setControl('permissions', this.fb.group(permissionsGroup));

          // this.roleForm = this.fb.group({
          //   role: [''],
          //   permissions: this.fb.group(permissionsGroup)
          // });
        } else {
          console.error('Invalid response format:', response);
        }

      },
      error: error => console.error('Error fetching pages:', error)
    });

  }
  createRole() {
    this.formSubmitted = true;

    if (this.roleForm.invalid || !this.isAnyPermissionSelected()) {
      this.showErrorMessage('Please ensure all fields are correctly filled.');
      return;
    }
    const roleData = {
      Name: this.roleForm.get('role')?.value,
      CreatedBy: 1, // Replace with actual user ID
      UpdatedBy: 1, // Replace with actual user ID
      status:1,
      Permissions: this.roleForm.get('permissions')?.value // Include permissions data
    };

    this.roleService.createRole(roleData).subscribe({
      next: (response: any) => {
        console.log('Role created successfully', response);
        console.log("status",roleData.status);
        

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
        console.log("status",status);
        
        const navigationExtras: NavigationExtras = {
          state: { message: `Role "${roleName}" has been added successfully` }
        };
        this.router.navigate(['/vms/admin-panel'], navigationExtras);        
        // Handle the response as needed
      },
      error => {
        console.error('Error creating page controls:', error);
        this.showErrorMessage('Error creating page controls');      }
    );
  }
  isAnyPermissionSelected(): boolean {
    const permissions = this.roleForm.get('permissions')?.value;
    return Object.values(permissions).includes(true);
  }
  showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  onCancel() {
    this.router.navigate(['/vms/admin-panel'])
  }
}

