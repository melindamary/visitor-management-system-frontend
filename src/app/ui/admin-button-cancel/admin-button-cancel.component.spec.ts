import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminButtonCancelComponent } from './admin-button-cancel.component';

describe('AdminButtonCancelComponent', () => {
  let component: AdminButtonCancelComponent;
  let fixture: ComponentFixture<AdminButtonCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminButtonCancelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminButtonCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
