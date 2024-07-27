import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page, PagesResponse } from '../Models/page.interface';
import { UpdateRolePagesDTO } from '../Models/update.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // private Pageroles = 'https://localhost:7121/Page/GetPages';
  // private role = 'your_api_base_url';
  // private apiUrl = 'your_api_base_url';



  constructor(private http: HttpClient) {}
  private baseUrl = 'https://localhost:7121/AdminRole'; // Update with your actual base URL

  getPages(): Observable<any> {
    return this.http.get<any>('https://localhost:7121/AdminRole/GetPages/get-pages');
  }
 
  createRole(roleData: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7121/AdminRole/PostRole`, roleData);
  }
  createPageControls(roleId: number, pageControls: any): Observable<any> {
    return this.http.post(`https://localhost:7121/AdminRole/CreatePageControls?roleId=${roleId}`, pageControls);
  }

  updateRolePages(updateRolePagesDTO: UpdateRolePagesDTO): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/UpdateRolePages`, updateRolePagesDTO);
  }


  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Getroles/get-role-by-id/${id}`);
  }
  

  getPagesByRoleId(roleId: number): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.baseUrl}/GetPagesByRoleId/${roleId}`);
  }


}

