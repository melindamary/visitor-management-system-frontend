import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaddcomponetComponent } from './editaddcomponet.component';

describe('EditaddcomponetComponent', () => {
  let component: EditaddcomponetComponent;
  let fixture: ComponentFixture<EditaddcomponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaddcomponetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaddcomponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
