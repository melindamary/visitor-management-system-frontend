import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisitPurposeTableComponent } from './admin-visit-purpose-table.component';

describe('AdminVisitPurposeTableComponent', () => {
  let component: AdminVisitPurposeTableComponent;
  let fixture: ComponentFixture<AdminVisitPurposeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisitPurposeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVisitPurposeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
