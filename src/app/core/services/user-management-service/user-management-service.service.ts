import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GetIdAndName } from '../../models/getIdAndName.interface';
import { AddNewUser } from '../../models/addNewUser.interface';
import { UserByIdOverview, UserOverview, UserOverviewTransformed } from '../../models/user-overview-display.interface';
import { response } from 'express';
import { CheckUsernameResponse } from '../../models/check-Username.Interface';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {

  constructor(private http:HttpClient) { }
  username:string = ''

  getRoleIdAndName(): Observable<GetIdAndName[]> {
    const apiUrl = "https://localhost:7121/Role/GetRoleIdAndName/get-role-id-name";
    return this.http.get<{ $id: string; $values: GetIdAndName[] }>(apiUrl).pipe(
      map(response => response.$values)
    );
  
    
  }

  getLocationIdAndName(): Observable<GetIdAndName[]> {
    const apiUrl = "https://localhost:7121/Location/GetLocationIdAndName";
    return this.http.get<{ $id: string; $values: GetIdAndName[] }>(apiUrl).pipe(
      map(response => response.$values)
    );
  }

  getAllUser(): Observable<UserOverviewTransformed[]> {
    const apiUrl = "https://localhost:7121/User/GetAllUsersOverview";
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
    return this.http.get<any>(`https://localhost:7121/User/CheckUsernameExists/${username}`);
  }

  updateUserData(id:number, userData: any):Observable<any>{    
    console.log("recieved data",userData);
    
      const url = `https://localhost:7121/User/UpdateUser/${id}`;
      return this.http.put<any>(url, userData);
    
  }

  getUserById(id: number): Observable<any> {
    const apiUrl = `https://localhost:7121/User/GetUserById/${id}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response  => {
        console.log("data recieved",response);
        return response;
      })
    );
  }

  postNewUser(newUser:AddNewUser):Observable<AddNewUser>{
    console.log("new user details",newUser);    
    const apiUrl="https://localhost:7121/User/CreateNewUser";
     return this.http.post<AddNewUser>(apiUrl,newUser);

  }
}
