import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserComponent } from './admin-edit-user.component';

describe('AdminEditUserComponent', () => {
  let component: AdminEditUserComponent;
  let fixture: ComponentFixture<AdminEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
