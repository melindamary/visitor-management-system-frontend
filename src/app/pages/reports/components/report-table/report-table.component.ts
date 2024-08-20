import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import * as XLSX from 'xlsx';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  columns,
  customHeaders,
} from '../../../../../../public/report-table-columns';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ReportService } from '../../../../core/services/report-service/report.service';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { LocationService } from '../../../../core/services/location-management/location.service';
import { ViewDetailsModalComponent } from "../view-details-modal/view-details-modal.component";

interface Locations {
  name: string;
}
@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
    RouterOutlet,
    ReactiveFormsModule,
    ViewDetailsModalComponent,
  
],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
})
export class ReportTableComponent {
  constructor(
    public reportService: ReportService,
    private locationService: LocationService
  ) {}

  selectedMonth: Date | undefined;
  selectedYear: Date | undefined;
  selectedDate!: Date | '';
  selectedStartDate!: Date | '';
  selectedEndDate!: Date | '';
  selectedLocation: Locations | null = null;
  rangeDates: Date[] | undefined;
  selectedReports: any[] = [];
  filteredReports: any[] = [];
  startDate!: Date;
  endDate!: Date;
  reports: any[] = [];
  cols: any[] = columns;
  customHeaders: { [key: string]: string } = customHeaders;
  viewDetailsDialog: boolean = false;
  visitorDetails: any;
  searchTerms: { [key: string]: string } = {};

  locations: { name: string }[] = [];

  fetchLocations():any{
      this.locationService.getAllLocationDetails().subscribe((response) => {
        console.log(response);
        this.locations = response.map(item => ({
          name: item.name
        }));
        console.log(this.locations);
      })
  }

  async fetchReport(): Promise<void> {
    console.log('Entered Reports');
    this.reports = await this.reportService.getReport();
    this.filteredReports = this.reports;
    console.log('Filtered Reports 2' + this.filteredReports);
  }

  filterReports() {
    this.filteredReports = this.reports.filter((report) => {
      for (const field in this.searchTerms) {
        if (this.searchTerms[field]) {
          const fieldValue = report[field]?.toString().toLowerCase() || '';
          const searchTerm = this.searchTerms[field].toLowerCase();
          if (!fieldValue.includes(searchTerm)) {
            return false;
          }
        }
      }
      return true;
    });
    console.log('Filtered reports:', this.filteredReports);
  }

  filterByDate() {
    if (this.selectedStartDate) {
      this.filteredReports = this.reports.filter((report) => {
        const reportDate = this.parseDate(report.visitDate);
        return (
          reportDate.toLocaleDateString() ===
          new Date(this.selectedStartDate).toLocaleDateString()
        );
      });
    } else {
      this.filteredReports = [...this.reports];
    }
  }

  filterByDateRange() {
    console.log('Start date:', this.selectedStartDate);
    console.log('End date:', this.selectedEndDate);
    if (this.selectedStartDate && this.selectedEndDate) {
      this.filteredReports = this.reports.filter((report) => {
        const reportDate = this.parseDate(report.visitDate);
        return (
          reportDate >= new Date(this.selectedStartDate) &&
          reportDate <= new Date(this.selectedEndDate)
        );
      });
    } else {
      this.filteredReports = [...this.reports];
    }
  }

  // filterByDateRange() {
  //   if (this.rangeDates && this.rangeDates.length === 2) {
  //     const startDate = new Date(this.rangeDates[0]);
  //     const endDate = new Date(this.rangeDates[1]);

  //     this.filteredReports = this.reports.filter((report) => {
  //       const reportDate = this.parseDate(report.visitDate); // Replace 'date' with your date field
  //       return reportDate >= startDate && reportDate <= endDate;
  //     });
  //   } else {
  //     this.filteredReports = this.reports; // Show all reports if no date range is selected
  //   }
  // }

  filterByLocation() {
    console.log('Location: ', this.selectedLocation?.name);

    if (this.selectedLocation) {
      this.filteredReports = this.reports.filter((report) => {
        return report.officeLocation === this.selectedLocation?.name;
      });
    } else {
      this.filteredReports = this.reports; // Show all reports if no location is selected
    }
  }

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are 0-based in JavaScript Date
  }

  exportSelectedToExcel() {
    if (this.selectedReports.length > 0) {
      // Clone the selectedReports to modify headers
      const dataToExport = this.selectedReports.map((report) => {
        const newReport: { [key: string]: any } = {}; // Use an index signature
        Object.keys(report).forEach((key) => {
          if (key !== 'photo' && key !== 'visitorId') {
            const customHeader = this.customHeaders[key] || key.toUpperCase();
            newReport[customHeader] = report[key];
          }
          if (key === 'devices' && report['deviceCount'] > 0) {
            // Format the devices' name and serial number as a single string
            const devices = report[key]
              .map((device: any) => `${device.name} (SN: ${device.serialNumber})`)
              .join(', ');
  
            const customHeader = this.customHeaders[key] || key.toUpperCase();
            newReport[customHeader] = devices;
            console.log('Devices to be in excel: ', newReport[customHeader]);
          }
        });
        return newReport;
      });
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

      const workbook: XLSX.WorkBook = {
        Sheets: { 'Visitor Report': worksheet },
        SheetNames: ['Visitor Report'],
      };
      const date1 = new Date(this.selectedStartDate);
      console.log(date1.getUTCDate() + 1);
      const startDate = date1.getUTCDate() + 1;
      const startMonth = date1.getUTCMonth() + 1;
      const startYear = date1.getUTCFullYear();
      let formattedStartDate = startDate + '-' + startMonth + '-' + startYear;

      const date2 = new Date(this.selectedEndDate);
      console.log(date2.getUTCDate() + 1);
      const endDate = date2.getUTCDate() + 1;
      const endMonth = date2.getUTCMonth() + 1;
      const endYear = date2.getUTCFullYear();
      let formattedEndDate = endDate + '-' + endMonth + '-' + endYear;

      if (
        this.selectedStartDate != undefined &&
        this.selectedEndDate == undefined
      ) {
        console.log('Logging workbook: ', workbook);
        XLSX.writeFile(
          workbook,
          'Experion Visitor Report (' + formattedStartDate + ').xlsx'
        );
        console.log(startDate + '/' + startMonth + '/' + startYear);
      } else if (
        this.selectedStartDate != undefined &&
        this.selectedEndDate != undefined
      ) {
        console.log('Logging workbook: ', workbook);
        XLSX.writeFile(
          workbook,
          'Experion Visitor Report (' +
            formattedStartDate +
            ' to ' +
            formattedEndDate +
            ').xlsx'
        );
      } else if (
        this.selectedStartDate == (undefined || null) &&
        this.selectedEndDate == (undefined || null)
      ) {
        console.log('Logging workbook: ', workbook);
        XLSX.writeFile(workbook, 'Experion Visitor Report.xlsx');
      }
    } else {
      alert('Please select at least one report to export.');
    }
  }

  resetReport() {
    this.filteredReports = this.reports;
    this.rangeDates = undefined;
    this.selectedMonth = undefined;
    this.selectedYear = undefined;
    this.selectedStartDate = '';
    this.selectedEndDate = '';
  }
  viewDetails(rowData: any) {
    console.log('Row data: ', rowData);
    this.viewDetailsDialog = true;
    console.log('Hi view details:', this.viewDetailsDialog);
    this.visitorDetails = rowData;
    // this.router.navigate(['/vms/reports/details'], { state: { visitorId: rowData.visitorId } });
  }
  handleDialogClose() {
    this.viewDetailsDialog = false;
  }
  isSortable(field: string): boolean {
    const sortableFields = [
      'name',
      'phoneNumber',
      'visitDate',
      'officeLocation',
      'visitPurpose',
      'hostName',
      'onDutyStaff',
      'staffContactNumber',
      'checkIn',
      'checkOut',
    ]; // Add all the fields to be sorted here
    return sortableFields.includes(field);
  }

  ngOnInit(): void {
    this.fetchReport();
    this.fetchLocations();
  }
}
