import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GetIdAndName } from '../../models/getIdAndName.interface';
import { AddNewUser } from '../../models/addNewUser.interface';
import { UserByIdOverview, UserOverview, UserOverviewTransformed } from '../../models/user-overview-display.interface';
import { response } from 'express';
import { CheckUsernameResponse } from '../../models/check-Username.Interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {

  constructor(private http:HttpClient) { }
  username:string = ''
  private baseUrl:string = environment.apiUrl;
  getRoleIdAndName(): Observable<GetIdAndName[]> {
    const apiUrl = `${this.baseUrl}/Role/GetRoleIdAndName/get-role-id-name`;
    return this.http.get<{ $id: string; $values: GetIdAndName[] }>(apiUrl).pipe(
      map(response => response.$values)
    );
  
    
  }

  getLocationIdAndName(): Observable<GetIdAndName[]> {
    const apiUrl = `${this.baseUrl}/Location/GetLocationIdAndName`;
    return this.http.get<{ $id: string; $values: GetIdAndName[] }>(apiUrl).pipe(
      map(response => response.$values)
    );
  }

  getAllUser(): Observable<UserOverviewTransformed[]> {
    const apiUrl = `${this.baseUrl}/User/GetAllUsersOverview`;
    return this.http.get<{ $id: string; $values: UserOverview[] }>(apiUrl).pipe(
      map(response => response.$values.map(user => ({
        userId: user.userId,
        fullName: user.fullName,
        status : user.isActive ? 'Active' : 'Inactive',
        location: user.location,
        roleName: user.roleName,
        username: user.username
      })))
    );
  }

  checkUsernameExists(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/CheckUsernameExists/${username}`);
  }

  updateUserData(id:number, userData: any):Observable<any>{    
    console.log("recieved data",userData);
    
      const url = `${this.baseUrl}/User/UpdateUser/${id}`;
      return this.http.put<any>(url, userData);
    
  }

  getUserById(id: number): Observable<any> {
    const apiUrl = `${this.baseUrl}/User/GetUserById/${id}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response  => {
        console.log("data recieved",response);
        return response;
      })
    );
  }

  postNewUser(newUser:AddNewUser):Observable<AddNewUser>{
    console.log("new user details",newUser);    
    const apiUrl=`${this.baseUrl}/User/CreateNewUser`;
     return this.http.post<AddNewUser>(apiUrl,newUser);

  }
}
