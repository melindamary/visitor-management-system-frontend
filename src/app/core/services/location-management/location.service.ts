import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse, LocationDetails, UpdateLocation } from '../../models/location-details.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://localhost:7121/Location';

  constructor(private http: HttpClient) { }

  // Fetch all location details
  getAllLocationDetails(): Observable<LocationDetails[]> {
    return this.http.get<ApiResponse<{ $values: LocationDetails[] }>>(`${this.apiUrl}/GetAllLocationDetails`).pipe(
      map(response => response.result.$values)
    );
  }

  // Add a new location
  addLocation(addedLocation: UpdateLocation): Observable<ApiResponse<string>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/AddLocation`, addedLocation, { headers });
  }

  // Update an existing location
  updateLocation(id: number, updatedLocation: UpdateLocation): Observable<ApiResponse<string>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/UpdateLocation/${id}`, updatedLocation, { headers });
  }
}
