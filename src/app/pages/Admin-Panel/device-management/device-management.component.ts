import { Component } from '@angular/core';
import { TableComponent } from '../../../shared-components/table/table.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './device-management.component.html',
  styleUrl: './device-management.component.scss',
})
export class DeviceManagementComponent {
  closeDialog() {
    throw new Error('Method not implemented.');
  }
  saveEdit() {
    throw new Error('Method not implemented.');
  }
  confirmDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  openEditModal(_t7: any) {
    throw new Error('Method not implemented.');
  }

  devices: any[] = [];
  totalItems: number = 0;
  columns: any[] = [
    { header: 'Visit Purpose', field: 'name', width: '22%' },
    { header: 'Created On', field: 'createdDate' },
    { header: 'Updated By', field: 'lastModifiedBy' },
    { header: 'Updated On', field: 'lastModifiedOn' },
    { header: 'Status', field: 'status' },
    { header: 'Actions', field: 'actions', width: '18%' },
  ];
  isEditModalVisible: boolean = false;
  selectedDevice: any;
}
