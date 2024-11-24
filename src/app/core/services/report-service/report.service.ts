import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  reports: any[] = [];
  result: any[] = [];
  baseUrl = environment.apiUrl;

  fetchReport(): Observable<any> {
    var response = this.http.get(`${this.baseUrl}/Report/VisitorList`);
    return response;
  }

  async getReport(): Promise<any> {
    try {
      const response = await this.fetchReport().toPromise();
      var reportData = response.result.$values;
      console.log(reportData);
      this.reports = reportData.map((item: any, index: any) => ({
        slNo: index + 1,
        visitorId: item.visitorId,
        name: this.capitalize(item.visitorName),
        phoneNumber: item.phone,
        visitDate: this.datePipe.transform(item.visitDate, 'dd-MM-yyyy'),
        officeLocation: this.capitalize(item.locationName),
        visitPurpose: this.capitalize(item.purposeName.trim()),
        hostName: this.capitalize(item.hostName),
        onDutyStaff: this.capitalize(item.staffName),
        staffContactNumber: item.staffPhoneNumber,
        checkIn: this.datePipe.transform(item.checkInTime, 'hh:mm a'),
        checkOut: this.datePipe.transform(item.checkOutTime, 'hh:mm a'),
        photo: item.photo,
        deviceCount: item.deviceCount,
        devices: item.devices.$values,
      }));
      console.log('Reports to be sent back: ', this.reports);
      return this.reports;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  //fetch visitor details by visitor id
  getVisitorDetailsById(id: number): Observable<any> {
    var response = this.http.get(`${this.baseUrl}/Report/Visitor/${id}`);
    return response;
  }

  //capitalize the first letter of each word
  capitalize(str: string) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
}
