import { ChangeDetectionStrategy,Component, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { AdminButtonSubmitComponent } from "../../../../../ui/admin-button-submit/admin-button-submit.component";
import { AdminButtonCancelComponent } from "../../../../../ui/admin-button-cancel/admin-button-cancel.component";
import { UserManagementServiceService } from '../../../../../core/services/UserManagementServices/user-management-service.service';
import { GetIdAndName } from '../../../../../core/models/getIdAndName.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { alphabetValidator, passwordMatchValidator } from './custom-validators';
import { AddNewUser } from '../../../../../core/models/addNewUser.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule,NgFor,ReactiveFormsModule,NgIf,
     MatDatepickerModule, MatButtonModule, MatIconModule, AdminButtonSubmitComponent, AdminButtonCancelComponent],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAddUserComponent {
  selectedLocation!:string;
  selectedRole!: string;
  showRoleDetails: boolean = false;
  isVisible: boolean = false;
  Roles: GetIdAndName[]=[];
  Locations: GetIdAndName[]=[];
  addUserForm !: FormGroup  
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
 
/**
 *
 */
constructor(private apiService: UserManagementServiceService,private datePipe: DatePipe) {

  this.initializeForm();


}
initializeForm() {
  
  const currentDate = new Date();
    const transformedDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');

    this.addUserForm = new FormGroup({
      RoleId: new FormControl('', [Validators.required]),
      LocationId: new FormControl('', [Validators.required]),
      Date: new FormControl(transformedDate, [Validators.required]),
      FirstName: new FormControl('', [Validators.required,alphabetValidator()]),
      LastName: new FormControl('', [Validators.required,alphabetValidator()]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),        
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  },{
    validators: passwordMatchValidator('password', 'confirmPassword')
  });
}
passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');
  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { 'mismatch': true };
}

ngOnInit(){
  this.loadRoleIdAndName().subscribe((response: GetIdAndName[]) => {
    this.Roles = response;
  });
  this.loadLocationIdAndName().subscribe((response: GetIdAndName[]) => {
    this.Locations = response;
  });

}
 
loadRoleIdAndName(): Observable<GetIdAndName[]> {
  return this.apiService.getRoleIdAndName();
}

loadLocationIdAndName(): Observable<GetIdAndName[]> {
 return this.apiService.getLocationIdAndName();
   
}
  onRoleChange(roleId: string): void {
    // Handle role change
    console.log('Selected Role ID:', roleId);
  }

  onLocationChange(locationId: string): void {
    // Handle role change
    console.log('Selected Location ID:', locationId);
  }




  toggleHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleHideConfirmPassword(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
 
 // component.ts
onSubmit() {
  if (this.addUserForm.valid) {
    const formValues = this.addUserForm.value;
    const username = formValues.username;

    // Check if the username exists
    // this.apiService.checkUsernameExists(username).subscribe(
    //   exists => {
    //     if (exists) {
    //       // Username exists, show error message
    //       alert('Username already exists. Please choose a different username.');
    //     } 
    //     else 
        // {
          // Username does not exist, proceed with user creation
          const dto: AddNewUser = {
            userName: username,
            password: formValues.password,
            validFrom: formValues.Date,
            officeLocationId: formValues.LocationId,
            firstName: formValues.FirstName,
            lastName: formValues.LastName,
            phone: formValues.PhoneNumber,
            address: formValues.Address,
            roleId: formValues.RoleId
          };

          this.apiService.postNewUser(dto).subscribe(
            response => {
              console.log('User created successfully', response);
              alert('User Added');
            },
            error => {
              console.error('Error creating user', error);
            }
          );
        }
    //   },
    //   error => {
    //     console.error('Error checking username', error);
    //   }
    // );
  }
// }

}