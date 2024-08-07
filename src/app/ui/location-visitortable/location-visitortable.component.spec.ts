import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationVisitortableComponent } from './location-visitortable.component';

describe('LocationVisitortableComponent', () => {
  let component: LocationVisitortableComponent;
  let fixture: ComponentFixture<LocationVisitortableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationVisitortableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationVisitortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
