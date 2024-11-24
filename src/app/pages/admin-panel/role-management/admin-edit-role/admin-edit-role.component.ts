import { Component, inject, Input } from '@angular/core';
import { RoleService } from '../../../../core/services/role-service/role.service';
import { Page, PagesResponse } from '../../../../core/models/page.interface';
import { UpdateRolePagesDTO } from '../../../../core/models/update.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule ,FormControl, Validators} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,Button,NgIf,MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule],
  providers: [ConfirmationService, MessageService],  templateUrl: './admin-edit-role.component.html',
  styleUrl: './admin-edit-role.component.scss'
})
export class AdminEditRoleComponent {
  roleForm: FormGroup;
  formSubmitted = false;
  // status:number=0;
  updatedBy:number=2;


  private router = inject(Router);

  constructor(private fb: FormBuilder, private roleService: RoleService, private messageService: MessageService) {
    this.roleForm = this.fb.group({
      role: ['',Validators.required],
      status: [1, Validators.required], // Changed to number

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
  // private route = inject(ActivatedRoute);

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
            status:1,
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
        console.log('Role loaded from server:', role); // Debugging

        this.roleForm.patchValue({
          role: role.name,
          status: role.status || 1 // Ensure the status is set correctly

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
    this.formSubmitted = true;

    if (this.roleForm.invalid || !this.isAnyPermissionSelected()) {
      this.showErrorMessage('Please ensure all fields are correctly filled.');
      return;
    }
    const permissionsControl = this.roleForm.get('permissions') as FormGroup;
    const pageIds = Object.keys(permissionsControl.value)
      .filter(key => permissionsControl.get(key)?.value) // Get IDs where checkbox is checked
      .map(key => parseInt(key));
    const roleData: UpdateRolePagesDTO = {
      roleId: this.roleId,
      status: this.roleForm.get('status')?.value, // Use the form value
      updatedBy:this.updatedBy,
      pageIds: pageIds
    };
    console.log('Role data:', roleData); // For debugging
    console.log('Status:', roleData.status); // Additional debug for status

    this.roleService.updateRolePages(
      roleData).subscribe({
      next: (response: any) => {
        console.log(roleData.status);
        
        console.log('Role updated successfully', response);
        const navigationExtras: NavigationExtras = {
          state: { message: `Role  has been Updated successfully` }
        };
        this.router.navigate(['/vms/sharedtable'], navigationExtras);        
      },
      error: error => console.error('Error updating role:', error)
    });
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
  onRadioChange(value: number) {
    console.log('Radio change detected:', value); // Debugging

    this.roleForm.get('status')?.setValue(value);
    console.log("value of role",value);
    console.log('Updated form status value:', this.roleForm.get('status')?.value); // Debugging

    
  }
  // onRadioChange(value: number) {
  //   console.log("status change",value);
    
  //   this.roleForm.patchValue({ activeState: value });
  //   // this.status=value;
  // }
  onCancel() {
    this.router.navigate(['/vms/admin-panel'])
  }

}
