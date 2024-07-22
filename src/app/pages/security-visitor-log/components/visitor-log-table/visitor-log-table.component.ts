import { Component } from '@angular/core';
import { VisitorLogDTO } from '../../../../core/models/visitor-log-dto';
import { VisitorLogService } from '../../../../core/services/visitorLogServices/visitor-log.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { APIResponse } from '../../../../core/models/api-response';
import { VisitorPassCodeDTO } from '../../../../core/models/visitor-pass-code-dto';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-visitor-log-table',
  standalone: true,
  imports: [
    TableModule, DialogModule, RippleModule, ButtonModule, ToastModule,
    ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule,
    CommonModule, DropdownModule, TagModule, FormsModule, InputNumberModule,TabViewModule],
  providers: [MessageService, ConfirmationService, VisitorLogService, DatePipe],
  templateUrl: './visitor-log-table.component.html',
  styleUrl: './visitor-log-table.component.scss'
})
export class VisitorLogTableComponent {
  activeVisitorsCount: number = 0;
  totalVisitorsCount: number = 0;
  checkedOutVisitorsCount: number = 0;
  upcomingVisitors: VisitorLogDTO[] = [];
  activeVisitors: VisitorLogDTO[] = [];
  visitorsToday: VisitorLogDTO[] = [];
  currentTab: string = 'upcoming';
  visibleCheckInDialog: boolean = false;
  visibleDetailsDialog: boolean = false;
  selectedVisitor: VisitorLogDTO = {} as VisitorLogDTO;
  cardNumber: string = '';

  columnsUpcoming = [
    { field: 'visitorId', header: 'Visitor Id' },
    { field: 'visitorName', header: 'Visitor Name' },
    { field: 'phone', header: 'Phone Number' },
    { field: 'purposeName', header: 'Purpose of Visit' },
    { field: 'actions', header: 'Actions' }
  ];

  columnsActive = [
    { field: 'visitorPassCode', header: 'Visitor Pass Code' },
    { field: 'visitorName', header: 'Visitor Name' },
    { field: 'phone', header: 'Phone Number' },
    { field: 'purposeName', header: 'Purpose of Visit' },
    { field: 'checkInTime', header: 'Check-In Time' , type: 'date'},
    { field: 'actions', header: 'Actions' }
  ];

  constructor(private visitorLogService: VisitorLogService,private messageService: MessageService,
    private confirmationService: ConfirmationService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadVisitorLogToday();
  }

  loadVisitorLogToday(): void {
    this.visitorLogService.getVisitorLogToday().subscribe({
      next: (response: APIResponse) => {
      if (response.isSuccess) {
        this.activeVisitorsCount = response.result.activeVisitorsCount;
        this.totalVisitorsCount = response.result.totalVisitorsCount;
        this.checkedOutVisitorsCount = response.result.checkedOutVisitorsCount;
        this.upcomingVisitors = response.result.upcomingVisitors;
        this.activeVisitors = response.result.activeVisitors.map(visitor => ({
          ...visitor,
          checkInTime: this.datePipe.transform(visitor.checkInTime, 'shortTime')
        }));
        this.visitorsToday = response.result.visitorsToday;
        console.log(response);
        console.log(response.result);
      }else {
        console.error('Error:', response.errorMessages?.join(', '));
      }
    },
    error: (error) => {
      console.error('Error loading visitor counts:', error);
    }
  });
  }

  get columnsToDisplay() {
    return this.currentTab === 'active' ? this.columnsActive : this.columnsUpcoming;
  }

  get dataSource() {
    return this.currentTab === 'active' ? this.activeVisitors : this.upcomingVisitors;
  }

  onTabChange(event: any): void {
    this.currentTab = event.index === 0 ? 'upcoming' : 'active';
  }

  showDialog(visitor: VisitorLogDTO){
    this.selectedVisitor = { ...visitor };
    this.cardNumber = '';
    this.visibleCheckInDialog = true;
    this.visibleDetailsDialog = false;
  }

  saveCheckInTime(): void {
    if (this.selectedVisitor) {
      const updateVisitorPassCode: VisitorPassCodeDTO = {
        visitorPassCode: this.cardNumber
      };

      this.visitorLogService.updateCheckInTimeAndCardNumber(this.selectedVisitor.visitorId, updateVisitorPassCode).subscribe({
        next: (response: APIResponse) => {
          if (response.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Check-in time updated successfully', life: 3000 });
            this.loadVisitorLogToday(); // Refresh the visitor log data
            this.visibleCheckInDialog = false;
          } else {
            console.error('Error:', response.errorMessages?.join(', '));
            alert(response.errorMessages?.join(', ')); // Show error message
          }
        },
        error: (error) => {
          console.error('Error updating visitor:', error);
          alert(error.error.errorMessages?.join(', ')); // Show error message
        }
      });
    }
  }

  viewVisitor(visitor: VisitorLogDTO): void {
    this.selectedVisitor = { ...visitor };
    console.log('Selected visitor photoBase64:', this.selectedVisitor.photoBase64);
    this.visibleDetailsDialog = true;
    this.visibleCheckInDialog = false;
  }

  checkInVisitor(visitor: VisitorLogDTO): void {
    this.showDialog(visitor);
  }

  checkOutVisitor(visitor: VisitorLogDTO): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to check out ${visitor.visitorName} with card number ${visitor.visitorPassCode}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'custom-accept-button',
      rejectButtonStyleClass: 'custom-reject-button',
      accept: () => {
        this.visitorLogService.updateCheckOutTime(visitor.visitorId).subscribe({
          next: (response: APIResponse) => {
            if (response.isSuccess) {
              // this.activeVisitors = this.activeVisitors.filter(v => v.visitorId !== visitor.visitorId);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visitor checked out successfully', life: 3000 });
              this.loadVisitorLogToday();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.errorMessages?.join(', '), life: 3000 });
            }
          },
          error: (error) => {
            console.error('Error checking out visitor:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error checking out visitor', life: 3000 });
          }
        });
      }
    });
  }
}
