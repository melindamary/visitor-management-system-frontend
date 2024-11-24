import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedheaderComponentComponent } from './redheader-component.component';

describe('RedheaderComponentComponent', () => {
  let component: RedheaderComponentComponent;
  let fixture: ComponentFixture<RedheaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedheaderComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedheaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
