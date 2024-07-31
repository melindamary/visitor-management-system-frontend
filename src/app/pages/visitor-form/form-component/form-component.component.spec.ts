import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponentComponent } from './form-component.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormComponentComponent', () => {
  let component: FormComponentComponent;
  let fixture: ComponentFixture<FormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponentComponent],
      imports: [ReactiveFormsModule] // Import ReactiveFormsModule for form testing
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.addvisitorForm.contains('name')).toBeTrue();
    expect(component.addvisitorForm.contains('phoneNumber')).toBeTrue();
    expect(component.addvisitorForm.contains('personInContact')).toBeTrue();
    expect(component.addvisitorForm.contains('purposeofvisit')).toBeTrue();
  });

  describe('Form validation', () => {
    it('should validate required fields', () => {
      component.addvisitorForm.controls['name'].setValue('');
      component.addvisitorForm.controls['phoneNumber'].setValue('');
      component.addvisitorForm.controls['personInContact'].setValue('');
      component.addvisitorForm.controls['purposeofvisit'].setValue('');
  
      expect(component.addvisitorForm.valid).toBeFalse();
  
      component.addvisitorForm.controls['name'].setValue('John Doe');
      component.addvisitorForm.controls['phoneNumber'].setValue('1234567890');
      component.addvisitorForm.controls['personInContact'].setValue('Jane Smith');
      component.addvisitorForm.controls['purposeofvisit'].setValue('Business');
  
      expect(component.addvisitorForm.valid).toBeTrue();
    });
  });
  
  describe('FormComponentComponent Methods', () => {
    it('should call onPurposeChange on submit', () => {
      spyOn(component, 'onPurposeChange');
      
      component.addvisitorForm.setValue({
        name: 'John Doe',
        phoneNumber: '1234567890',
        personInContact: 'Jane Smith',
        purposeofvisit: 'Business',
        purposeofvisitId: '',
        items: [],
        policy: true
      });
  
      component.onSubmit();
      
      expect(component.onPurposeChange).toHaveBeenCalled();
    });
  });
  


});
