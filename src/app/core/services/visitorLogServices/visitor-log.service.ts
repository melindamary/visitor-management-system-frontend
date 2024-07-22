import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../../models/api-response';
import { VisitorPassCodeDTO } from '../../models/visitor-pass-code-dto';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogService {
  private apiUrl = 'https://localhost:7121/VisitorLog';

  constructor(private http: HttpClient) {}

  getVisitorLogToday(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/GetVisitorLogToday`);
  }

  updateCheckInTimeAndCardNumber(id: number, updateVisitorPassCode: VisitorPassCodeDTO): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.apiUrl}/UpdateCheckInTimeAndCardNumber/${id}`, updateVisitorPassCode);
  }

  updateCheckOutTime(id: number): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.apiUrl}/UpdateCheckOutTime/${id}`, {});
  }
}

