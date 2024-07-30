import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse, LocationDetails, UpdateLocation } from '../../models/location-details.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://localhost:7121/Location';

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  // Fetch all location details
  getAllLocationDetails(): Observable<LocationDetails[]> {
    return this.http.get<ApiResponse<{ $values: LocationDetails[] }>>(`${this.apiUrl}/GetAllLocationDetails`).pipe(
      map(response => response.result.$values)
    );
  }

  // Add a new location
  addLocation(addedLocation: UpdateLocation): Observable<ApiResponse<UpdateLocation>> {
    const username = this.getUser();
    return this.http.post<ApiResponse<UpdateLocation>>(`${this.apiUrl}/AddLocation`, { ...addedLocation, username });
  }

  // Update an existing location
  updateLocation(id: number, updatedLocation: UpdateLocation): Observable<ApiResponse<UpdateLocation>> {
    const username = this.getUser();
    return this.http.put<ApiResponse<UpdateLocation>>(`${this.apiUrl}/UpdateLocation/${id}`, { ...updatedLocation, username });
  }

  getUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.username || null;
      }
    }
    return null;
  }
}
