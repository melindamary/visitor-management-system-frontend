import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManagementComponent } from './device-management.component';

describe('DeviceManagementComponent', () => {
  let component: DeviceManagementComponent;
  let fixture: ComponentFixture<DeviceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
