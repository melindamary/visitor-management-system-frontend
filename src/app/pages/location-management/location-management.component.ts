import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableComponent } from '../../shared-components/table/table.component';
import { LocationService } from '../../core/services/location-management/location.service';
import { ApiResponse, LocationDetails } from '../../core/models/location-details.interface';

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
    ToolbarModule,
    InputNumberModule,
    TableComponent,
    TabViewModule,
    ButtonModule,
    FormsModule,
  ],
  providers: [LocationService, MessageService, ConfirmationService],
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.scss']
})
export class LocationManagementComponent implements OnInit {
  locations: LocationDetails[] = [];
  locationDataSource: LocationDetails[] = [];
  totalItems: number = 0;
  errorMessages: string[] = [];
  selectedLocation: LocationDetails = {} as LocationDetails;
  locationDialog: boolean = false;
  submitted: boolean = false;

  locationColumns = [
    { field: 'name', header: 'Location' },
    { field: 'address', header: 'Address' },
    { field: 'phone', header: 'Phone' },
    { field: 'actions', header: 'Actions' }
  ];

  constructor(
    private locationService: LocationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadLocationDetails();
  }

  loadLocationDetails(): void {
    this.locationService.getAllLocationDetails().subscribe({
      next: (response: LocationDetails[]) => {
        this.locations = response;
        this.locationDataSource = this.locations;
        this.totalItems = this.locations.length;
      }
    });
  }

  openNewLocationDialog() {
    this.selectedLocation = {} as LocationDetails;
    this.submitted = false;
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationDialog = false;
    this.submitted = false;
  }

  editLocation(location: LocationDetails): void {
    this.selectedLocation = { ...location };
    this.locationDialog = true;
  }

  saveLocation(): void {
    this.submitted = true;
  
    if (!this.selectedLocation.name || !this.selectedLocation.address || !this.selectedLocation.phone) {
      return;
    }
  
    if (this.selectedLocation.id) {
      this.locationService.updateLocation(this.selectedLocation.id, this.selectedLocation).subscribe({
        next: (response: ApiResponse<string>) => {
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
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:  'An error occurred while updating location.',
            life: 3000
          });
        }
      });
    } else {
      this.locationService.addLocation(this.selectedLocation).subscribe({
        next: (response: ApiResponse<string>) => {
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
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'An error occurred while adding location.',
            life: 3000
          });
        }
      });
    }
  }
  
}
