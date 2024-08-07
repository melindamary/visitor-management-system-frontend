import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableComponent } from '../../../shared-components/table/table.component';
import { LocationService } from '../../../core/services/location-management/location.service';
import { ApiResponse, LocationDetails, UpdateLocation } from '../../../core/models/location-details.interface';

@Component({
  selector: 'app-location-management',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    InputNumberModule,
    TableComponent,
    TabViewModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    ToolbarModule,
  ],
  providers: [LocationService, MessageService, ConfirmationService, DatePipe],
  templateUrl: './location-management.component.html',
  styleUrl: './location-management.component.scss'
})
export class LocationManagementComponent implements OnInit {
  locations: LocationDetails[] = [];
  locationDataSource: LocationDetails[] = [];
  totalItems: number = 0;
  errorMessages: string[] = [];
  selectedLocation: LocationDetails | null = null; // Use null initially
  locationDialog: boolean = false;
  submitted: boolean = false;
  locationForm: FormGroup;
  private readonly phonePattern = /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{4,}$/;


  locationColumns = [
    { field: 'name', header: 'Location' },
    { field: 'address', header: 'Address' },
    { field: 'phone', header: 'Phone' },
    { field: 'createdDate', header: 'Added On' },
    { field: 'actions', header: 'Actions' }
  ];

  constructor(
    private locationService: LocationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.locationForm = this.fb.group({
      id: [null], // Include id in the form
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]]
      });
  }

  ngOnInit(): void {
    this.loadLocationDetails();
  }

  loadLocationDetails(): void {
    this.locationService.getAllLocationDetails().subscribe({
      next: (response: LocationDetails[]) => {
        this.locations = response.map(location => ({
          ...location,
          createdDate: this.getFormattedDate(location.createdDate)
        }));
        this.locationDataSource = this.locations;
        this.totalItems = this.locations.length;
      }
    });
  }

  openNewLocationDialog(): void {
    this.locationForm.reset(); // Reset the form
    this.locationForm.patchValue({ id: null }); // Reset the id field
    this.selectedLocation = null; // Clear the selected location
    this.submitted = false;
    this.locationDialog = true;
  }

  hideDialog(): void {
    this.locationDialog = false;
    this.submitted = false;
  }

  editLocation(location: LocationDetails): void {
    this.locationForm.setValue({
      id: location.id, // Include id in the form
      name: location.name,
      address: location.address,
      phone: location.phone
    });
    this.selectedLocation = location; // Set the selected location
    this.locationDialog = true;
  }

  saveLocation(): void {
    this.submitted = true;

    if (this.locationForm.invalid) {
      return;
    }

    const locationData: LocationDetails = this.locationForm.value;

    if (locationData.id) {
      this.locationService.updateLocation(locationData.id, locationData).subscribe({
        next: (response: ApiResponse<UpdateLocation>) => {
          if (response.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Location updated successfully',
              life: 3000
            });
            this.loadLocationDetails();
            this.locationDialog = false;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.errorMessages.join(', '),
              life: 3000
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating location.',
            life: 3000
          });
        }
      });
    } else {
      this.locationService.addLocation(locationData).subscribe({
        next: (response: ApiResponse<UpdateLocation>) => {
          if (response.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Location added successfully',
              life: 3000
            });
            this.loadLocationDetails();
            this.locationDialog = false;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.errorMessages.join(', '),
              life: 3000
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while adding location.',
            life: 3000
          });
        }
      });
    }
  }

  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
}
