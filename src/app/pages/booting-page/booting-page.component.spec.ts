import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootingPageComponent } from './booting-page.component';

describe('BootingPageComponent', () => {
  let component: BootingPageComponent;
  let fixture: ComponentFixture<BootingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
