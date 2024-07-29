import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditRoleComponent } from './admin-edit-role.component';

describe('AdminEditRoleComponent', () => {
  let component: AdminEditRoleComponent;
  let fixture: ComponentFixture<AdminEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
