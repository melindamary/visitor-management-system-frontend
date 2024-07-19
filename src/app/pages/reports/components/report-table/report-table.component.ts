import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import * as XLSX from 'xlsx';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { reports } from '../../../../../../public/data';
import { Report, Column } from '../../../../core/models/report.interface';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    ToolbarModule
  ],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
})
export class ReportTableComponent {
  selectedMonth: Date | undefined;
  selectedYear: Date | undefined;
  rangeDates: Date[] | undefined;
  selectedReports: any[] = [];
  filteredReports: any[] = [];
  startDate!: Date;
  endDate!: Date;
  cols: Column[] = [
    { field: 'name', header: 'Name', width: '9%' },
    { field: 'phoneNumber', header: 'Phone Number', width: '11%' },
    { field: 'visitDate', header: 'Visit Date', width: '9%' },
    { field: 'officeLocation', header: 'Office Location', width: '12%' },
    { field: 'visitPurpose', header: 'Visit Purpose', width: '10%' },
    { field: 'hostName', header: 'Host Name', width: '11%' },
    { field: 'onDutyStaff', header: 'On-duty Staff', width: '10%' },
    { field: 'staffContactNumber', header: 'Staff Contact', width: '10%' },
    { field: 'checkIn', header: 'Check-In', width: '8%' },
    { field: 'checkOut', header: 'Check-Out', width: '14%' },
  ];
  customHeaders: { [key: string]: string } = {
    slNo: 'Sl. No.',
    name: 'Name',
    phoneNumber: 'Phone Number',
    visitDate: 'Visit Date',
    officeLocation: 'Office Location',
    visitPurpose: 'Visit Purpose',
    hostName: 'Host Name',
    onDutyStaff: 'On-duty Staff',
    staffContactNumber: 'Staff Contact',
    checkIn: 'Check-In',
    checkOut: 'Check-Out',
    // Add more field mappings as needed
  };

  filterByMonth(): void {
    if (this.selectedMonth) {
      const selectedMonth = this.selectedMonth.getMonth(); // month is zero-based
      const selectedYear = this.selectedMonth.getFullYear();

      this.filteredReports = reports.filter((report) => {
        const reportDate = new Date(report.visitDate);
        return (
          reportDate.getMonth() === selectedMonth &&
          reportDate.getFullYear() === selectedYear
        );
      });
    } else {
      this.filteredReports = reports;
    }
  }

  filterByYear(): void {
    if (this.selectedYear) {
      const selectedYear = this.selectedYear.getFullYear();

      this.filteredReports = reports.filter((report) => {
        const reportDate = new Date(report.visitDate);
        return reportDate.getFullYear() === selectedYear;
      });
    } else {
      this.filteredReports = reports;
    }
  }

  filterByDateRange() {
    if (this.rangeDates && this.rangeDates.length === 2) {
      const startDate = new Date(this.rangeDates[0]);
      const endDate = new Date(this.rangeDates[1]);

      this.filteredReports = reports.filter((report) => {
        const reportDate = new Date(report.visitDate); // Replace 'date' with your date field
        return reportDate >= startDate && reportDate <= endDate;
      });
    } else {
      this.filteredReports = reports; // Show all reports if no date range is selected
    }
  }
  
  exportSelectedToExcel() {
    if (this.selectedReports.length > 0) {
      // Clone the selectedReports to modify headers
      const dataToExport = this.selectedReports.map((report) => {
        const newReport: { [key: string]: any } = {}; // Use an index signature
        Object.keys(report).forEach((key) => {
          const customHeader = this.customHeaders[key] || key.toUpperCase();
          newReport[customHeader] = report[key];
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

      worksheet['!cols'] = colWidths;

      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      XLSX.writeFile(workbook, 'SelectedReports.xlsx');
    } else {
      alert('Please select at least one report to export.');
    }
  }

  viewDetails(_t31: any) {
    throw new Error('Method not implemented.');
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
    ]; // Add all the fields you want to be sortable here
    return sortableFields.includes(field);
  }

  ngOnInit(): void {
    this.filteredReports = reports;
  }
}
