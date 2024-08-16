import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisitorLogComponent } from './admin-visitor-log.component';

describe('AdminVisitorLogComponent', () => {
  let component: AdminVisitorLogComponent;
  let fixture: ComponentFixture<AdminVisitorLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisitorLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVisitorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
