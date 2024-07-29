import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule ,FormControl} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { NgFor } from '@angular/common';
import { Page, PagesResponse } from '../../Models/page.interface';
import { UpdateRolePagesDTO } from '../../Models/update.interface';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editrole',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './editrole.component.html',
  styleUrl: './editrole.component.scss'
})
export class EditroleComponent {

  roleForm: FormGroup;
  private router = inject(Router);

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.roleId = navigation.extras.state['roleId'];
    } else {
      // Handle the case where no roleId was provided
      console.error('No roleId provided');
      this.router.navigate(['/sharedtable']); // Redirect back to roles list
    }
  }
  pages: Page[] = [];
  roleId!: number;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    if (this.roleId) {
      this.loadRoleData();
    }
  

    // this.route.params.subscribe(params => {
    //   this.roleId = +params['id']; // Convert string to number
    //   this.loadRoleData();
    // });
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
        const navigationExtras: NavigationExtras = {
          state: { message: `Role  has been Updated successfully` }
        };
        this.router.navigate(['/sharedtable'], navigationExtras);        
      },
      error: error => console.error('Error updating role:', error)
    });
  }





  goBack() {
    this.router.navigate(['/sharedtable']);
  }

 
}
