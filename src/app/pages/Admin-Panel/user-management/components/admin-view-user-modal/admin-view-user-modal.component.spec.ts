import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserModalComponent } from './admin-view-user-modal.component';

describe('AdminViewUserModalComponent', () => {
  let component: AdminViewUserModalComponent;
  let fixture: ComponentFixture<AdminViewUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewUserModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
