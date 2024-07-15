import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { VisitorLogService } from '../../../../core/services/visitorLogServices/visitor-log.service';
import { Visitor } from '../../../../core/models/visitor';

@Component({
  selector: 'app-upcoming-visitor-table',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, FormsModule, InputNumberModule],
  providers: [MessageService, ConfirmationService, VisitorLogService ],
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }`
  ],
  templateUrl: './upcoming-visitor-table.component.html',
  styleUrl: './upcoming-visitor-table.component.scss'
})
export class UpcomingVisitorTableComponent implements OnInit {
  pendingVisitors: Visitor[] = [];
  cols: { field: string, header: string }[] = [];
  visible: boolean = false;
  selectedVisitor: Visitor = {} as Visitor;

  showDialog(visitor: Visitor) {
    this.selectedVisitor = { ...visitor }; // Copy visitor details to selectedVisitor
    this.visible = true;
  } // Holds the selected visitor for dialog
  cardNumber: string = ''; // Holds the entered card number
  
  
  constructor(
    private visitorService: VisitorLogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.visitorService.getUpcomingVisitors().subscribe((data) => {
      this.pendingVisitors = data;
    });

    this.cols = [
      { field: 'visitorId', header: 'Visitor Id' },
      { field: 'name', header: 'Visitor Name' },
      { field: 'phoneNo', header: 'Phone Number' },
      { field: 'purposeOfVisit', header: 'Purpose of Visit' }
    ];
  }

  saveCheckInTime() {
    if (this.selectedVisitor.id) {
      console.log('Card Number:', this.cardNumber); // Log the card number to the console
      // Update the selectedVisitor object with the entered card number
      this.selectedVisitor.cardId = this.cardNumber; // Ensure property name matches the backend model
      this.visitorService.updateCheckInTimeAndCardNumber(this.selectedVisitor.id, this.selectedVisitor).subscribe({
        next: (data: Visitor) => {
          // Update the pendingVisitors array with the updated visitor data
          const index = this.findIndexById(this.selectedVisitor.id);
          if (index !== -1) {
            this.pendingVisitors[index] = data;
          }
          this.pendingVisitors = this.pendingVisitors.filter((val) => val.id !== this.selectedVisitor.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Check-in time updated successfully', life: 3000 });
          this.visible = false;
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating visitor:', error);
        }
      });
    }
  }
  

  findIndexById(id: number): number {
    return this.pendingVisitors.findIndex(c => c.id === id);
  }

  deleteRequest(visitor: Visitor) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${visitor.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.visitorService.deleteVisitor(visitor.id).subscribe(() => {
          this.pendingVisitors = this.pendingVisitors.filter((val) => val.id !== visitor.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visitor request removed', life: 3000 });
        });
      }
    });
  }
}
