import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsModalComponent } from './view-details-modal.component';

describe('ViewDetailsModalComponent', () => {
  let component: ViewDetailsModalComponent;
  let fixture: ComponentFixture<ViewDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
