import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationManagementComponent } from './location-management.component';
import { LocationService } from '../../../core/services/location-management/location.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { ApiResponse, UpdateLocation } from '../../../core/models/location-details.interface';

const successResponse: ApiResponse<UpdateLocation> = {
  isSuccess: true,
  result: {
    name: 'Updated Location Name',
    address: 'Updated Address',
    phone: '1234567890'
  },
  statusCode: 200,
  errorMessages: []
};

const errorResponse: ApiResponse<UpdateLocation> = {
  isSuccess: false,
  result: {} as UpdateLocation, // Empty result object
  statusCode: 500,
  errorMessages: ['Error occurred']
};


describe('LocationManagementComponent', () => {
  let component: LocationManagementComponent;
  let fixture: ComponentFixture<LocationManagementComponent>;
  let locationService: jasmine.SpyObj<LocationService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const locationServiceSpy = jasmine.createSpyObj('LocationService', ['getAllLocationDetails', 'updateLocation', 'addLocation']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LocationManagementComponent],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationManagementComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService) as jasmine.SpyObj<LocationService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.locationForm.value).toEqual({
      id: null,
      name: '',
      address: '',
      phone: ''
    });
  });

  it('should open the new location dialog', () => {
    component.openNewLocationDialog();
    expect(component.locationDialog).toBeTrue();
    expect(component.submitted).toBeFalse();
  });

  it('should hide the dialog', () => {
    component.hideDialog();
    expect(component.locationDialog).toBeFalse();
    expect(component.submitted).toBeFalse();
  });

  it('should call loadLocationDetails on init', () => {
    const loadLocationDetailsSpy = spyOn(component, 'loadLocationDetails').and.callThrough();
    component.ngOnInit();
    expect(loadLocationDetailsSpy).toHaveBeenCalled();
  });

  it('should show error message when saveLocation fails', () => {
    locationService.addLocation.and.returnValue(throwError(() => new Error('Error')));
    component.saveLocation();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while adding location.',
      life: 3000
    });
  });

  it('should save a location successfully', () => {
    locationService.addLocation.and.returnValue(of(successResponse));
    component.saveLocation();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Location added successfully',
      life: 3000
    });
  });

  it('should handle form validation errors', () => {
    component.locationForm.controls['name'].setValue('');
    component.locationForm.controls['address'].setValue('');
    component.locationForm.controls['phone'].setValue('');
    component.saveLocation();
    expect(component.locationForm.invalid).toBeTrue();
  });

  it('should update location when saveLocation is called with an existing id', () => {
    const locationData = { id: 1, name: 'Test', address: 'Address', phone: '1234567890' };
    component.locationForm.setValue(locationData);
    locationService.updateLocation.and.returnValue(of(successResponse));
    component.saveLocation();
    expect(locationService.updateLocation).toHaveBeenCalledWith(1, locationData);
  });
});
