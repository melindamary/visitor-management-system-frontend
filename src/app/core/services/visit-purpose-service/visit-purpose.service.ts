import { DatePipe, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitPurposeService {

  constructor(private http: HttpClient, private datePipe: DatePipe,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  baseUrl = 'https://localhost:7121';
  visitPurposes:any[] = [];

  fetchVisitPurposes(): Observable<any>{
    var response = this.http.get(`${this.baseUrl}/PurposeOfVisit/GetPurposeList`);
    return response;
  }

  async getVisitPurposes(): Promise<any> {
    try {
        const response = await this.fetchVisitPurposes().toPromise();
        var visitPurposesData = response.$values;
        console.log("hi", response.$values);
        this.visitPurposes = visitPurposesData.map((item: any, index: any) => ({
            id: item.id,
            slNo: index + 1,
            name: item.name,
            createdDate: this.datePipe.transform(item.createdDate,'dd-MM-yyyy'),
            status: item.status == 0? 'Not Approved' : 'Approved',
            lastModifiedBy: item.updatedBy? item.updatedBy : 'Visitor',
            lastModifiedOn: item.updatedDate ? this.datePipe.transform(item.updatedDate,'dd-MM-yyyy') : "-"
        }));
        console.log("Reports to be sent back: ", this.visitPurposes);
        return this.visitPurposes;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
  }

  updatePurpose(id: number, purpose: string): Observable<any>{
    var username = this.getUser();
    const url = `${this.baseUrl}/PurposeOfVisit/UpdatePurpose`;
    const body = { Id: id, Purpose: purpose, Username: username };
    // console.log(body);
    return this.http.put(url, body);
  }

  deletePurpose(id: number): Observable<any>{
    console.log("Deleted successfully",id)
    var response = this.http.delete(`${this.baseUrl}/PurposeOfVisit/DeletePurpose/${id}`);
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
