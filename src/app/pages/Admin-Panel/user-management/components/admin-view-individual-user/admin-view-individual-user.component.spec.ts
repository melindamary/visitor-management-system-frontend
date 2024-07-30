import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewIndividualUserComponent } from './admin-view-individual-user.component';

describe('AdminViewIndividualUserComponent', () => {
  let component: AdminViewIndividualUserComponent;
  let fixture: ComponentFixture<AdminViewIndividualUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewIndividualUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewIndividualUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
