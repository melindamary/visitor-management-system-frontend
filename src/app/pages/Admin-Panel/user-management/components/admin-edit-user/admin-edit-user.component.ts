import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminAddUserComponent } from '../admin-add-user/admin-add-user.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminButtonSubmitComponent } from "../../../../../ui/admin-button-submit/admin-button-submit.component";
import { AdminButtonCancelComponent } from "../../../../../ui/admin-button-cancel/admin-button-cancel.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { GetIdAndName } from '../../../../../core/models/getIdAndName.interface';
import { UserService } from '../../../../../core/services/UserManagementServices/User.service';
import { UserManagementServiceService } from '../../../../../core/services/UserManagementServices/user-management-service.service';
import { UserByIdOverview, UserOverview } from '../../../../../core/models/user-overview-display.interface';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { alphabetValidator, passwordMatchValidator } from '../admin-add-user/custom-validators';

@Component({
  selector: 'app-admin-edit-user',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatRadioModule, NgFor, FormsModule, ReactiveFormsModule,
    MatSelectModule, MatDatepickerModule, NgIf, MatButtonModule, MatIconModule, AdminButtonSubmitComponent, AdminButtonCancelComponent],
  providers: [AdminAddUserComponent, DatePipe],
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditUserComponent {
  selectedLocation!: string;
  selectedRole!: string;
  selectedState!: boolean;

  Roles: GetIdAndName[] = [];
  Locations: GetIdAndName[] = [];
  user: any = {};
  userEditForm!: FormGroup;
  isActive!: number;

  edit: boolean = false;
  showInput: boolean = true;
  editLocation: boolean = false;
  showInputLocation: boolean = true;
  editValidDate: boolean = false;
  showInputValidDate: boolean = true;

  resetPassword: boolean = false;
  formattedValidFrom: string | null = null;

  fieldStates: any = {
    hidePassword: true,
    hideConfirmPassword: true,
    hideOldPassword: true,
    isPhoneEditable: true,
    isAddressEditable: true
  };

  constructor(
    private fb: FormBuilder,
    private adduser: AdminAddUserComponent,
    private datePipe: DatePipe,
    private apiService: UserManagementServiceService,
    private userService: UserService
  ) {
    this.userEditForm = this.fb.group({
      RoleId: ['', Validators.required],
      LocationId: ['', Validators.required],
      validFrom: [null, Validators.required],
      activeState: ['', Validators.required],
      firstName: ['', [Validators.required, alphabetValidator()]],
      lastName: ['', [Validators.required, alphabetValidator()]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: [''],
      confirmPassword: ['']
    }, {
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

  ngOnInit(): void {
    this.loadRoles();
    this.loadLocations();

    const userId = this.userService.getUserId();
    if (userId !== null && userId !== undefined) {
      console.log('Editing user with ID:', userId);

      this.loadUserData(userId);
    } else {
      console.error('No user ID found');
    }
  }

  loadUserData(userId: number): void {
    console.log(userId);
    this.apiService.getUserById(userId).subscribe({
      next: (response: UserByIdOverview) => {
        console.log('User by ID Response:', response);
        this.user = response;
        this.isActive = this.user.isActive ? 1 : 0;
        console.log(this.isActive);

        this.formattedValidFrom = this.datePipe.transform(response.validFrom, 'dd-MM-yyyy');

        this.userEditForm.patchValue({
          RoleId: this.user.roleId,
          LocationId: this.user.officeLocationId,
          validFrom: new Date(this.user.validFrom),
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          activeState: this.isActive,
          phone: this.user.phone,
          address: this.user.address
        });

        console.log("test", this.userEditForm);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      }
    });
  }

  loadRoles(): void {
    this.adduser.loadRoleIdAndName().subscribe((roles: GetIdAndName[]) => {
      this.Roles = roles;
    });
  }

  loadLocations(): void {
    this.adduser.loadLocationIdAndName().subscribe((locations: GetIdAndName[]) => {
      this.Locations = locations;
    });
  }

  formatDate(date: Date | null): string {
    if (date) {
      return date.toISOString();
    }
    return '';
  }

  onRoleChange(value: string) {
    this.userEditForm.patchValue({ RoleId: value });
  }

  changeToEditRole() {
    this.edit = !this.edit;
    this.showInput = !this.showInput;
  }

  changeToEditLocation() {
    this.editLocation = !this.editLocation;
    this.showInputLocation = !this.showInputLocation;
  }

  changeToEditValidDate() {
    this.editValidDate = !this.editValidDate;
    this.showInputValidDate = !this.showInputValidDate;
  }

  toggleFieldState(field: string): void {
    this.fieldStates[field] = !this.fieldStates[field];
  }

  onLocationChange(value: string) {
    this.userEditForm.patchValue({ LocationId: value });
  }

  onRadioChange(value: string) {
    console.log("status change", value);
    this.userEditForm.patchValue({ activeState: value });
  }

  OnresetPassword() {
    this.resetPassword = !this.resetPassword;
  }

  OnSubmit(): void {
    if (this.userEditForm.valid) {
      const formValues = this.userEditForm.value;
      const validFrom = formValues.validFrom ? this.formatDate(formValues.validFrom) : null;

      const updatedUser: any = {
        userId: this.user.userId,
        username: formValues.username,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phone: formValues.phone,
        address: formValues.address,
        officeLocationId: formValues.LocationId,
        roleId: formValues.RoleId,
        validFrom: validFrom,
        isActive: formValues.activeState
      };

      if (this.resetPassword) {
        updatedUser.password = formValues.password;
      }

      this.apiService.updateUserData(this.user.userId, updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully', response);
          alert("User updated successfully");
        },
        error: (error) => {
          console.error('Error updating user', error);
        }
      });
    }
  }
}
