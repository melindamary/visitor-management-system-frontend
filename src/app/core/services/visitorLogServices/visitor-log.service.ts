import { Injectable } from '@angular/core';
import { Visitor } from '../../models/visitor.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogService {

  private apiUrl = 'https://localhost:7028/Visitor'; 

  constructor(private http: HttpClient) {}

  getVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(`${this.apiUrl}/GetVisitors`);
  }

  getUpcomingVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(`${this.apiUrl}/GetPendingVisitorsToday`);
  }

  addVisitor(visitor: Visitor): Observable<Visitor> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Visitor>(`${this.apiUrl}/addVisitorDetails`, visitor, { headers });
  }

  deleteVisitor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteVisitorRequest?id=${id}`);
  }

  updateCheckInTimeAndCardNumber(id: number, updatedVisitor: Visitor): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.apiUrl}/UpdateCheckInTimeAndCardNumber/${id}`, updatedVisitor);
  }

  getActiveVisitorsToday(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(`${this.apiUrl}/GetActiveVisitorsToday`);
  }

  updateCheckOutTime(id: number): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.apiUrl}/UpdateCheckOutTime/${id}`, {});
  }
}
