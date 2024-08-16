import { Component, OnInit } from '@angular/core';
import { VisitorLogComponent } from "../security-visitor-log/components/visitor-log/visitor-log.component";
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { LocationIdAndName } from '../../core/models/location-details.interface';
import { LocationService } from '../../core/services/location-management/location.service';
import { VisitorLogService } from '../../core/services/visitor-log-service/visitor-log.service';

@Component({
  selector: 'app-admin-visitor-log',
  standalone: true,
  imports: [VisitorLogComponent, FormsModule, DropdownModule],
  templateUrl: './admin-visitor-log.component.html',
  styleUrl: './admin-visitor-log.component.scss'
})
export class AdminVisitorLogComponent implements OnInit {
  locations: LocationIdAndName[] = [];
  selectedLocation: LocationIdAndName | null = null;

  constructor(private locationService: LocationService, private visitorLogService: VisitorLogService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocationByIdAndName().subscribe(
      (data: LocationIdAndName[]) => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations', error);
      }
    );
  }

  getVisitorLogs(): void {
    console.log('Selected Location:', this.selectedLocation);
    const locationName = this.selectedLocation?.name;
    this.visitorLogService.getVisitorLogToday(locationName).subscribe(
      response => {
        console.log('Visitor Logs:', response);
      },
      error => {
        console.error('Error fetching visitor logs', error);
      }
    );
  }
  
}
