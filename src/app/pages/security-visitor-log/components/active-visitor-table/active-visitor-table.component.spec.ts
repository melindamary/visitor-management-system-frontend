import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveVisitorTableComponent } from './active-visitor-table.component';

describe('ActiveVisitorTableComponent', () => {
  let component: ActiveVisitorTableComponent;
  let fixture: ComponentFixture<ActiveVisitorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveVisitorTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveVisitorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
