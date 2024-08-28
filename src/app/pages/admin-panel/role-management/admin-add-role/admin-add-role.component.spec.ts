import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRoleComponent } from './admin-add-role.component';

describe('AdminAddRoleComponent', () => {
  let component: AdminAddRoleComponent;
  let fixture: ComponentFixture<AdminAddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
