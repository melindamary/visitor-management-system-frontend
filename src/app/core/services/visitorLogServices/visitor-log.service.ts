import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { APIResponse } from '../../models/api-response.interface';
import { VisitorPassCodeDTO } from '../../models/visitor-pass-code.interface';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogService {
  private apiUrl = 'https://localhost:7121/VisitorLog';

  constructor(private http: HttpClient) {}

  getVisitorLogToday(): Observable<APIResponse> {
    return this.http.get<any>(`${this.apiUrl}/GetVisitorLogToday`)
    .pipe(
      map(response => {
        // Transform response to match VisitorLogResult structure
        if (response.isSuccess) {
          return {
            ...response,
            result: {
              ...response.result,
              upcomingVisitors: response.result.upcomingVisitors.$values,
              activeVisitors: response.result.activeVisitors.$values,
              checkedOutVisitors: response.result.checkedOutVisitors.$values,
              visitorsToday: response.result.visitorsToday.$values,
            }
          };
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateCheckInTimeAndCardNumber(id: number, updateVisitorPassCode: VisitorPassCodeDTO): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.apiUrl}/UpdateCheckInTimeAndCardNumber/${id}`, updateVisitorPassCode)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCheckOutTime(id: number): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.apiUrl}/UpdateCheckOutTime/${id}`, {})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}

