import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { NgFor } from '@angular/common';
import { Page, PagesResponse } from '../../Models/page.interface';
@Component({
  selector: 'app-editaddcomponet',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './editaddcomponet.component.html',
  styleUrl: './editaddcomponet.component.scss'
})
export class EditaddcomponetComponent {

  @Input() isEditMode = false;
  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({})
    });
  }
  pages: Page[] = [];
  // pages:any;

  ngOnInit() {
    this.roleService.getPages().subscribe(
      (response:PagesResponse) => {
        this.pages = response.$values;
        const permissionsGroup: { [key: number]: [boolean] } = {};
        console.log(this.pages);

        this.pages.forEach(page => {
          permissionsGroup[page.pageId] = [false];
          
        }
      );

        this.roleForm = this.fb.group({
          role: [''],
          permissions: this.fb.group(permissionsGroup)
        });
      },
      error => console.error('Error fetching pages:', error)
    );

  }
  createRole() {
    const roleData = {
      Name: this.roleForm.get('role')?.value,
      CreatedBy: 1, // Replace with actual user ID
      UpdatedBy: 1 ,// Replace with actual user ID
      Permissions: this.roleForm.get('permissions')?.value // Include permissions data

    };

    this.roleService.createRole(roleData).subscribe(
      (response: any) => {
        console.log('Role created successfully', response);
        console.log('Role created successfully', response.role.$id);
        
        if (response && response.role.$id) {
          const pageControls = Object.entries(roleData.Permissions)
            .filter(([_, isSelected]) => isSelected)
            .map(([pageId, _]) => ({ pageId: parseInt(pageId) }));
        
          this.createPageControls(response.role.roleId, pageControls);
        } else {
          console.error('Invalid response from createRole:', response);
        }
      },   
         (error:any) => {
          console.error('Error creating role:', error);
        }
    );
  }


        // if (response && response.role.$id) {
        //   this.createPageControls(response.role.$id,roleData.Permissions);
        // } else {
        //   console.error('Invalid response from createRole:', response);
        // }
      
      // },
      // error => {
      //   console.error('Error creating role:', error);
      // }
    // );
  
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
    // createPageControls(roleId: number,permissions: { [key: number]: boolean}) {
    //   console.log(roleId);

    //   const pageControls = Object.entries(permissions)
    // .filter(([_, isSelected]) => isSelected)
    // .map(([pageId, _]) => ({ pageId: parseInt(pageId) }));
    // console.log(roleId);

    //   this.roleService.createPageControls(roleId, pageControls).subscribe(
    //     () => {
    //       console.log(roleId);

    //       console.log('Role and permissions created successfully');
          
    //     },
    //     error => {
    //       console.error('Error creating page controls:', error);
    //     }
    //   );
    // }
  onCancel() {
    // Handle cancellation
    console.log('Cancelled');
  }
}
