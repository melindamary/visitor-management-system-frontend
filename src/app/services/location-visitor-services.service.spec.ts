import { TestBed } from '@angular/core/testing';

import { LocationVisitorServicesService } from './location-visitor-services.service';

describe('LocationVisitorServicesService', () => {
  let service: LocationVisitorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationVisitorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
