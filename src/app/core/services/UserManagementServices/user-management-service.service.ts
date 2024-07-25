import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GetIdAndName } from '../../models/getIdAndName.interface';
import { AddNewUser } from '../../models/addNewUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {


  constructor(private http:HttpClient) { }

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

  postNewUser(newUser:AddNewUser):Observable<AddNewUser>{
    console.log("new user details",newUser);    
    const apiUrl="https://localhost:7121/User/CreateNewUser";
     return this.http.post<AddNewUser>(apiUrl,newUser);

  }
}
