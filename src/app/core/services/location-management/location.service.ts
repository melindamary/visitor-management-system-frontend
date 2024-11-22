import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse, LocationDetails, LocationIdAndName, UpdateLocation } from '../../models/location-details.interface';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = `${environment.apiUrl}Location`;

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  // Fetch all location details
  getAllLocationDetails(): Observable<LocationDetails[]> {
    return this.http.get<ApiResponse<{ $values: LocationDetails[] }>>(`${this.apiUrl}/LocationList`).pipe(
      map(response => response.result.$values)
    );
  }

  // Add a new location
  addLocation(addedLocation: UpdateLocation): Observable<ApiResponse<UpdateLocation>> {
    const username = this.getUser();
    return this.http.post<ApiResponse<UpdateLocation>>(`${this.apiUrl}/PostLocation`, { ...addedLocation, username });
  }

  // Update an existing location
  updateLocation(id: number, updatedLocation: UpdateLocation): Observable<ApiResponse<UpdateLocation>> {
    const username = this.getUser();
    return this.http.put<ApiResponse<UpdateLocation>>(`${this.apiUrl}/Location/${id}`, { ...updatedLocation, username });
  }

  getLocationByIdAndName(): Observable<LocationIdAndName[]>{
    return this.http.get<{ $values: LocationIdAndName[] }>(`${this.apiUrl}/GetLocationIdAndName`).pipe(
      map(response => response.$values)
    );
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
