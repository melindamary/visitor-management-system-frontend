import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationManagementComponent } from './location-management.component';

describe('LocationManagementComponent', () => {
  let component: LocationManagementComponent;
  let fixture: ComponentFixture<LocationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
