import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorLogTilesComponent } from './visitor-log-tiles.component';

describe('VisitorLogTilesComponent', () => {
  let component: VisitorLogTilesComponent;
  let fixture: ComponentFixture<VisitorLogTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorLogTilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorLogTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
