import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule ,FormControl} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { NgFor } from '@angular/common';
import { Page, PagesResponse } from '../../Models/page.interface';
@Component({
  selector: 'app-addrole',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.scss'
})
export class AddroleComponent {
  roleForm: FormGroup;


  constructor(private fb: FormBuilder, private roleService: RoleService) {
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

          this.createPageControls(response.id, pageControls);
        } else {
          console.error('Invalid response from createRole:', response);
        }
      },
      error: error => console.error('Error creating role:', error)
    });
  }
  createPageControls(roleId: number, pageControls: any) {
    this.roleService.createPageControls(roleId, pageControls).subscribe(
      (response: any) => {
        console.log('Page controls created successfully', response);
        alert("page and role conneted sucessfully");

        // Handle the response as needed
      },
      error => {
        console.error('Error creating page controls:', error);
      }
    );
  }
  onCancel() {
    // Handle cancellation
    console.log('Cancelled');
  }
}

