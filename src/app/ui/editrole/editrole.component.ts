import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule ,FormControl} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { NgFor } from '@angular/common';
import { Page, PagesResponse } from '../../Models/page.interface';
import { UpdateRolePagesDTO } from '../../Models/update.interface';
@Component({
  selector: 'app-editrole',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './editrole.component.html',
  styleUrl: './editrole.component.scss'
})
export class EditroleComponent {

  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
  }
  pages: Page[] = [];
  roleId:number=1;

  ngOnInit() {
    this.loadRoleData();

  }

  loadRoleData() {
    this.roleService.getPages().subscribe(
      (response: PagesResponse) => {
        if (response && response.$values) {
          this.pages = response.$values;
          const permissionsGroup: { [key: number]: [boolean] } = {};

          this.pages.forEach(page => {
            if (page.id != null) {
              permissionsGroup[page.id] = [false]; // Assuming all pages are selected by default
            }
          });
          this.roleForm = this.fb.group({
            role: [''],
            permissions: this.fb.group(permissionsGroup)
          });
          this.loadRolePermissions();

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => console.error('Error fetching pages:', error)
    );
  }

  loadRolePermissions() {
    this.roleService.getRoleById(this.roleId).subscribe(
      role => {
        this.roleForm.patchValue({
          role: role.name
        });

        this.roleService.getPagesByRoleId(this.roleId).subscribe(
          (response: any) => {
            if (response && response.$values && Array.isArray(response.$values)) {
              const rolePages = response.$values;

              const permissionsControl = this.roleForm.get('permissions') as FormGroup;

              rolePages.forEach((page: { id: { toString: () => any; } | null; }) => {
                if (page.id != null) {
                  permissionsControl.get(page.id.toString())?.setValue(true); // Set the checkbox as checked
                }
              });
            } else {
              console.error('rolePages is not an array:', response);
            }
          },
          error => console.error('Error fetching role pages:', error)
        );
      },
      error => console.error('Error fetching role:', error)
    );
  }
  updateRole() {
    const permissionsControl = this.roleForm.get('permissions') as FormGroup;
    const pageIds = Object.keys(permissionsControl.value)
      .filter(key => permissionsControl.get(key)?.value) // Get IDs where checkbox is checked
      .map(key => parseInt(key));
    const roleData: UpdateRolePagesDTO = {
      roleId: this.roleId,
      pageIds: pageIds
    };

    this.roleService.updateRolePages(
      roleData).subscribe({
      next: (response: any) => {
        console.log('Role updated successfully', response);
      },
      error: error => console.error('Error updating role:', error)
    });
  }







onCancel() {
  // Handle cancellation
  console.log('Cancelled');
}  
}
