import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSecurityTableComponent } from './location-security-table.component';

describe('LocationSecurityTableComponent', () => {
  let component: LocationSecurityTableComponent;
  let fixture: ComponentFixture<LocationSecurityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSecurityTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSecurityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
