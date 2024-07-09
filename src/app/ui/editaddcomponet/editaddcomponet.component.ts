import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editaddcomponet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editaddcomponet.component.html',
  styleUrl: './editaddcomponet.component.scss'
})
export class EditaddcomponetComponent {
  @Input() isEditMode = false;
  roleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      role: [''],
      permissions: this.fb.group({
        visitorLog: [false],
        adminDashboard: [false],
        reports: [false],
        adminSettings: [false]
      })
    });
  }

  onSubmit() {
    if (this.roleForm.valid) {
      console.log(this.roleForm.value);
      // Handle form submission
    }
  }

  onCancel() {
    // Handle cancellation
    console.log('Cancelled');
  }
}
