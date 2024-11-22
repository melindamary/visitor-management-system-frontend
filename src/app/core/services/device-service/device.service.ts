import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient, private datePipe: DatePipe,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  baseUrl = environment.apiUrl;
  devices:any[] = [];

  fetchDevices(): Observable<any>{
    const url = `${this.baseUrl}/Device/DeviceList`;
    return this.http.get(url);
  }

  async getDevices(): Promise<any> {
    try {
        const response = await this.fetchDevices().toPromise();
        var devicesData = response.result.$values;
        console.log("hi devices", response.result.$values);
        this.devices = devicesData.map((item: any, index: any) => ({
            id: item.id,
            slNo: index + 1,
            name: item.name,
            createdDate: this.datePipe.transform(item.createdDate,'dd-MM-yyyy'),
            status: item.status == 0? 'Pending' : 'Approved',
            lastModifiedBy: item.updatedBy? item.updatedBy : 'Visitor',
            lastModifiedOn: item.updatedDate ? this.datePipe.transform(item.updatedDate,'dd-MM-yyyy') : "-"
        }));
        console.log("Reports to be sent back: ", this.devices);
        return this.devices;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
  }

  updatePurpose(id: number, device: string): Observable<any>{
    var username = this.getUser();
    const url = `${this.baseUrl}/Device/Device`;
    const body = { Id: id, Device: device, Username: username };
    // console.log(body);
    return this.http.put(url, body);
  }

  updateDeviceStatus(id: number, status: number): Observable<any>{
    console.log("Deleted successfully",id)
    var username = this.getUser();
    const url = `${this.baseUrl}/Device/DeviceStatus`;
    const body = { Id: id, Status: status, Username: username };
    var response = this.http.put(url, body);
    return response;
  }

  getUser(){
    if (isPlatformBrowser(this.platformId)) {
      var authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.username || null;
      }
    }
  }

 
}
