import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserComponent } from './admin-view-user.component';

describe('AdminViewUserComponent', () => {
  let component: AdminViewUserComponent;
  let fixture: ComponentFixture<AdminViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
