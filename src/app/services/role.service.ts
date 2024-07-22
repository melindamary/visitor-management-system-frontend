import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../Models/page.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // private Pageroles = 'https://localhost:7121/Page/GetPages';
  // private role = 'your_api_base_url';
  // private apiUrl = 'your_api_base_url';

  private apiUrl = 'http://yourapiurl/api/visitors/active';  


  constructor(private http: HttpClient) {}
  getActiveVisitors(): Observable<number> {  
    return this.http.get<number>(this.apiUrl);  
  }
  getPages(): Observable<any> {
    return this.http.get<any>('https://localhost:7121/Page/GetPages');
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7121/Role/PostRole`, roleData);
  }
  createPageControls(roleId: number, pageControls: any): Observable<any> {
    return this.http.post(`https://localhost:7121/PageRole/CreatePageControls?roleId=${roleId}`, pageControls);
  }
}

