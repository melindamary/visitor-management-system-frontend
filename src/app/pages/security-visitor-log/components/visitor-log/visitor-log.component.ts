import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitorLog, VisitorLogResponse } from '../../../../core/models/visitor-log.interface';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VisitorLogService } from '../../../../core/services/visitorLogServices/visitor-log.service';
import { VisitorPassCodeDTO } from '../../../../core/models/visitor-pass-code.interface';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TableComponent } from '../../../../shared-components/table/table.component';
import { VisitorDetailsDialogComponent } from '../visitor-details-dialog/visitor-details-dialog.component';
import { VisitorLogTilesComponent } from '../visitor-log-tiles/visitor-log-tiles.component';

@Component({
  selector: 'app-visitor-log',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ToastModule,
    ConfirmDialogModule, InputTextModule, InputTextareaModule,
    CommonModule, InputNumberModule, TabViewModule, ButtonModule,
    FormsModule, VisitorLogTilesComponent, TableComponent, 
    VisitorDetailsDialogComponent, TooltipModule],
  providers: [MessageService, ConfirmationService, VisitorLogService, DatePipe],
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.scss']
})
export class VisitorLogComponent implements OnInit {

  activeVisitorsCount = 0;
  totalVisitorsCount = 0;
  checkedOutVisitorsCount = 0;

  upcomingVisitors: VisitorLog[] = [];
  activeVisitors: VisitorLog[] = [];
  checkedOutVisitors: VisitorLog[] = [];
  visitorsToday: VisitorLog[] = [];
  
  currentTab: string = 'upcoming';
  visibleCheckInDialog = false;
  visibleDetailsDialog = false;
  selectedVisitor: VisitorLog = {} as VisitorLog;
  cardNumber = '';
  showTotalVisitorsModal = false;
  activeIndex = 0;

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
    { field: 'phone', header: 'Phone Number' },
    { field: 'actions', header: 'Actions' }
  ];

  totalvisitorColumns = [
    { field: 'name', header: 'Visitor Name' },
    { field: 'purposeName', header: 'Purpose of Visit' },
    { field: 'phone', header: 'Phone Number' }, 
    { field: 'hostName', header: 'Host name' }
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
        return this.upcomingVisitors.length;
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
      next: (response: VisitorLogResponse) => {
        if (response.isSuccess) {
          console.log(response);
          this.activeVisitorsCount = response.result.activeVisitorsCount;
          this.totalVisitorsCount = response.result.totalVisitorsCount;
          this.checkedOutVisitorsCount = response.result.checkedOutVisitorsCount;
          this.upcomingVisitors = response.result.upcomingVisitors.$values;
          this.activeVisitors = response.result.activeVisitors.$values.map(visitor => ({
            ...visitor,
            checkInTime: this.datePipe.transform(visitor.checkInTime, 'shortTime')
          }));
          this.visitorsToday = response.result.visitorsToday.$values;
          this.checkedOutVisitors = response.result.checkedOutVisitors.$values.map(visitor => ({
            ...visitor,
            checkInTime: this.datePipe.transform(visitor.checkInTime, 'shortTime'),
            checkOutTime: this.datePipe.transform(visitor.checkOutTime, 'shortTime')
          }));
          console.log(response);
          console.log(response.result);
        }
      //   } 
      else {
          console.error('Error:', response.errorMessages);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.errorMessages.join(', '), life: 3000 });
        }
      }
    });
  }

  onTabChange(event: any): void {
    const index = event.index;
    switch (index) {
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

  selectTab(tab: string): void {
    switch (tab) {
      case 'active':
        this.activeIndex = 1;
        break;
      case 'checkedOut':
        this.activeIndex = 2;
        break;
      case 'total':
        this.activeIndex = 3;
        this.showTotalVisitorsModal = true;
        break;
      default:
        this.activeIndex = 0;
        break;
    }
  }

  
  

  showDialog(visitor: VisitorLog): void {
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
        next: (response: VisitorLogResponse) => {
          if (response.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Check-in time updated successfully', life: 3000 });
            this.loadVisitorLogToday(); // Refresh the visitor log data
            this.visibleCheckInDialog = false;
          } else {
            console.error('Error:', response.errorMessages);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.errorMessages.join(', '), life: 3000 });
          }
        },
        error: (error) => {
          console.error('Error updating visitor:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message || 'Error updating visitor', life: 3000 });
        }
      });
    }
  }

  viewVisitor(visitor: VisitorLog): void {
    this.selectedVisitor = { ...visitor };
    this.visibleDetailsDialog = true;
    this.visibleCheckInDialog = false;
  }

  checkInVisitor(visitor: VisitorLog): void {
    this.showDialog(visitor);
  }

  checkOutVisitor(visitor: VisitorLog): void {
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
          next: (response: VisitorLogResponse) => {
            if (response.isSuccess) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visitor checked out successfully', life: 3000 });
              this.loadVisitorLogToday();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.errorMessages.join(', '), life: 3000 });
            }
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message || 'Error checking out visitor', life: 3000 });
          }
        });
      }
    });
  }

  handleDialogVisibilityChange(visible: boolean): void {
    if (!visible) {
      this.selectedVisitor = {} as VisitorLog;
    }
    this.visibleDetailsDialog = visible;
  }

}
