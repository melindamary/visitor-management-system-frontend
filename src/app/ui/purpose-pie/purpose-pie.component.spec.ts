import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposePieComponent } from './purpose-pie.component';

describe('PurposePieComponent', () => {
  let component: PurposePieComponent;
  let fixture: ComponentFixture<PurposePieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurposePieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurposePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
