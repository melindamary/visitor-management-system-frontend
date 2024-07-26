import { Component } from '@angular/core';
import { VisitorLogService } from '../../../../core/services/visitorLogServices/visitor-log.service';
import { APIResponse } from '../../../../core/models/api-response.interface';
import { TableComponent } from "../../../../shared-components/table/table.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, DatePipe } from '@angular/common';
import { VisitorLogTilesComponent } from "../visitor-log-tiles/visitor-log-tiles.component";
import { VisitorLogDTO } from '../../../../core/models/visitor-log.interface';
import { VisitorPassCodeDTO } from '../../../../core/models/visitor-pass-code.interface';
import { VisitorDetailsDialogComponent } from "../visitor-details-dialog/visitor-details-dialog.component";

@Component({
  selector: 'app-visitor-log',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ToastModule,
    ConfirmDialogModule, InputTextModule, InputTextareaModule,
    CommonModule, InputNumberModule, TableComponent, TabViewModule,
    ButtonModule, FormsModule, VisitorLogTilesComponent, VisitorDetailsDialogComponent],
  providers: [MessageService, ConfirmationService, VisitorLogService,DatePipe],
  templateUrl: './visitor-log.component.html',
  styleUrl: './visitor-log.component.scss'
})
export class VisitorLogComponent {

  activeVisitorsCount = 0;
  totalVisitorsCount = 0;
  checkedOutVisitorsCount = 0;

  upcomingVisitors: VisitorLogDTO[] = [];
  activeVisitors: VisitorLogDTO[] = [];
  checkedOutVisitors: VisitorLogDTO[] = [];
  visitorsToday: VisitorLogDTO[] = [];
  
  currentTab: string = 'upcoming';
  visibleCheckInDialog = false;
  visibleDetailsDialog = false;
  selectedVisitor: VisitorLogDTO = {} as VisitorLogDTO;
  cardNumber = '';

  columnsUpcoming = [
    { field: 'id', header: 'Visitor Id' },
    { field: 'name', header: 'Visitor Name' },
    { field: 'purposeName', header: 'Purpose of Visit' },
    { field: 'phone', header: 'Phone Number' },
    { field: 'actions', header: 'Actions' }
  ];

  columnsActive = [
    { field: 'visitorPassCode', header: 'Visitor Pass Code' },
    { field: 'name', header: 'Visitor Name' },
    { field: 'purposeName', header: 'Purpose of Visit' },
    { field: 'checkInTime', header: 'Check-In Time', type: 'date' },
    { field: 'phone', header: 'Phone Number' },
    { field: 'actions', header: 'Actions' }
  ];

  columnsCheckedOut = [
    { field: 'id', header: 'Visitor Id' },
    { field: 'name', header: 'Visitor Name' },
    { field: 'purposeName', header: 'Purpose of Visit' },
    { field: 'checkInTime', header: 'Check-In Time', type: 'date' },
    { field: 'checkOutTime', header: 'Check-Out Time', type: 'date' },
    { field: 'visitorPassCode', header: 'Visitor Pass Code' },
    { field: 'phone', header: 'Phone Number' },
    { field: 'actions', header: 'Actions' }
  ];

  get visitorDataSource() {
    switch (this.currentTab) {
      case 'active':
        return this.activeVisitors;
      case 'checkedOut':
        return this.checkedOutVisitors;
      default:
        return this.upcomingVisitors;
    }
  }

  get visitorColumns() {
    switch (this.currentTab) {
      case 'active':
        return this.columnsActive;
      case 'checkedOut':
        return this.columnsCheckedOut;
      default:
        return this.columnsUpcoming;
    }
  }

  get totalItems() {
    switch (this.currentTab) {
      case 'active':
        return this.activeVisitorsCount;
      case 'checkedOut':
        return this.checkedOutVisitorsCount;
      default:
        return this.totalVisitorsCount;
    }
  }

  constructor(
    private visitorLogService: VisitorLogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) {}

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
          this.checkedOutVisitors = response.result.checkedOutVisitors.map(visitor => ({
            ...visitor,
            checkInTime: this.datePipe.transform(visitor.checkInTime, 'shortTime'),
            checkOutTime: this.datePipe.transform(visitor.checkOutTime, 'shortTime')
          }));
          console.log(response);
        console.log(response.result);
        } else {
          this.handleError(response.errorMessages);
        }
      },
      error: (error) => this.handleError(error.errorMessages)
    });
  }

  onTabChange(event: any): void {
    switch (event.index) {
      case 0:
        this.currentTab = 'upcoming';
        break;
      case 1:
        this.currentTab = 'active';
        break;
      case 2:
        this.currentTab = 'checkedOut';
        break;
      default:
        this.currentTab = 'upcoming';
        break;
    }
  }
  
  // onTabChange(event: TabViewChangeEvent): void {
  //   this.currentTab = event.index === 0 ? 'upcoming' : 'active';
  // }
  

  showDialog(visitor: VisitorLogDTO): void {
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

      this.visitorLogService.updateCheckInTimeAndCardNumber(this.selectedVisitor.id, updateVisitorPassCode).subscribe({
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
    this.visibleDetailsDialog = true;
    this.visibleCheckInDialog = false;
  }

  checkInVisitor(visitor: VisitorLogDTO): void {
    this.showDialog(visitor);
  }

  checkOutVisitor(visitor: VisitorLogDTO): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to check out ${visitor.name} with card number ${visitor.visitorPassCode}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'custom-accept-button',
      rejectButtonStyleClass: 'custom-reject-button',
      accept: () => {
        this.visitorLogService.updateCheckOutTime(visitor.id).subscribe({
          next: (response: APIResponse) => {
            if (response.isSuccess) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visitor checked out successfully', life: 3000 });
              this.loadVisitorLogToday();
            } else {
              this.handleError(response.errorMessages);
            }
          },
          error: (error) => this.handleError(error.errorMessages)
        });
      }
    });
  }

  handleDialogVisibilityChange(visible: boolean): void {
    if (!visible) {
      this.selectedVisitor = {} as VisitorLogDTO;
    }
    this.visibleDetailsDialog = visible;
  }

  private handleError(errorMessages?: string[]): void {
    console.error('Error:', errorMessages?.join(', '));
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessages?.join(', '), life: 3000 });
  }

}