import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AdminButtonSubmitComponent } from '../../../../../ui/admin-button-submit/admin-button-submit.component';
import { AdminButtonCancelComponent } from '../../../../../ui/admin-button-cancel/admin-button-cancel.component';
import { UserManagementServiceService } from '../../../../../core/services/user-management-service/user-management-service.service';
import { GetIdAndName } from '../../../../../core/models/getIdAndName.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { alphabetValidator, numberValidator, passwordMatchValidator } from '../../../../../pages/admin-panel/user-management/components/admin-add-user/custom-validators';
import { alphabetValidator, futureDateValidator, numberValidator, passwordMatchValidator } from './custom-validators';
import { AddNewUser } from '../../../../../core/models/addNewUser.interface';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../core/services/shared-service/shared-data.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    ReactiveFormsModule,
    NgIf,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    AdminButtonSubmitComponent,
    AdminButtonCancelComponent,
  ],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAddUserComponent {
  selectedLocation!: string;
  selectedRole!: string;
  showRoleDetails: boolean = false;
  isVisible: boolean = false;
  Roles: GetIdAndName[] = [];
  Locations: GetIdAndName[] = [];
  addUserForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  currentUserRole = this.sharedService.getRole();

  constructor(
    private apiService: UserManagementServiceService,
    private router: Router,
    private sharedService: SharedService,
    private datePipe: DatePipe
  ) {
    this.initializeForm();
  }
  initializeForm() {
    const currentDate = new Date();
    const transformedDate = this.datePipe.transform(
      currentDate,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );

    this.addUserForm = new FormGroup(
      {
        RoleId: new FormControl('', [Validators.required]),
        LocationId: new FormControl('', [Validators.required]),
        Date: new FormControl(transformedDate, [Validators.required, futureDateValidator()]),
        FirstName: new FormControl('', [
          Validators.required,
          alphabetValidator(),
        ]),
        LastName: new FormControl('', [
          Validators.required,
          alphabetValidator(),
        ]),
        PhoneNumber: new FormControl('', [Validators.required,numberValidator()]),
        Address: new FormControl('', [Validators.required]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  ngOnInit() {
    this.loadRoleIdAndName().subscribe((response: GetIdAndName[]) => {
      // Filter out the "SuperAdmin" role if the current user is an admin
      this.Roles = response.filter(
        (role) =>
          !(this.currentUserRole === 'Admin' && role.name === 'SuperAdmin')
      );
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
  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    return d ? d.getTime() >= today.getTime() : false;
  };
  toggleHideConfirmPassword(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  checkIfUsernameExists(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const username = inputElement?.value || '';
    console.log('Username entered:', username);
  
    this.apiService.checkUsernameExists(username).subscribe(
      (exists) => {
        console.log('response of username exists', exists);
        if (exists.result) {
          // Username exists, set custom error
          this.addUserForm.get('username')?.setErrors({ usernameExists: true });
        } else {
          // If no error, clear the error
          this.addUserForm.get('username')?.setErrors(null);
        }
      }
    );
  }
  

  // component.ts
  onSubmit() {
    if (this.addUserForm.valid) {
      const formValues = this.addUserForm.value;
      const username = formValues.username;
      const loginUserName = this.sharedService.getUsername();
      console.log('current logged in user', loginUserName);

      // Check if the username exists
      this.apiService.checkUsernameExists(username).subscribe(
        (exists) => {
          console.log('response of check if username exists', exists);
          if (exists.result) {
            // Username exists, show error message
            alert(
              'Username already exists. Please choose a different username.'
            );
          } 
          else
          {
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
              roleId: formValues.RoleId,
              loginUserName:loginUserName
            };

            this.apiService.postNewUser(dto).subscribe(
              response => {
                console.log('User created successfully', response);
                alert('User Added');
                this.router.navigate(['/vms/admin-panel']);
              },
              error => {
                console.error('Error creating user', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error checking username', error);
        }
      );
    }
  }
}
