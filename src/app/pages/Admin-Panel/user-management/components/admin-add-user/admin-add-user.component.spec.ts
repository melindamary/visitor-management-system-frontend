import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddUserComponent } from '../../../../../../app/pages/Admin-Panel/user-management/components/admin-add-user/admin-add-user.component';



describe('AdminAddUserComponent', () => {
  let component: AdminAddUserComponent;
  let fixture: ComponentFixture<AdminAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
