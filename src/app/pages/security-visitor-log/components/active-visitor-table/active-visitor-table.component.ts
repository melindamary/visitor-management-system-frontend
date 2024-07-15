import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { VisitorLogService } from '../../../../core/services/visitorLogServices/visitor-log.service';
import { Visitor } from '../../../../core/models/visitor';

@Component({
  selector: 'app-active-visitor-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, ToastModule,ConfirmDialogModule, DialogModule, DropdownModule],
  providers: [MessageService, ConfirmationService, VisitorLogService],
  templateUrl: './active-visitor-table.component.html',
  styleUrl: './active-visitor-table.component.scss'
})
export class ActiveVisitorTableComponent {
  activeVisitors: Visitor[]=[];
  cols: { field: string, header: string }[] = [];
  constructor(
    private visitorService: VisitorLogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadActiveVisitors();
    this.cols = [
            { field: 'cardId', header: 'Card Id' },
            { field: 'name', header: 'Visitor Name' },
            { field: 'phoneNo', header: 'Phone Number' },
            { field: 'purposeOfVisit', header: 'Purpose of Visit' },
            { field: 'checkInTime', header: 'Check-In' }
        ];
  }

  loadActiveVisitors() {
    this.visitorService.getActiveVisitorsToday().subscribe((data: Visitor[]) => {
      this.activeVisitors = data;
      this.activeVisitors.forEach(visitor => {
        if (visitor.checkInTime) {
          visitor.checkInTime = new Date(visitor.checkInTime).toLocaleTimeString(); // Format check-in time
        }
      });
    });
  }

  checkOut(visitor: Visitor) {
    this.confirmationService.confirm({
      message: `Are you sure you want to check out ${visitor.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.visitorService.updateCheckOutTime(visitor.id).subscribe((response) => {
          console.log(response);
          this.activeVisitors = this.activeVisitors.filter(v => v.id !== visitor.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visitor checked out successfully', life: 3000 });
        });
      }
    });
  }

}
