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
    ReactiveFormsModule
  ],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
})
export class ReportTableComponent {
  constructor(public reportService: ReportService) {}
  selectedMonth: Date | undefined;
  selectedYear: Date | undefined;
  selectedDate!: Date | '';
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

  locations: { name: string }[] = [
    { name: 'Gayathri' },
    { name: 'Thejaswini' },
    { name: 'Athulya' },
    // Add more locations as needed
  ];
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
    if (this.selectedDate) {
      this.filteredReports = this.reports.filter((report) => {
        const reportDate = this.parseDate(report.visitDate);
        return (
          reportDate.toLocaleDateString() ===
          new Date(this.selectedDate).toLocaleDateString()
        );
      });
    } else {
      this.filteredReports = [...this.reports];
    }
  }
  filterByYear(): void {
    if (this.selectedYear) {
      const selectedYear = this.selectedYear.getFullYear();

      console.log('Selected year 1: ' + this.selectedYear.getFullYear());

      this.filteredReports = this.reports.filter((report) => {
        const reportDate = this.parseDate(report.visitDate);
        return reportDate.getFullYear() === selectedYear;
      });
      console.log('Filtered reports 1: ' + this.filteredReports);
    } else {
      this.filteredReports = this.reports;
    }
  }

  filterByDateRange() {
    if (this.rangeDates && this.rangeDates.length === 2) {
      const startDate = new Date(this.rangeDates[0]);
      const endDate = new Date(this.rangeDates[1]);

      this.filteredReports = this.reports.filter((report) => {
        const reportDate = this.parseDate(report.visitDate); // Replace 'date' with your date field
        return reportDate >= startDate && reportDate <= endDate;
      });
    } else {
      this.filteredReports = this.reports; // Show all reports if no date range is selected
    }
  }

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
          if (key !== 'photo') {
            const customHeader = this.customHeaders[key] || key.toUpperCase();
            newReport[customHeader] = report[key];
          }
        });
        return newReport;
      });
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

      // Set column widths to auto
      const colWidths = dataToExport.map((row) =>
        Object.keys(row).map((key) => ({
          wch: Math.max(
            ...dataToExport.map((r) => (r[key] ? r[key].toString().length : 0))
          ),
        }))
      )[0];

      worksheet['!columns'] = colWidths;

      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      XLSX.writeFile(workbook, 'SelectedVisitorReports.xlsx');
    } else {
      alert('Please select at least one report to export.');
    }
  }

  resetReport() {
    this.filteredReports = this.reports;
    this.rangeDates = undefined;
    this.selectedMonth = undefined;
    this.selectedYear = undefined;
    this.selectedDate = '';
  }
  viewDetails(rowData: any) {
    console.log('Row data: ', rowData);
    this.viewDetailsDialog = true;
    this.visitorDetails = rowData;
    // this.router.navigate(['/vms/reports/details'], { state: { visitorId: rowData.visitorId } });
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
  }
}
