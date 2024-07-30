import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorConsentModalComponent } from './visitor-consent-modal.component';

describe('VisitorConsentModalComponent', () => {
  let component: VisitorConsentModalComponent;
  let fixture: ComponentFixture<VisitorConsentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorConsentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
