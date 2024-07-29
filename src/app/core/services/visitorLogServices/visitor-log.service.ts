import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { VisitorLogResponse, VisitorLogResult } from '../../models/visitor-log.interface';
import { VisitorPassCodeDTO } from '../../models/visitor-pass-code.interface';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogService {
  private apiUrl = 'https://localhost:7121/VisitorLog';

  constructor(private http: HttpClient) {}

  getVisitorLogToday(): Observable<VisitorLogResponse> {
    return this.http.get<VisitorLogResponse>(`${this.apiUrl}/GetVisitorLogToday`)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCheckInTimeAndCardNumber(id: number, updateVisitorPassCode: VisitorPassCodeDTO): Observable<VisitorLogResponse> {
    return this.http.put<VisitorLogResponse>(`${this.apiUrl}/UpdateCheckInTimeAndCardNumber/${id}`, updateVisitorPassCode).pipe(
      catchError(this.handleError)
    );
  }

  updateCheckOutTime(id: number): Observable<VisitorLogResponse> {
    return this.http.put<VisitorLogResponse>(`${this.apiUrl}/UpdateCheckOutTime/${id}`, {}).pipe(
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

  
}
