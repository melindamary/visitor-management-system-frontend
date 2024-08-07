import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminACEDashbordComponent } from './admin-ace-dashbord.component';

describe('AdminACEDashbordComponent', () => {
  let component: AdminACEDashbordComponent;
  let fixture: ComponentFixture<AdminACEDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminACEDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminACEDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
