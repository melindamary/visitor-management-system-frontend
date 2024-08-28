import { Component } from '@angular/core';
import { TableComponent } from '../../../shared-components/table/table.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../../core/services/device-service/device.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-device-management',
  standalone: true,
  imports: [
    TableComponent,
    ToastModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    NgIf,
    NgClass,
    FormsModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './device-management.component.html',
  styleUrl: './device-management.component.scss',
})
export class DeviceManagementComponent {
  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  devices: any[] = [];
  totalItems: number = 0;
  columns: any[] = [
    { header: 'Device', field: 'name' },
    { header: 'Added On', field: 'createdDate' },
    { header: 'Updated By', field: 'lastModifiedBy' },
    { header: 'Updated On', field: 'lastModifiedOn' },
    { header: 'Status', field: 'status' },
    { header: 'Actions', field: 'actions', width: '12%' },
  ];
  isEditModalVisible: boolean = false;
  selectedDevice: any;

  async getDevices(): Promise<void> {
    this.devices = await this.deviceService.getDevices();
    this.devices.forEach((item) => (item.isEditing = false));
    console.log('Entered Devices: ', this.devices);
    this.totalItems = this.devices.length;
  }

  openEditModal(device: any) {
    this.selectedDevice = { ...device }; // Create a copy of the object to avoid direct mutation
    this.isEditModalVisible = true;
  }

  closeDialog() {
    this.isEditModalVisible = false;
  }

  saveEdit() {
    var response = this.deviceService
      .updatePurpose(this.selectedDevice.id, this.selectedDevice.name)
      .subscribe();
    console.log(response);

    //Close the dialog
    this.isEditModalVisible = false;
    this.selectedDevice = null;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Device Approved!',
      life: 3000,
    });
    setTimeout(() => {
      this.getDevices();
    }, 3000);
  }

  confirmDelete(id: number,message: string, status: number): void {
    this.confirmationService.confirm({
      key: 'deviceConfirm',
      message: message,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'custom-accept-button',
      rejectButtonStyleClass: 'custom-reject-button',
      accept: () => {
        this.deviceService.updateDeviceStatus(id,status).subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Deleted successfully!',
                life: 3000,
              });
              this.getDevices();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: response.errorMessages.join(', '),
                life: 3000,
              });
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
              life: 3000,
            });
          },
        });
      },
    });
  }

  ngOnInit() {
    this.getDevices();
  }
}
