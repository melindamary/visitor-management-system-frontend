import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPurposeList } from '../../models/IPurposeList';
import { IPurposeResponse } from '../../models/IPurposeResponse'
import { IDeviceList } from '../../models/IDeviceList';
import { map } from 'rxjs/operators';
import { IDeviceResponse } from '../../models/IDeviceResponse';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }
 

  getContactPerson(): Observable<string[]> {
    const apiUrl = "https://localhost:7121/Visitor/GetPersonInContact";
    return this.http.get<{ $id: string, $values: string[] }>(apiUrl).pipe(
      map((response: { $id: string, $values: string[] }) => response.$values)
    );
  }
       
    
  getVisitPurpose(): Observable<IPurposeList[]> {
    const apiUrl = "https://localhost:7121/Purpose/GetPurposes/get-purposes-idAndName";
    return this.http.get<{ $id: string, $values: IPurposeList[] }>(apiUrl).pipe(
      map(response => response.$values)
    );
  }
      
  getDevice():Observable<IDeviceList[]>{
    const apiUrl="https://localhost:7121/Device/GetItems/get-device-id-name";
    return this.http.get<{ $id: string, $values: IDeviceList[] }>(apiUrl).pipe(
      map(response => response.$values)
    );
   }

   createVisitorAndAddItem(visitor:any):Observable<any[]>{
    console.log("log details",visitor);
    visitor.OfficeLocationId = 1;
    const apiUrl="https://localhost:7121/Visitor/CreateVisitorAndAddItem/create-and-add-item";
     return this.http.post<any>(apiUrl,visitor);
   }

  
addPurpose(purpose: string): Observable<IPurposeResponse> {
  const apiUrl = "https://localhost:7121/Purpose/PostPurpose"; // Adjust URL as per your API endpoint

  return this.http.post<IPurposeResponse>(apiUrl, { purposeName: purpose });
}
addDevice(device: { deviceName: string }): Observable<IDeviceResponse> {
  return this.http.post<IDeviceResponse>('https://localhost:7121/Device/PostDevice', device);
}
   
   

};

