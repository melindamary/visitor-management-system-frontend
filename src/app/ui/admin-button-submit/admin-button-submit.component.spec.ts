import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminButtonSubmitComponent } from './admin-button-submit.component';

describe('AdminButtonSubmitComponent', () => {
  let component: AdminButtonSubmitComponent;
  let fixture: ComponentFixture<AdminButtonSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminButtonSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
