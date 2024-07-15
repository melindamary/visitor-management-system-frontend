import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingVisitorTableComponent } from './upcoming-visitor-table.component';

describe('UpcomingVisitorTableComponent', () => {
  let component: UpcomingVisitorTableComponent;
  let fixture: ComponentFixture<UpcomingVisitorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingVisitorTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingVisitorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
