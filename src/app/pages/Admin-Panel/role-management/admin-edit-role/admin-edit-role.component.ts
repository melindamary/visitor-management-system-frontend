import { Component, EventEmitter, Inject, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../../../services/role.service'; 
import { Page,PagesResponse } from '../../../../Models/page.interface';
import { UpdateRolePagesDTO } from '../../../../Models/update.interface'; 
import { NgFor, NgIf } from '@angular/common';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],

  templateUrl: './admin-edit-role.component.html',
  styleUrl: './admin-edit-role.component.scss'
})
export class AdminEditRoleComponent {

  


  roleForm: FormGroup;

  @Input() roleId!: number;

  pages: Page[] = [];
  private router = inject(Router);


  constructor(private fb: FormBuilder, private roleService: RoleService) {
    
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
  }

  ngOnChanges(changes: any) {
    if (changes.roleId && this.roleId) {
      this.loadRoleData();
    }
  }

  loadRoleData() {
    this.roleService.getPages().subscribe((response: PagesResponse) => {
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
        this.loadRolePermissions();
      } else {
        console.error('Invalid response format:', response);
      }
    }, error => console.error('Error fetching pages:', error));
  }

  loadRolePermissions() {
    this.roleService.getRoleById(this.roleId).subscribe(role => {
      this.roleForm.patchValue({ role: role.name });
      console.log(role.name );
      
      this.roleService.getPagesByRoleId(this.roleId).subscribe((response: any) => {
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
      }, error => console.error('Error fetching role pages:', error));
    }, error => console.error('Error fetching role:', error));
  }

  updateRole() {
    const permissionsControl = this.roleForm.get('permissions') as FormGroup;
    const pageIds = Object.keys(permissionsControl.value).filter(key => permissionsControl.get(key)?.value).map(key => parseInt(key));
    const roleData: UpdateRolePagesDTO = { roleId: this.roleId, pageIds: pageIds };

    this.roleService.updateRolePages(roleData).subscribe({
      next: (response: any) =>{
        this.router.navigate(['/sharedtable'], {
          state: { message: `Role has been updated successfully` }
        });

      },
      error: error => console.error('Error updating role:', error)
    });
  }


  onCancel() {
      this.router.navigate(['/sharedtable']);
    }


}
