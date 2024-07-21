import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturePhotoDialogComponentComponent } from './capture-photo-dialog-component.component';

describe('CapturePhotoDialogComponentComponent', () => {
  let component: CapturePhotoDialogComponentComponent;
  let fixture: ComponentFixture<CapturePhotoDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturePhotoDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturePhotoDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
