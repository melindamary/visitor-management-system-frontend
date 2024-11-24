import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared-components/table/table.component';
import { VisitPurposeService } from '../../../../core/services/visit-purpose-service/visit-purpose.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

interface VisitPurpose {
  slNo: number;
  name: string;
  createdDate: Date;
  status: string;
  isEditing?: boolean;
}
@Component({
  selector: 'app-admin-visit-purpose-table',
  standalone: true,
  imports: [
    TableComponent,
    ButtonModule,
    DialogModule,
    NgIf,
    NgClass,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    TagModule
  ],
  templateUrl: './admin-visit-purpose-table.component.html',
  styleUrl: './admin-visit-purpose-table.component.scss',
})
export class AdminVisitPurposeTableComponent {
  constructor(
    private visitPurposeService: VisitPurposeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  visitPurposes: VisitPurpose[] = [];
  totalItems: number = 0;
  columns: any[] = [
    { header: 'Visit Purpose', field: 'name', width: '20%' },
    { header: 'Added On', field: 'createdDate' },
    { header: 'Updated By', field: 'lastModifiedBy', width: '20%' },
    { header: 'Updated On', field: 'lastModifiedOn' },
    { header: 'Status', field: 'status' },
    { header: 'Actions', field: 'actions', width: '18%' },
  ];
  isEditModalVisible: boolean = false;
  selectedPurpose: any;

  async getVisitPurposes(): Promise<void> {
    this.visitPurposes = await this.visitPurposeService.getVisitPurposes();
    this.visitPurposes.forEach((item) => (item.isEditing = false));
    console.log('Entered Visit Purposes: ', this.visitPurposes);
    this.totalItems = this.visitPurposes.length;
  }

  openEditModal(purpose: any) {
    this.selectedPurpose = { ...purpose }; // Create a copy of the object to avoid direct mutation
    this.isEditModalVisible = true;
  }
  closeDialog() {
    this.isEditModalVisible = false;
  }

  saveEdit() {
    var response = this.visitPurposeService
      .updatePurpose(this.selectedPurpose.id, this.selectedPurpose.name)
      .subscribe();
    console.log(response);

    // Close the dialog
    this.isEditModalVisible = false;
    this.selectedPurpose = null;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Visit Purpose Approved!',
      life: 3000,
    });
    setTimeout(() => {
      this.getVisitPurposes();
    }, 3000);
  }

  confirmDelete(id: number, message: string, status: number): void {
    this.confirmationService.confirm({
      key: 'visitPurposeConfirm',
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
        this.visitPurposeService.updatePurposeStatus(id,status).subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Deleted successfully!',
                life: 5000,
              });
              this.getVisitPurposes();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: response.errorMessages.join(', '),
                life: 5000,
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
    this.getVisitPurposes();
  }
}
