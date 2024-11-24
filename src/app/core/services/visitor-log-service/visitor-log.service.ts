import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { VisitorLogResponse, VisitorLogResult } from '../../models/visitor-log.interface';
import { VisitorPassCodeDTO } from '../../models/visitor-pass-code.interface';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../shared-service/shared-data.service.service';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogService {
  private apiUrl = 'https://localhost:7121/VisitorLog';

  constructor(
    private sharedDataService : SharedService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  getVisitorLogToday(selectedLocation?: string): Observable<VisitorLogResponse> {
    const roleLocation = this.sharedDataService.getLocation();
    const locationName = selectedLocation || roleLocation;
    console.log("hi",locationName);
    const params = new HttpParams()
    .set('locationName', locationName);
    //.set('rolename', rolename);
    return this.http.get<VisitorLogResponse>(`${this.apiUrl}/VisitorLogList`,{ params })
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCheckInTimeAndCardNumber(id: number, updateVisitorPassCode: VisitorPassCodeDTO): Observable<VisitorLogResponse> {
    const username = this.getUser();
    return this.http.put<VisitorLogResponse>(`${this.apiUrl}/VisitorLogCheckIn/${id}`,{...updateVisitorPassCode,username} ).pipe(
      catchError(this.handleError)
    );
  }

  updateCheckOutTime(id: number): Observable<VisitorLogResponse> {
    return this.http.put<VisitorLogResponse>(`${this.apiUrl}/VisitorLogCheckOut/${id}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
   
    if (error.error?.errorMessages?.$values) {
      // Backend error message
      errorMessage = error.error.errorMessages.$values.join(', ');
    } 
    else if (error.status === 0) {
      // Network error
      errorMessage = 'Network error: Please check your internet connection or CORS configuration.';
    } 
    else {
      // Other server-side error
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.username || null;
      }
    }
    return null;
  }

  
}
