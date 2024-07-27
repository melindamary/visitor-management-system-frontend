import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroleComponent } from './addrole.component';

describe('AddroleComponent', () => {
  let component: AddroleComponent;
  let fixture: ComponentFixture<AddroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddroleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
