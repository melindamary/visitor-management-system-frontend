import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityVisitorLogComponent } from './security-visitor-log.component';

describe('SecurityVisitorLogComponent', () => {
  let component: SecurityVisitorLogComponent;
  let fixture: ComponentFixture<SecurityVisitorLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityVisitorLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityVisitorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
